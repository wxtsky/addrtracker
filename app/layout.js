import {Inter} from "next/font/google";
import "./globals.css";
import {AntdRegistry} from "@ant-design/nextjs-registry";
import {Analytics} from '@vercel/analytics/react';
import {SpeedInsights} from "@vercel/speed-insights/next"

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
            <Analytics/>
            <SpeedInsights/>
        </AntdRegistry>
        </body>
        </html>
    );
}
