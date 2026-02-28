export default function NotFound() {
  return (
    <html lang="es">
      <body>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
          <div style={{ textAlign: "center" }}>
            <h1 style={{ fontSize: "2rem", fontWeight: 700 }}>404</h1>
            <p style={{ marginTop: "0.5rem", color: "#64748b" }}>Página no encontrada</p>
          </div>
        </div>
      </body>
    </html>
  );
}
