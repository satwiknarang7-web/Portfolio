import { siteConfig } from "@/shared/config/site";

/**
 * Email delivery through Web3Forms (https://web3forms.com).
 *
 * Their free plan only accepts submissions from the browser, so this runs
 * client-side. The access key is designed to be public: it can only send mail
 * to the inbox it was issued for.
 */
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

export const emailDeliveryEnabled = Boolean(ACCESS_KEY);

export async function sendViaWeb3Forms(formData: FormData): Promise<boolean> {
  if (!ACCESS_KEY) return false;
  const field = (name: string) => String(formData.get(name) ?? "").trim();

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: ACCESS_KEY,
        subject: `[Portfolio] ${field("subject")}`,
        from_name: `${siteConfig.name} — portfolio`,
        replyto: field("email"),
        name: field("name"),
        email: field("email"),
        message: field("message"),
        botcheck: false,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    const result = (await response.json().catch(() => null)) as { success?: boolean } | null;
    return response.ok && Boolean(result?.success);
  } catch {
    return false;
  }
}
