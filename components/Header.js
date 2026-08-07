"use client";

import { useState } from "react";
import { MenuIcon, BellIcon, ChevronDownIcon, WalletIcon, EthIcon, CHAIN_ICON_MAP } from "@/components/icons";
import { useWallet } from "@/lib/WalletProvider";
import NetworkSelectModal from "@/components/NetworkSelectModal";
import WalletConnectModal from "@/components/WalletConnectModal";

function truncateAddress(address) {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export default function Header({ onOpenMenu, onComingSoon }) {
  const [networkModalOpen, setNetworkModalOpen] = useState(false);
  const [walletConnectModalOpen, setWalletConnectModalOpen] = useState(false);
  const { address, connecting, connect, selectedNetwork } = useWallet();

  const handleSelectNetwork = (network) => {
    setNetworkModalOpen(false);
    connect(network);
  };

  // Wallet options in the login popup all go through the same EVM connect
  // flow (pick network, then connect) - only the icon/label differs.
  const handleSelectWallet = () => {
    setWalletConnectModalOpen(false);
    setNetworkModalOpen(true);
  };

  const handleGoogleLogin = () => {
    setWalletConnectModalOpen(false);
    onComingSoon?.("Google Login");
  };

  return (
    <header className="flex items-center justify-between gap-2 px-4 py-4">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMenu}
          aria-label="Open menu"
          className="flex h-9 w-9 shrink-0 items-center justify-center text-white/80 hover:text-white"
        >
          <MenuIcon />
        </button>
        <img src="/logo.png" alt="Bagua Swap logo" className="h-9 w-9 shrink-0 rounded-lg" />
      </div>

      <div className="flex items-center gap-1.5">
        <button
          onClick={() => setNetworkModalOpen(true)}
          className="flex items-center gap-1 rounded-full bg-bg-card card-border px-2.5 py-1.5 text-xs text-white/90"
        >
          {selectedNetwork.iconUrl ? (
            <img src={selectedNetwork.iconUrl} alt="" className="h-3.5 w-3.5 rounded-full" />
          ) : (
            (() => {
              const ChainIcon = CHAIN_ICON_MAP[selectedNetwork.icon] || EthIcon;
              return <ChainIcon width="14" height="14" />;
            })()
          )}
          {selectedNetwork.name}
          <ChevronDownIcon width="14" height="14" />
        </button>

        <button
          onClick={address ? onOpenMenu : () => setWalletConnectModalOpen(true)}
          disabled={connecting}
          className="flex items-center gap-1 rounded-full bg-accent-purple px-2.5 py-1.5 text-xs font-semibold text-white disabled:opacity-60"
        >
          <WalletIcon width="14" height="14" />
          {connecting ? "Connecting..." : address ? truncateAddress(address) : "Connect"}
        </button>

        <button
          onClick={() => onComingSoon?.("Notifications")}
          aria-label="Notifications"
          className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-bg-card card-border text-white/80"
        >
          <BellIcon />
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent-purple text-[10px] font-semibold text-white">
            1
          </span>
        </button>
      </div>

      <WalletConnectModal
        open={walletConnectModalOpen}
        onClose={() => setWalletConnectModalOpen(false)}
        onSelectWallet={handleSelectWallet}
        onGoogle={handleGoogleLogin}
      />

      <NetworkSelectModal
        open={networkModalOpen}
        onClose={() => setNetworkModalOpen(false)}
        onSelect={handleSelectNetwork}
        selectedNetworkId={selectedNetwork.id}
      />
    </header>
  );
}
