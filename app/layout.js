import { Poppins } from "next/font/google";
import "./globals.css";
import Sidebar from "../components/sidebar";

const fontPoppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "500", "700"],
});

export const metadata = {
  title: "Takiro System",
  description: "Monitoring and Control",
  icons: {
    icon: "/assets/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${fontPoppins.className} antialiased`}>
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 transition-all duration-300 overflow-y-auto">
            <div className="ms-15 md:ms-0">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}