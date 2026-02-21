import { NextResponse } from "next/server";
import { Resend } from "resend";

// Simple key check so this isn't public
const ADMIN_KEY = process.env.ADMIN_KEY;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get("key");

  if (ADMIN_KEY && key !== ADMIN_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.RESEND_API_KEY || !process.env.RESEND_AUDIENCE_ID) {
    return NextResponse.json({ error: "Not configured" }, { status: 500 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const contacts = await resend.contacts.list({
    audienceId: process.env.RESEND_AUDIENCE_ID,
  });

  return NextResponse.json(contacts);
}
