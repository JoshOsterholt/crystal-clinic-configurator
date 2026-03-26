import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { subject, body, summary } = await request.json();

    const TO_EMAIL = process.env.RECIPIENT_EMAIL;
    if (!TO_EMAIL) {
      return Response.json({ error: "Recipient email not configured" }, { status: 500 });
    }

    // Build a nice HTML email
    const htmlBody = `
      <div style="font-family: Georgia, serif; max-width: 700px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #0f2444 0%, #1a3a6b 100%); padding: 24px 32px; border-bottom: 4px solid #c2302e;">
          <div style="font-size: 11px; font-family: sans-serif; font-weight: 700; letter-spacing: 2.5px; color: #7eb8f7; text-transform: uppercase; margin-bottom: 4px;">Contract Source, Inc.</div>
          <h1 style="font-size: 22px; font-weight: 400; color: #fff; margin: 0;">Crystal Clinic Orthopedic — Solon</h1>
          <div style="font-size: 13px; color: #8aa4c8; margin-top: 4px; font-family: sans-serif;">PR# 16658 · Furniture Selection Summary</div>
        </div>
        <div style="padding: 24px 32px; background: #f4f6f9;">
          <div style="display: flex; gap: 32px; margin-bottom: 24px; flex-wrap: wrap;">
            <div style="background: #fff; border-radius: 8px; padding: 16px 24px; border: 1px solid #e2e8f0;">
              <div style="font-size: 11px; font-family: sans-serif; font-weight: 700; letter-spacing: 1.5px; color: #64748b; text-transform: uppercase;">Combined Plan Total</div>
              <div style="font-size: 28px; font-weight: 700; color: #0f2444; margin-top: 4px;">${summary.total}</div>
            </div>
            <div style="background: #fff; border-radius: 8px; padding: 16px 24px; border: 1px solid #e2e8f0;">
              <div style="font-size: 11px; font-family: sans-serif; font-weight: 700; letter-spacing: 1.5px; color: #64748b; text-transform: uppercase;">Items Configured</div>
              <div style="font-size: 28px; font-weight: 700; color: #0f2444; margin-top: 4px;">${summary.configured} / ${summary.totalItems}</div>
            </div>
            <div style="background: #fff; border-radius: 8px; padding: 16px 24px; border: 1px solid #e2e8f0;">
              <div style="font-size: 11px; font-family: sans-serif; font-weight: 700; letter-spacing: 1.5px; color: #64748b; text-transform: uppercase;">Total Units</div>
              <div style="font-size: 28px; font-weight: 700; color: #0f2444; margin-top: 4px;">${summary.totalUnits}</div>
            </div>
            ${summary.flagged > 0 ? `
            <div style="background: #fffbeb; border-radius: 8px; padding: 16px 24px; border: 1px solid #f59e0b;">
              <div style="font-size: 11px; font-family: sans-serif; font-weight: 700; letter-spacing: 1.5px; color: #92400e; text-transform: uppercase;">Flagged</div>
              <div style="font-size: 28px; font-weight: 700; color: #92400e; margin-top: 4px;">⚑ ${summary.flagged}</div>
            </div>
            ` : ''}
          </div>
          <div style="background: #fff; border-radius: 8px; padding: 24px; border: 1px solid #e2e8f0;">
            <pre style="font-family: 'Courier New', monospace; font-size: 13px; line-height: 1.6; color: #334155; white-space: pre-wrap; word-wrap: break-word;">${body.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>
          </div>
        </div>
        <div style="padding: 16px 32px; background: #0f2444; text-align: center;">
          <div style="font-size: 11px; color: #7eb8f7; font-family: sans-serif;">Submitted via Crystal Clinic Furniture Selection Configurator</div>
        </div>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'Crystal Clinic Configurator <onboarding@resend.dev>',
      to: [TO_EMAIL],
      subject: subject,
      html: htmlBody,
      text: body,
    });

    if (error) {
      return Response.json({ error: error.message }, { status: 400 });
    }

    return Response.json({ success: true, id: data.id });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
