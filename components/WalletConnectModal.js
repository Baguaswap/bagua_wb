"use client";

import {
  CloseIcon,
  ShieldCheckIcon,
  LockIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  GoogleIcon,
  MetaMaskIcon,
  PhantomIcon,
  WalletConnectIcon,
  CoinbaseWalletIcon,
  OkxIcon,
  RabbyIcon,
} from "@/components/icons";

const WALLET_OPTIONS = [
  { id: "metamask", name: "MetaMask", Icon: MetaMaskIcon },
  { id: "phantom", name: "Phantom", Icon: PhantomIcon },
  { id: "walletconnect", name: "WalletConnect", Icon: WalletConnectIcon },
  { id: "coinbase", name: "Coinbase Wallet", Icon: CoinbaseWalletIcon },
  { id: "okx", name: "OKX Wallet", Icon: OkxIcon },
  { id: "rabby", name: "Rabby Wallet", Icon: RabbyIcon },
];

export default function WalletConnectModal({ open, onClose, onSelectWallet, onGoogle }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center">
      <button
        aria-label="Close popup overlay"
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
      />

      <div className="relative flex max-h-[92vh] w-full flex-col overflow-y-auto no-scrollbar rounded-t-2xl bg-bg-panel card-border p-6 shadow-glow sm:max-w-sm sm:rounded-2xl">
        <button
          onClick={onClose}
          aria-label="Close popup"
          className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full text-white/50 hover:text-white"
        >
          <CloseIcon width="18" height="18" />
        </button>

        <div className="mx-auto flex items-center gap-2 rounded-full bg-bg-card card-border px-3.5 py-1.5 text-[11px] font-medium text-white/80">
          <span className="flex items-center gap-1 text-emerald-400">
            <CheckCircleIcon width="13" height="13" />
            Secure Login
          </span>
          <span className="h-3 w-px bg-white/15" />
          <span className="flex items-center gap-1">
            <LockIcon width="13" height="13" />
            No Seed Phrase Required
          </span>
        </div>

        <h2 className="mt-5 text-center font-display text-2xl font-extrabold text-white">
          Welcome to <span className="bg-gradient-to-r from-amber-300 to-yellow-500 bg-clip-text text-transparent">Bagua</span>
        </h2>
        <p className="mx-auto mt-2 max-w-[280px] text-center text-sm leading-relaxed text-white/60">
          Connect your wallet or sign in to access the complete Bagua ecosystem.
        </p>

        <button
          onClick={onGoogle}
          className="mt-5 flex items-center gap-3 rounded-xl bg-bg-card card-border px-4 py-3 text-left hover:bg-white/5"
        >
          <GoogleIcon />
          <span className="flex-1 text-sm font-semibold text-white">Continue with Google</span>
          <ArrowRightIcon className="text-accent-purple" />
        </button>

        <div className="my-4 flex items-center gap-3">
          <span className="h-px flex-1 bg-white/10" />
          <span className="text-[11px] font-medium text-white/40">OR</span>
          <span className="h-px flex-1 bg-white/10" />
        </div>

        <div className="space-y-2.5">
          {WALLET_OPTIONS.map(({ id, name, Icon }) => (
            <button
              key={id}
              onClick={() => onSelectWallet(id)}
              className="flex w-full items-center gap-3 rounded-xl bg-bg-card card-border px-4 py-3 text-left hover:bg-white/5"
            >
              <Icon />
              <span className="flex-1 text-sm font-semibold text-white">{name}</span>
              <ArrowRightIcon className="text-white/40" />
            </button>
          ))}
        </div>

        <p className="mt-5 text-center text-xs leading-relaxed text-white/40">
          By continuing, you agree to the{" "}
          <span className="text-amber-400">Terms of Service</span> and{" "}
          <span className="text-amber-400">Privacy Policy</span>.
        </p>

        <div className="mt-5 flex items-center justify-center gap-2 border-t border-white/10 pt-4 text-white/40">
          <ShieldCheckIcon width="16" height="16" />
          <span className="text-[11px]">
            Trusted Multi-Chain Infrastructure
            <span className="block text-center">Secured by Bagua</span>
          </span>
        </div>
      </div>
    </div>
  );
}
