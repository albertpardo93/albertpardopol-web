import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const diagnosisLabels: Record<string, string> = {
  "diagnosis-confirmed": "Diagnóstico confirmado",
  "surgery-recommended": "Intervención recomendada",
  "tests-available": "Dispone de pruebas o informes",
  "needs-assessment": "Necesita confirmar el diagnóstico",
};

const centerLabels: Record<string, string> = {
  vic: "Clínica Bayés · Vic",
  vithas: "Hospital Vithas · Esplugues",
  "no-preference": "Sin preferencia",
};

export async function POST(request: Request) {
  try {
    const {
      name,
      email,
      phone,
      message,
      condition,
      diagnosisStatus,
      preferredCenter,
      privacyConsent,
    } = await request.json();

    if (
      !name ||
      !email ||
      !message ||
      !condition ||
      !diagnosisLabels[diagnosisStatus] ||
      !centerLabels[preferredCenter] ||
      privacyConsent !== true
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "Presupuestos Web <presupuestos@cirujanodemano.es>",
      to: "dralbertpardo@gmail.com",
      subject: `Solicitud de presupuesto — ${escapeHtml(condition)}`,
      replyTo: email,
      html: `
        <h2>Nueva solicitud de presupuesto</h2>
        <p><strong>Patología o procedencia:</strong> ${escapeHtml(condition)}</p>
        <p><strong>Situación:</strong> ${diagnosisLabels[diagnosisStatus]}</p>
        <p><strong>Centro preferido:</strong> ${centerLabels[preferredCenter]}</p>
        <hr />
        <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Teléfono:</strong> ${phone ? escapeHtml(phone) : "No proporcionado"}</p>
        <hr />
        <h3>Descripción del caso:</h3>
        <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
        <p><small>El paciente ha aceptado expresamente el tratamiento de los datos facilitados.</small></p>
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
