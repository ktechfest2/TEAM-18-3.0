import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { OfflineBanner } from "@/components/pwa/OfflineBanner";
import { ServiceWorkerRegister } from "@/components/pwa/ServiceWorkerRegister";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "EYENEC – every vote, every voice",
    template: "%s · EYENEC",
  },
  description:
    "Report that you voted, share what you see at your polling unit, and follow verified election updates across Nigeria.",
  applicationName: "EYENEC",
  appleWebApp: {
    capable: true,
    title: "EYENEC",
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  themeColor: "#064D31",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover", // lets the app use the full screen on notched phones
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body>
        <OfflineBanner />
        {children}
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
