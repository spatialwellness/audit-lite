import { NextResponse } from "next/server";

const NOTIFY_EMAIL = "hello@spatial-wellness.com";
const SUBSTACK_URL = "https://houseofreturn.substack.com";

export async function POST(req: Request) {
  const { name, email, organisation, workspaceType, subscribe, scores } = await req.json();

  const scoreLines = Object.entries(scores as Record<string, number>)
    .filter(([k]) => k !== "overall")
    .map(([cat, score]) => {
      const color =
        score < 2
          ? "🔴 Needs attention"
          : score < 3
          ? "🟡 Room to improve"
          : "🟢 Working well";
      return `${cat.charAt(0).toUpperCase() + cat.slice(1)}: ${color} (${score.toFixed(1)}/4)`;
    })
    .join("\n");

  const overall = (scores as Record<string, number>).overall;
  const overallColor = overall < 2 ? "🔴" : overall < 3 ? "🟡" : "🟢";

  const emailBody = `
New Spatial Wellness Lite Audit submission

Name: ${name}
Email: ${email}
Organisation: ${organisation || "n/a"}
Workspace type: ${workspaceType || "n/a"}
Subscribe: ${subscribe ? "Yes" : "No"}

Overall: ${overallColor} ${overall.toFixed(1)}/4

${scoreLines}
  `.trim();

  // Always log to Vercel function logs
  console.log("AUDIT_SUBMISSION:", JSON.stringify({ name, email, organisation, workspaceType, subscribe, scores, ts: new Date().toISOString() }));

  // 1. Subscribe to Substack mailing list (only if opted in)
  if (subscribe) {
    try {
      await fetch(`${SUBSTACK_URL}/api/v1/free`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          first_url: `${SUBSTACK_URL}/`,
          current_url: `${SUBSTACK_URL}/`,
        }),
      });
    } catch (e) {
      console.error("Substack subscribe error:", e);
    }
  }

  // 2. Send notification email via Resend (if configured)
  if (process.env.RESEND_API_KEY) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "Spatial Wellness Audit <hello@spatial-wellness.com>",
          to: NOTIFY_EMAIL,
          subject: `New audit: ${name} (${organisation || "no org"})`,
          text: emailBody,
        }),
      });
    } catch (e) {
      console.error("Email send error:", e);
    }
  }

  return NextResponse.json({ ok: true });
}
