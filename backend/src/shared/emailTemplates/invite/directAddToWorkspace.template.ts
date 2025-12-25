export interface DirectAddToWorkspaceProps {
  firstName: string;
  inviterName: string;
  workspaceName: string;
  companyName: string;
  role: string;
  loginLink: string;
}

export const directAddToWorkspaceTemplate = (
  props: DirectAddToWorkspaceProps,
) => {
  const {
    firstName,
    inviterName,
    workspaceName,
    companyName,
    role,
    loginLink,
  } = props;

  return {
    subject: `You've been added to ${workspaceName}`,
    html: `
      <!DOCTYPE html>
      <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #2563eb;">You've Been Added to ${workspaceName}!</h2>
          
          <p>Hi <strong>${firstName}</strong>,</p>

          <p>Good news! You've been added to the <strong>${workspaceName}</strong> workspace in <strong>${companyName}</strong>.</p>

          <p>
            <strong>${inviterName}</strong> added you as a
            <strong>${role.replace(/_/g, " ")}</strong>.
          </p>

          <p style="margin: 30px 0;">
            <a href="${loginLink}" 
               style="background-color: #2563eb; color: white; padding: 12px 24px; 
                      text-decoration: none; border-radius: 5px; display: inline-block;">
              Go to Dashboard
            </a>
          </p>

          <p style="color: #666; font-size: 14px;">
            Please log in to your dashboard; you can find the <strong>${workspaceName}</strong> workspace in your workspace list.
          </p>

          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />

          <p style="font-size: 14px; color: #666;">
            The workspace will appear in your workspace list when you log in.
          </p>

          <p style="font-size: 12px; color: #999; margin-top: 30px;">
            Need help? Reply to this email or contact ${inviterName}.
          </p>

          <p style="font-size: 12px; color: #999;">
            © 2025 Pivot. All rights reserved.
          </p>
        </div>
      </body>
      </html>
    `,
  };
};
