import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
    variable: "--font-jetbrains-mono",
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "KKW College CSD Hub | Computer Science & Design Resources",
    description:
        "A curated resource hub for KKW College B.Tech CSD students featuring notes, question papers, practicals, and lab manuals for all semesters.",
    keywords: [
        "KKW College",
        "CSD",
        "Computer Science",
        "Design",
        "Notes",
        "Question Papers",
        "Practicals",
        "Lab Manuals",
        "B.Tech",
        "SPPU",
    ],
    openGraph: {
        title: "KKW College CSD Hub",
        description:
            "Curated notes, papers & practicals for KKW College CSD students",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="scroll-smooth" suppressHydrationWarning>
            <body
                className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
                suppressHydrationWarning
            >
                {children}
            </body>
        </html>
    );
}
