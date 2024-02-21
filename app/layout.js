import {Inter} from "next/font/google";
import "./globals.css";
import {AntdRegistry} from "@ant-design/nextjs-registry";

const inter = Inter({subsets: ["latin"]});

export const metadata = {
    title: "AddrTracker",
    description: "AddrTracker",
};

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <AntdRegistry>
            {children}
        </AntdRegistry>
        </body>
        </html>
    );
}
