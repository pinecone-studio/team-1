import nodemailer from "nodemailer";

type EmailParams = {
  to: string;
  subject: string;
  html: string;
};

export function getMailer() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error("Missing SMTP configuration");
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

export async function sendEmail({ to, subject, html }: EmailParams) {
  const from = process.env.SMTP_FROM ?? process.env.SMTP_USER;
  if (!from) throw new Error("Missing SMTP_FROM");

  const transporter = getMailer();
  await transporter.sendMail({ from, to, subject, html });
}

export function buildPurchaseRequestEmail(params: {
  assetTag: string;
  category: string;
  serialNumber: string;
  purchaseCost?: number;
  purchaseDate?: number;
  requesterEmail: string;
  approveUrl: string;
  declineUrl: string;
}) {
  const {
    assetTag,
    category,
    serialNumber,
    purchaseCost,
    purchaseDate,
    requesterEmail,
    approveUrl,
    declineUrl,
  } = params;

  const dateLabel = purchaseDate
    ? new Date(purchaseDate).toLocaleDateString()
    : "—";
  const costLabel =
    typeof purchaseCost === "number" ? `$${purchaseCost.toLocaleString()}` : "—";

  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>Asset purchase request</h2>
      <p><strong>Requester:</strong> ${requesterEmail}</p>
      <p><strong>Asset:</strong> ${assetTag}</p>
      <p><strong>Category:</strong> ${category}</p>
      <p><strong>Serial:</strong> ${serialNumber}</p>
      <p><strong>Purchase cost:</strong> ${costLabel}</p>
      <p><strong>Purchase date:</strong> ${dateLabel}</p>
      <div style="margin-top: 24px;">
        <a href="${approveUrl}" style="padding: 10px 16px; background: #16a34a; color: #fff; text-decoration: none; border-radius: 6px;">Approve</a>
        <a href="${declineUrl}" style="padding: 10px 16px; background: #dc2626; color: #fff; text-decoration: none; border-radius: 6px; margin-left: 12px;">Decline</a>
      </div>
    </div>
  `;
}

export function buildPurchaseRequestSummaryEmail(params: {
  requesterEmail: string;
  totalCount: number;
  sampleAssetTags: string[];
  approveUrl: string;
  declineUrl: string;
}) {
  const { requesterEmail, totalCount, sampleAssetTags, approveUrl, declineUrl } =
    params;
  const remaining = Math.max(totalCount - sampleAssetTags.length, 0);

  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>Asset purchase request (Batch)</h2>
      <p><strong>Requester:</strong> ${requesterEmail}</p>
      <p><strong>Total assets:</strong> ${totalCount}</p>
      <p><strong>Example assets:</strong></p>
      <ul>
        ${sampleAssetTags.map((tag) => `<li>${tag}</li>`).join("")}
      </ul>
      <p>${remaining > 0 ? `...and ${remaining} more assets.` : ""}</p>
      <div style="margin-top: 24px;">
        <a href="${approveUrl}" style="padding: 10px 16px; background: #16a34a; color: #fff; text-decoration: none; border-radius: 6px;">Approve</a>
        <a href="${declineUrl}" style="padding: 10px 16px; background: #dc2626; color: #fff; text-decoration: none; border-radius: 6px; margin-left: 12px;">Decline</a>
      </div>
    </div>
  `;
}
