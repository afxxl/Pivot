import { inject, injectable } from "inversify";
import { ILogger } from "../../services/ILogger";
import { Types } from "../../../infra/container/types";
import { ISubscriptionPlanRepository } from "../../repositories/ISubscriptionPlanRepository";
import {
  UpdateCompanySubscriptionRequestDTO,
  UpdateCompanySubscriptionResponseDTO,
} from "../../dto/super-admin/UpdateCompanySubscriptionDTO";
import {
  CompanyNotFoundError,
  InvalidCompanyIdError,
  SubscriptionPlanNotFoundError,
} from "../../../shared/errors";
import { ICompanyRepository } from "../../repositories/ICompanyRepository";
import { Company } from "../../entities/Company";

@injectable()
export class UpdateCompanySubscriptionUseCase {
  constructor(
    @inject(Types.Logger)
    private logger: ILogger,
    @inject(Types.SubscriptionPlanRepository)
    private subscriptionPlanRepository: ISubscriptionPlanRepository,
    @inject(Types.CompanyRepository)
    private companyRepository: ICompanyRepository,
  ) {}

  async execute(
    companyId: string,
    body: UpdateCompanySubscriptionRequestDTO,
  ): Promise<{ response: UpdateCompanySubscriptionResponseDTO }> {
    if (!companyId || !companyId.trim()) {
      throw new InvalidCompanyIdError(
        "The provided company ID is invalid or does not exist",
      );
    }

    const id = companyId.trim().toLowerCase();
    const uuidV4Regex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    if (!uuidV4Regex.test(id)) {
      throw new InvalidCompanyIdError("Invalid company ID format");
    }

    const company = await this.companyRepository.findById(id);

    if (!company) {
      throw new CompanyNotFoundError("Company not found");
    }

    if (company.status === "deleted") {
      throw new CompanyNotFoundError("Company has been deleted");
    }

    let plan;
    if (body.plan) {
      plan = await this.subscriptionPlanRepository.findByName(
        body.plan.toLowerCase(),
      );
      if (!plan) {
        throw new SubscriptionPlanNotFoundError(
          `Subscription plan '${body.plan}' not found`,
        );
      }

      if (!plan.isActive) {
        throw new SubscriptionPlanNotFoundError("Cannot assign inactive plan");
      }
    }

    let startDate = body.startDate
      ? new Date(body.startDate)
      : body.plan || body.billingCycle
        ? new Date()
        : company.subscriptionStartDate || new Date();

    let nextBillingDate: Date | undefined;
    const effectiveBillingCycle = body.billingCycle || company.billingCycle;

    if (effectiveBillingCycle === "monthly") {
      nextBillingDate = new Date(startDate);
      nextBillingDate.setMonth(nextBillingDate.getMonth() + 1);
    } else if (effectiveBillingCycle === "annual") {
      nextBillingDate = new Date(startDate);
      nextBillingDate.setFullYear(nextBillingDate.getFullYear() + 1);
    }

    let subscriptionEndDate: Date | undefined = undefined;
    if (body.subscriptionStatus === "cancelled") {
      subscriptionEndDate = company.nextBillingDate || nextBillingDate;
    }

    const updateData: Partial<Company> = {};

    if (plan) {
      updateData.subscriptionPlan = plan.name as Company["subscriptionPlan"];
      updateData.monthlyPrice = parseFloat(plan.monthlyPrice);
    }

    if (body.billingCycle) {
      updateData.billingCycle = body.billingCycle;
    }

    if (body.subscriptionStatus) {
      updateData.subscriptionStatus = body.subscriptionStatus;
    }

    if (body.plan || body.billingCycle || body.startDate) {
      updateData.subscriptionStartDate = startDate;
      updateData.nextBillingDate = nextBillingDate;
    }

    if (body.subscriptionStatus === "cancelled") {
      updateData.subscriptionEndDate = subscriptionEndDate;
    } else if (body.subscriptionStatus === "active") {
      updateData.subscriptionEndDate = undefined;
    }

    const updatedCompany = await this.companyRepository.update(id, updateData);

    const planDetails =
      plan ||
      (await this.subscriptionPlanRepository.findByName(
        updatedCompany.subscriptionPlan,
      ));

    this.logger.info("Super admin updated company subscription", {
      companyId: id,
      companyName: updatedCompany.name,
      oldPlan: company.subscriptionPlan,
      newPlan: updatedCompany.subscriptionPlan,
      oldBillingCycle: company.billingCycle,
      newBillingCycle: updatedCompany.billingCycle,
      oldStatus: company.subscriptionStatus,
      newStatus: updatedCompany.subscriptionStatus,
      timestamp: new Date().toISOString(),
    });

    return {
      response: {
        success: true,
        message: "Subscription updated successfully",
        data: {
          subscription: {
            companyId: updatedCompany.id,
            companyName: updatedCompany.name,
            plan: updatedCompany.subscriptionPlan,
            billingCycle: updatedCompany.billingCycle || "monthly",
            status: updatedCompany.subscriptionStatus || "active",
            monthlyPrice: planDetails?.monthlyPrice || "0.00",
            annualPrice: planDetails?.annualPrice || "0.00",
            subscriptionStartDate:
              updatedCompany.subscriptionStartDate?.toISOString() || "",
            nextBillingDate:
              updatedCompany.nextBillingDate?.toISOString() || "",
            subscriptionEndDate:
              updatedCompany.subscriptionEndDate?.toISOString() || null,
            updatedAt: updatedCompany.updatedAt.toISOString(),
          },
        },
      },
    };
  }
}
