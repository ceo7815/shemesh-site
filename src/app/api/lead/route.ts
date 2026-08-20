import { LeadForm } from "@/components/LeadForm";

export async function POST(request: Request) {
  const body = (await request.json()) as Record<string, string>;
  const name = body.name?.trim();
  const phone = body.phone?.trim();
  const email = body.email?.trim();
  const service = body.service?.trim();

  if (!name || !phone || !email || !service) {
    return Response.json({ ok: false }, { status: 400 });
  }

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (webhook) {
    await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone, email, service, source: "shemesh-site" }),
    });
  } else {
    console.info("[lead]", { name, phone, email, service });
  }

  return Response.json({ ok: true });
}
