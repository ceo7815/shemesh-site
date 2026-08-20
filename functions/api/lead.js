export async function onRequestPost({ request, env }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const email = String(body.email ?? "").trim();
  const service = String(body.service ?? "").trim();

  if (!name || !phone || !email || !service) {
    return Response.json({ ok: false }, { status: 400 });
  }

  const webhook = env.LEAD_WEBHOOK_URL;
  if (webhook) {
    await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone, email, service, source: "shemesh-site" }),
    });
  }

  return Response.json({ ok: true });
}
