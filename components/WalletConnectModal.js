"use client";

import {
  CloseIcon,
  ShieldCheckIcon,
  LockIcon,
  ChevronRightIcon,
  UserPlusIcon,
  GoogleIcon,
  MetaMaskIcon,
  PhantomIcon,
  WalletConnectIcon,
  CoinbaseWalletIcon,
  OkxIcon,
  RabbyIcon,
} from "@/components/icons";
import BaguaBadge from "@/components/hero/BaguaBadge";

const WALLET_OPTIONS = [
  { id: "metamask", name: "MetaMask", Icon: MetaMaskIcon },
  { id: "phantom", name: "Phantom", Icon: PhantomIcon },
  { id: "walletconnect", name: "WalletConnect", Icon: WalletConnectIcon },
  { id: "coinbase", name: "Coinbase Wallet", Icon: CoinbaseWalletIcon },
  { id: "okx", name: "OKX Wallet", Icon: OkxIcon },
  { id: "rabby", name: "Rabby Wallet", Icon: RabbyIcon },
];

export default function WalletConnectModal({ open, onClose, onSelectWallet, onGoogle, onGuest }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center">
      <button
        aria-label="Close popup overlay"
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
      />

      <div className="relative flex max-h-[94vh] w-full flex-col overflow-y-auto no-scrollbar rounded-t-3xl bg-bg-panel card-border p-6 shadow-glow sm:max-w-sm sm:rounded-3xl">
        <div className="flex items-center justify-between text-xs text-white/70">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <ShieldCheckIcon width="15" height="15" className="text-emerald-400" />
              Secure Login
            </span>
            <span className="flex items-center gap-1.5">
              <LockIcon width="14" height="14" className="text-white/60" />
              No Seed Phrase Required
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close popup"
            className="flex h-6 w-6 shrink-0 items-center justify-center text-white/60 hover:text-white"
          >
            <CloseIcon width="18" height="18" />
          </button>
        </div>

        <div className="mt-6">
          <BaguaBadge />
        </div>

        <h2 className="mt-4 text-center font-display text-[26px] font-extrabold leading-tight text-white">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-amber-300 to-yellow-500 bg-clip-text text-transparent">
            Bagua
          </span>
        </h2>
        <p className="mx-auto mt-2 max-w-[280px] text-center text-sm leading-relaxed text-white/60">
          Connect your wallet or sign in to access the complete Bagua ecosystem.
        </p>

        <button
          onClick={onGoogle}
          className="mt-6 flex items-center gap-3 rounded-full bg-bg-card px-5 py-3.5 text-left ring-1 ring-accent-purple/70 hover:bg-white/5"
        >
          <GoogleIcon />
          <span className="flex-1 text-center text-sm font-semibold text-white">Continue with Google</span>
          <ChevronRightIcon className="text-accent-purple" />
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
              className="flex w-full items-center gap-3 rounded-2xl bg-bg-card card-border px-4 py-3.5 text-left hover:bg-white/5"
            >
              <Icon />
              <span className="flex-1 text-sm font-semibold text-white">{name}</span>
              <ChevronRightIcon className="text-white/50" />
            </button>
          ))}

          <button
            onClick={onGuest}
            className="flex w-full items-center gap-3 rounded-2xl bg-bg-card card-border px-4 py-3.5 text-left hover:bg-white/5"
          >
            <UserPlusIcon width="20" height="20" className="text-white/70" />
            <span className="flex-1 text-sm font-semibold text-white/80">Continue as Guest</span>
          </button>
        </div>

        <div className="mt-5 flex items-start justify-center gap-2 text-center">
          <span className="mt-0.5 inline-block h-3.5 w-3.5 shrink-0 rounded-full border border-white/40" />
          <p className="text-xs leading-relaxed text-white/50">
            By continuing, you agree to the{" "}
            <span className="text-amber-400">Terms of Service</span> and{" "}
            <span className="text-amber-400">Privacy Policy</span>.
          </p>
        </div>

        <div className="mt-5 flex items-center justify-center gap-2.5 border-t border-white/10 pt-4">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-purple/20 text-accent-purple">
            <ShieldCheckIcon width="15" height="15" />
          </span>
          <span className="text-[11px] leading-tight text-white/40">
            Trusted Multi-Chain Infrastructure
            <span className="block text-center">Secured by Bagua</span>
          </span>
        </div>
      </div>
    </div>
  );
}
