"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";
import LaunchMenu from "@/components/LaunchMenu";
import ComingSoonModal from "@/components/ComingSoonModal";

// Maps each route to the label Header / Sidebar / BottomNav use to
// highlight the currently active menu item.
const PATH_TO_LABEL = {
  "/": "Home",
  "/swap": "Swap",
  "/launchpad": "Launchpad",
  "/dex": "DEX Screener",
  "/wallet": "Wallet",
  "/discover": "Discover",
  "/liquidity": "Liquidity",
  "/docs": "Docs",
};

const ComingSoonContext = createContext(() => {});

// Lets any routed page open the shared "Coming Soon" popup without prop
// drilling through the layout - equivalent to the old onComingSoon prop.
export function useComingSoon() {
  return useContext(ComingSoonContext);
}

export default function AppShell({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);
  const [comingSoonFeature, setComingSoonFeature] = useState(null);
  const [launchMenuOpen, setLaunchMenuOpen] = useState(false);

  const activeTab = PATH_TO_LABEL[pathname] ?? "Home";

  // /docs has no dedicated screen yet, so visiting it still shows the same
  // "Coming Soon" popup as before - just reachable through its own URL now.
  useEffect(() => {
    if (pathname === "/docs") {
      setComingSoonFeature("Docs");
    }
  }, [pathname]);

  const handleNavigate = (label) => {
    if (label === "Launchpad") {
      setLaunchMenuOpen(true);
      return;
    }
    setComingSoonFeature(label);
  };

  const handleLaunchMenuSelect = (option) => {
    setLaunchMenuOpen(false);
    if (option === "Create coin") {
      setMenuOpen(false);
      router.push("/launchpad");
    } else {
      setComingSoonFeature(option);
    }
  };

  return (
    <ComingSoonContext.Provider value={setComingSoonFeature}>
      <main className="min-h-screen pb-24">
        <Header onOpenMenu={() => setMenuOpen(true)} onComingSoon={setComingSoonFeature} />
        <Sidebar
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
          activeItem={activeTab}
          onNavigate={handleNavigate}
        />

        {children}

        <BottomNav active={activeTab} onSelect={handleNavigate} />

        <LaunchMenu
          open={launchMenuOpen}
          onClose={() => setLaunchMenuOpen(false)}
          onSelect={handleLaunchMenuSelect}
        />

        <ComingSoonModal feature={comingSoonFeature} onClose={() => setComingSoonFeature(null)} />
      </main>
    </ComingSoonContext.Provider>
  );
}
