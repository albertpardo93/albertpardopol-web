import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, phone, message, condition } = await request.json();

    if (!name || !email || !message || !condition) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "Presupuestos Web <presupuestos@cirujanodemano.es>",
      to: "dralbertpardo@gmail.com",
      subject: `Solicitud de presupuesto — ${condition}`,
      replyTo: email,
      html: `
        <h2>Nueva solicitud de presupuesto</h2>
        <p><strong>Patología:</strong> ${condition}</p>
        <hr />
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${phone || "No proporcionado"}</p>
        <hr />
        <h3>Descripción del caso:</h3>
        <p>${message.replace(/\n/g, "<br />")}</p>
      `,
    });

    if (error) {
      console.error("Resend API error:", error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (error) {
    console.error("Budget email error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
