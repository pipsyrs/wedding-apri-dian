import { Lora, Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import { meta } from "@/data/invitation";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
      className={`${playfair.variable} ${lora.variable} ${jakarta.variable} antialiased`}
    >
      <body className="min-h-dvh" suppressHydrationWarning>{children}</body>
    </html>
  );
}
