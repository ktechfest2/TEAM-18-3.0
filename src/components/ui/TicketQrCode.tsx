import QRCode from "qrcode";

type TicketQrCodeProps = { value: string; size?: number };

// Scannable QR code, generated on the server as an image.
// TODO: encode a signed ticket token from the backend, not just the ticket ID,
// so organisers can validate it at the door.
export async function TicketQrCode({ value, size = 196 }: TicketQrCodeProps) {
  const dataUrl = await QRCode.toDataURL(value, { margin: 1, width: size * 2, color: { dark: "#0E1B14" } });

  return (
    // eslint-disable-next-line @next/next/no-img-element -- generated data URL, nothing to optimise
    <img
      src={dataUrl}
      alt="Ticket QR code"
      width={size}
      height={size}
      style={{ padding: 10, background: "#fff", border: "1px solid var(--line)", borderRadius: 12 }}
    />
  );
}
