export const mailerTemplate = (
  name: string,
  email: string,
  enrollment: string,
  phone: string,
  department: string,
  event: string,
  teamMembers: { name: string; enrollment: string }[]
) => {
  const teamMemberRows = teamMembers
    .filter((m) => m.name.trim() !== "")
    .map(
      (member, index) => `
      <tr>
        <td style="padding: 8px 0;">
          <table cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td style="width: 36px; height: 36px; background-color: rgba(157,54,247,0.2); border-radius: 50%; text-align: center; vertical-align: middle; color: #9D36F7; font-weight: bold; font-size: 14px;">
                ${index + 1}
              </td>
              <td style="padding-left: 12px;">
                <p style="margin: 0; font-size: 14px; font-weight: 600; color: #f1f5f9;">${member.name}</p>
                <p style="margin: 2px 0 0; font-size: 12px; color: #94a3b8;">${member.enrollment || (index === 0 ? "Team Lead" : "Member")}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    `
    )
    .join("");

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>Registration Confirmed - Vihaan 2026</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td { font-family: Arial, sans-serif !important; }
  </style>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: #0f0a18; font-family: 'Segoe UI', Arial, sans-serif; -webkit-font-smoothing: antialiased;">

  <!-- Outer wrapper -->
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #0f0a18;">
    <tr>
      <td align="center" style="padding: 20px 10px;">

        <!-- Inner container -->
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width: 600px; width: 100%; background-color: #150e22; border-radius: 16px; overflow: hidden; border: 1px solid rgba(157,54,247,0.2);">

          <!-- HEADER WITH COLLEGE LOGO -->
          <tr>
            <td style="padding: 20px 30px; border-bottom: 1px solid rgba(157,54,247,0.15);">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td width="48" style="vertical-align: middle;">
                    <img src="cid:college_logo" alt="RGI" width="44" height="44" style="display: block; border-radius: 10px;" />
                  </td>
                  <td style="padding-left: 14px; vertical-align: middle;">
                    <p style="margin: 0; font-size: 20px; font-weight: 800; color: #c084fc; letter-spacing: -0.5px;">VIHAAN 2026</p>
                    <p style="margin: 2px 0 0; font-size: 10px; color: #a78bfa; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase;">Radharaman Group of Institutes</p>
                  </td>
                  <td align="right" style="vertical-align: middle;">
                    <span style="display: inline-block; background-color: rgba(157,54,247,0.2); color: #c084fc; font-size: 10px; font-weight: 700; padding: 5px 14px; border-radius: 20px; text-transform: uppercase; letter-spacing: 1.5px;">
                      ✓ Confirmed
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- HERO BANNER -->
          <tr>
            <td style="padding: 0;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="background: linear-gradient(135deg, rgba(157,54,247,0.25) 0%, rgba(192,21,106,0.15) 50%, rgba(21,14,34,0.98) 100%); padding: 48px 30px 40px; text-align: left;">
                    <span style="display: inline-block; background: linear-gradient(135deg, #9D36F7, #c0156a); color: #ffffff; font-size: 11px; font-weight: 700; padding: 6px 16px; border-radius: 20px; text-transform: uppercase; letter-spacing: 1px;">
                      🎪 Registration Successful
                    </span>
                    <h1 style="margin: 16px 0 0; font-size: 30px; font-weight: 800; color: #ffffff; line-height: 1.25;">
                      See you at the stage! 🎉
                    </h1>
                    <p style="margin: 10px 0 0; font-size: 15px; color: #c4b5fd; line-height: 1.6;">
                      You&rsquo;re officially part of <strong style="color: #e9d5ff;">Vihaan 2026</strong> at Radharaman Group of Institutes, Bhopal.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- GREETING -->
          <tr>
            <td style="padding: 28px 30px 10px;">
              <h2 style="margin: 0 0 8px; font-size: 24px; font-weight: 700; color: #f1f5f9;">
                Hello ${name} 👋
              </h2>
              <p style="margin: 0; font-size: 15px; line-height: 1.7; color: #94a3b8;">
                Your registration is confirmed! Get ready to showcase your talent and compete with the best. Here are your details:
              </p>
            </td>
          </tr>

          <!-- REGISTRATION DETAILS -->
          <tr>
            <td style="padding: 20px 30px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: rgba(157,54,247,0.06); border: 1px solid rgba(157,54,247,0.15); border-radius: 14px;">
                <tr>
                  <td style="padding: 24px;">
                    <p style="margin: 0 0 4px; font-size: 11px; font-weight: 700; color: #a78bfa; text-transform: uppercase; letter-spacing: 2px;">
                      📋 Your Details
                    </p>
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top: 16px;">
                      <tr>
                        <td style="padding: 10px 0; font-size: 13px; color: #94a3b8; width: 120px;">Name</td>
                        <td style="padding: 10px 0; font-size: 14px; font-weight: 600; color: #f1f5f9;">${name}</td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 0; font-size: 13px; color: #94a3b8; border-top: 1px solid rgba(157,54,247,0.1);">Email</td>
                        <td style="padding: 10px 0; font-size: 14px; font-weight: 600; color: #f1f5f9; border-top: 1px solid rgba(157,54,247,0.1);">${email}</td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 0; font-size: 13px; color: #94a3b8; border-top: 1px solid rgba(157,54,247,0.1);">Enrollment</td>
                        <td style="padding: 10px 0; font-size: 14px; font-weight: 600; color: #f1f5f9; border-top: 1px solid rgba(157,54,247,0.1);">${enrollment}</td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 0; font-size: 13px; color: #94a3b8; border-top: 1px solid rgba(157,54,247,0.1);">Phone</td>
                        <td style="padding: 10px 0; font-size: 14px; font-weight: 600; color: #f1f5f9; border-top: 1px solid rgba(157,54,247,0.1);">${phone}</td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 0; font-size: 13px; color: #94a3b8; border-top: 1px solid rgba(157,54,247,0.1);">Department</td>
                        <td style="padding: 10px 0; font-size: 14px; font-weight: 600; color: #f1f5f9; border-top: 1px solid rgba(157,54,247,0.1);">${department}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- EVENT CATEGORY -->
          <tr>
            <td style="padding: 5px 30px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background: linear-gradient(135deg, rgba(157,54,247,0.12), rgba(192,21,106,0.08)); border: 1px solid rgba(157,54,247,0.2); border-radius: 14px;">
                <tr>
                  <td style="padding: 24px;">
                    <p style="margin: 0 0 4px; font-size: 11px; font-weight: 700; color: #a78bfa; text-transform: uppercase; letter-spacing: 2px;">
                      🏆 Selected Category
                    </p>
                    <p style="margin: 10px 0 0; font-size: 24px; font-weight: 800; color: #e9d5ff;">
                      ${event}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- TEAM DETAILS -->
          ${teamMemberRows
      ? `
          <tr>
            <td style="padding: 10px 30px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: rgba(157,54,247,0.06); border: 1px solid rgba(157,54,247,0.15); border-radius: 14px;">
                <tr>
                  <td style="padding: 24px;">
                    <p style="margin: 0 0 16px; font-size: 16px; font-weight: 700; color: #f1f5f9;">
                      👥 Team Members
                    </p>
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                      ${teamMemberRows}
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          `
      : ""
    }

          <!-- EVENT LOGISTICS -->
          <tr>
            <td style="padding: 15px 30px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: rgba(157,54,247,0.06); border: 1px solid rgba(157,54,247,0.15); border-radius: 14px;">
                <tr>
                  <td style="padding: 24px;">
                    <p style="margin: 0 0 20px; font-size: 16px; font-weight: 700; color: #f1f5f9;">
                      📍 Event Details
                    </p>
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td style="padding: 12px 0; vertical-align: top; width: 50%;">
                          <p style="margin: 0; font-size: 22px;">📅</p>
                          <p style="margin: 6px 0 2px; font-size: 11px; font-weight: 600; color: #94a3b8; text-transform: uppercase; letter-spacing: 1.5px;">Date</p>
                          <p style="margin: 4px 0 0; font-size: 15px; font-weight: 700; color: #f1f5f9;">March 15-17, 2026</p>
                        </td>
                        <td style="padding: 12px 0; vertical-align: top; width: 50%;">
                          <p style="margin: 0; font-size: 22px;">🕗</p>
                          <p style="margin: 6px 0 2px; font-size: 11px; font-weight: 600; color: #94a3b8; text-transform: uppercase; letter-spacing: 1.5px;">Reporting Time</p>
                          <p style="margin: 4px 0 0; font-size: 15px; font-weight: 700; color: #f1f5f9;">08:30 AM Sharp</p>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="2" style="padding: 16px 0 4px; border-top: 1px solid rgba(157,54,247,0.1);">
                          <p style="margin: 0; font-size: 22px;">🏛️</p>
                          <p style="margin: 6px 0 2px; font-size: 11px; font-weight: 600; color: #94a3b8; text-transform: uppercase; letter-spacing: 1.5px;">Venue</p>
                          <p style="margin: 4px 0 0; font-size: 16px; font-weight: 700; color: #e9d5ff;">Swami Vivekanand Sabhagar</p>
                          <p style="margin: 4px 0 0; font-size: 13px; color: #94a3b8;">Radharaman Group of Institutes, Ratibad, Bhopal</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- WHAT TO BRING -->
          <tr>
            <td style="padding: 10px 30px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: rgba(192,21,106,0.06); border: 1px solid rgba(192,21,106,0.15); border-radius: 14px;">
                <tr>
                  <td style="padding: 22px 24px;">
                    <p style="margin: 0 0 12px; font-size: 14px; font-weight: 700; color: #f0abfc;">
                      🎒 Remember to Bring
                    </p>
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr><td style="padding: 4px 0; font-size: 13px; color: #d8b4fe;">✅ College ID Card</td></tr>
                      <tr><td style="padding: 4px 0; font-size: 13px; color: #d8b4fe;">✅ This confirmation email (screenshot)</td></tr>
                      <tr><td style="padding: 4px 0; font-size: 13px; color: #d8b4fe;">✅ Any event-specific materials</td></tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA BUTTON -->
          <tr>
            <td style="padding: 20px 30px 30px;" align="center">
              <a href="https://maps.google.com/?q=Radharaman+Group+of+Institutes+Ratibad+Bhopal" style="display: inline-block; background: linear-gradient(135deg, #9D36F7, #c0156a); color: #ffffff; font-size: 14px; font-weight: 700; text-decoration: none; padding: 14px 40px; border-radius: 50px; text-align: center; letter-spacing: 0.5px;">
                📍 Get Directions to Venue
              </a>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="border-top: 1px solid rgba(157,54,247,0.15); padding: 30px; text-align: center; background-color: rgba(157,54,247,0.03);">
              <img src="cid:college_logo" alt="RGI" width="36" height="36" style="display: inline-block; border-radius: 8px; margin-bottom: 12px;" />
              <p style="margin: 0; font-size: 13px; color: #94a3b8;">
                For any queries, contact the organizing committee
              </p>
              <p style="margin: 6px 0 0;">
                <a href="mailto:info@rgibhopal.com" style="color: #a78bfa; font-weight: 700; text-decoration: none; font-size: 14px;">
                  info@rgibhopal.com
                </a>
              </p>
              <p style="margin: 8px 0 0;">
                <a href="https://www.rgibhopal.com" style="color: #64748b; font-size: 12px; text-decoration: none;">
                  www.rgibhopal.com
                </a>
              </p>
              <p style="margin: 20px 0 0; font-size: 11px; color: #475569;">
                © 2026 Vihaan Festival — Radharaman Group of Institutes, Bhopal
              </p>
            </td>
          </tr>

        </table>
        <!-- End inner container -->

      </td>
    </tr>
  </table>
  <!-- End outer wrapper -->

</body>
</html>
  `;
};