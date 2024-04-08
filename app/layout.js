import { Inter } from "next/font/google";
import "./globals.css";
import ContextProvider from "./context/provider.context";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Firebase-CMS",
  description: "CMS to manage Firebase",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ContextProvider>
          {children}
        </ContextProvider>
      </body>
    </html>
  );
}
