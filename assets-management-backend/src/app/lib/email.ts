type SendEmailArgs = {
  to: string;
  subject: string;
  html: string;
};

type PurchaseRequestEmailArgs = {
  assetTag: string;
  category: string;
  serialNumber: string;
  purchaseCost?: number;
  purchaseDate?: number;
  requesterEmail: string;
  approveUrl: string;
  declineUrl: string;
};

type PurchaseRequestSummaryEmailArgs = {
  requesterEmail: string;
  totalCount: number;
  sampleAssetTags: string[];
  approveUrl: string;
  declineUrl: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatCurrency(value?: number) {
  if (value == null) return "Not provided";

  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  } catch {
    return String(value);
  }
}

function formatDate(value?: number) {
  if (value == null) return "Not provided";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Invalid date";

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function getRequiredEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing ${name}`);
  }
  return value;
}

export async function sendEmail({ to, subject, html }: SendEmailArgs) {
  const apiKey = getRequiredEnv("RESEND_API_KEY");
  const from = getRequiredEnv("EMAIL_FROM");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      html,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to send email: ${response.status} ${errorText}`);
  }
}

export function buildPurchaseRequestEmail({
  assetTag,
  category,
  serialNumber,
  purchaseCost,
  purchaseDate,
  requesterEmail,
  approveUrl,
  declineUrl,
}: PurchaseRequestEmailArgs) {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
      <h2 style="margin-bottom: 16px;">Asset purchase approval request</h2>
      <p>A new purchase request was submitted and is waiting for review.</p>
      <table style="border-collapse: collapse; margin: 16px 0;">
        <tr><td style="padding: 6px 12px 6px 0;"><strong>Requester</strong></td><td>${escapeHtml(requesterEmail)}</td></tr>
        <tr><td style="padding: 6px 12px 6px 0;"><strong>Asset tag</strong></td><td>${escapeHtml(assetTag)}</td></tr>
        <tr><td style="padding: 6px 12px 6px 0;"><strong>Category</strong></td><td>${escapeHtml(category)}</td></tr>
        <tr><td style="padding: 6px 12px 6px 0;"><strong>Serial number</strong></td><td>${escapeHtml(serialNumber)}</td></tr>
        <tr><td style="padding: 6px 12px 6px 0;"><strong>Purchase cost</strong></td><td>${escapeHtml(formatCurrency(purchaseCost))}</td></tr>
        <tr><td style="padding: 6px 12px 6px 0;"><strong>Purchase date</strong></td><td>${escapeHtml(formatDate(purchaseDate))}</td></tr>
      </table>
      <p>
        <a href="${escapeHtml(approveUrl)}" style="display: inline-block; margin-right: 12px; padding: 10px 16px; background: #166534; color: #ffffff; text-decoration: none; border-radius: 6px;">Approve</a>
        <a href="${escapeHtml(declineUrl)}" style="display: inline-block; padding: 10px 16px; background: #b91c1c; color: #ffffff; text-decoration: none; border-radius: 6px;">Decline</a>
      </p>
    </div>
  `;
}

export function buildPurchaseRequestSummaryEmail({
  requesterEmail,
  totalCount,
  sampleAssetTags,
  approveUrl,
  declineUrl,
}: PurchaseRequestSummaryEmailArgs) {
  const items = sampleAssetTags
    .map((assetTag) => `<li>${escapeHtml(assetTag)}</li>`)
    .join("");

  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
      <h2 style="margin-bottom: 16px;">Batch asset purchase approval request</h2>
      <p>${escapeHtml(requesterEmail)} submitted ${escapeHtml(String(totalCount))} purchase requests.</p>
      <p>Sample asset tags:</p>
      <ul>${items}</ul>
      <p>
        <a href="${escapeHtml(approveUrl)}" style="display: inline-block; margin-right: 12px; padding: 10px 16px; background: #166534; color: #ffffff; text-decoration: none; border-radius: 6px;">Approve batch</a>
        <a href="${escapeHtml(declineUrl)}" style="display: inline-block; padding: 10px 16px; background: #b91c1c; color: #ffffff; text-decoration: none; border-radius: 6px;">Decline batch</a>
      </p>
    </div>
  `;
}
