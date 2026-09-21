import { Cormorant_Infant, Great_Vibes, Plus_Jakarta_Sans } from "next/font/google";
import { meta } from "@/data/invitation";
import "./globals.css";

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const cormorant = Cormorant_Infant({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: meta.title,
  description: meta.description,
  icons: {
    icon: [{ url: "/images/favicon.png", type: "image/png", sizes: "256x256" }],
    apple: [{ url: "/images/favicon.png", sizes: "256x256" }],
  },
};

export const viewport = {
  themeColor: "#1a1310",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="id"
      className={`${greatVibes.variable} ${cormorant.variable} ${jakarta.variable} antialiased`}
    >
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
