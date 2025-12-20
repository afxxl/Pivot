import {
  SendCompanyInviteRequestDTO,
  SendCompanyInviteResponseDTO,
} from "../dto/SendCompanyInviteDTO";

export class SendCompanyInviteUseCase {
  constructor() {}

  async execute(
    req: SendCompanyInviteRequestDTO,
  ): Promise<{ response: SendCompanyInviteResponseDTO }> {}
}
