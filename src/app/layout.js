import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "AI Viral Shorts Script Writer",
  description: "Generate viral YouTube and Instagram Shorts scripts in seconds with AI. Professional tool for content creators.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.className}`}>
        {children}
      </body>
    </html>
  );
}
