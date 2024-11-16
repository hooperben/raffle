import type { Metadata } from "next";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./globals.css";
import { AppSidebar } from "@/components/app-sidebar";

import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "MatesRaffle",
  description: "The fairest raffle software in the world.",
};

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryClientProvider client={queryClient}>
            <DynamicContextProvider
              settings={{
                environmentId: "d6294e7a-dc6e-4379-af32-d4ccde0d212f",
                walletConnectors: [EthereumWalletConnectors],
              }}
            >
              <SidebarProvider>
                <AppSidebar />
                <main>
                  <SidebarTrigger />
                  {children}
                </main>
              </SidebarProvider>
            </DynamicContextProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
