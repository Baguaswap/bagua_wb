"use client";

import { useRef, useState } from "react";
import { BrowserProvider, Contract, parseUnits } from "ethers";
import { useWallet } from "@/lib/WalletProvider";
import { FACTORY_ABI, FACTORY_ADDRESS, CHAIN_NAME } from "@/lib/config";
import {
  RocketIcon,
  ZapIcon,
  CoinIcon,
  FlameIcon,
  ShieldCheckIcon,
  UploadImageIcon,
  CheckCircleIcon,
} from "@/components/icons";

const DEFAULT_SUPPLY = "10000000000";

const FEATURES = [
  { icon: ZapIcon, title: "Instant Launch", desc: "Deploy your token in seconds" },
  { icon: CoinIcon, title: "10B Supply", desc: "Fixed supply of 10,000,000,000" },
  { icon: FlameIcon, title: "$BAGUA Burn", desc: "Every trade burns $BAGUA forever" },
  { icon: ShieldCheckIcon, title: "Safe & Transparent", desc: "Verified contracts & locked liquidity" },
];

const CHECKLIST = [
  "10,000,000,000 (10B) total supply",
  "No presale, fair launch",
  "Liquidity will be locked",
  "0% team allocation",
];

function buildTokenURI(name, symbol, description, imageDataUrl) {
  const metadata = { name, symbol, description, image: imageDataUrl || null };
  const json = JSON.stringify(metadata);
  const base64 = btoa(unescape(encodeURIComponent(json)));
  return `data:application/json;base64,${base64}`;
}

export default function LaunchpadView({ onComingSoon }) {
  const { address, connect, isOnGiwaChain, switchToGiwaChain } = useWallet();

  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [description, setDescription] = useState("");
  const [imageDataUrl, setImageDataUrl] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [txError, setTxError] = useState(null);
  const [txHash, setTxHash] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImageDataUrl(reader.result);
    reader.readAsDataURL(file);
  };

  const handleCreate = async () => {
    setTxError(null);
    setTxHash(null);

    if (!name.trim() || !symbol.trim()) {
      setTxError("Enter a token name and symbol first.");
      return;
    }

    setSubmitting(true);
    try {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const factory = new Contract(FACTORY_ADDRESS, FACTORY_ABI, signer);

      const fee = await factory.creationFee().catch(() => 0n);
      const supply = parseUnits(DEFAULT_SUPPLY, 18);
      const tokenURI = buildTokenURI(name.trim(), symbol.trim(), description.trim(), imageDataUrl);

      const tx = await factory.createToken(name.trim(), symbol.trim(), supply, tokenURI, { value: fee });
      const receipt = await tx.wait();

      setTxHash(receipt.hash);
      setName("");
      setSymbol("");
      setDescription("");
      setImageDataUrl(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      setTxError(err?.shortMessage || err?.reason || err?.message || "Failed to create token. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handlePrimaryButton = () => {
    if (!address) return connect();
    if (!isOnGiwaChain) return switchToGiwaChain();
    return handleCreate();
  };

  const primaryLabel = !address
    ? "Connect Wallet"
    : !isOnGiwaChain
    ? `Switch to ${CHAIN_NAME}`
    : submitting
    ? "Creating..."
    : "Create Token";

  return (
    <section className="mx-4 mt-4 pb-6">
      <div className="hero-glow relative overflow-hidden rounded-2xl bg-bg-panel card-border p-5">
        <h1 className="font-display text-2xl font-bold text-white">Launchpad</h1>
        <p className="mt-1 text-sm text-white/60">Launch your meme coin in seconds.</p>
        <p className="text-sm font-medium text-accent-purple">Fair. Fast. On-chain.</p>
        <RocketIcon width="64" height="64" className="absolute -right-2 -bottom-2 text-accent-purple/25" />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {FEATURES.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="rounded-xl bg-bg-card card-border p-3">
            <span className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-accent-purple/15 text-accent-purple">
              <Icon width="18" height="18" />
            </span>
            <p className="text-sm font-semibold text-white">{title}</p>
            <p className="mt-0.5 text-xs text-white/50">{desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-2xl bg-bg-panel card-border p-4">
        <h2 className="font-display text-lg font-bold text-white">Launch Your Meme Coin</h2>
        <p className="mt-0.5 text-sm text-white/50">Create and launch your token on {CHAIN_NAME}</p>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 flex items-center justify-between text-sm text-white/70">
              Token Name
              <span className="text-xs text-white/30">{name.length}/32</span>
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value.slice(0, 32))}
              maxLength={32}
              placeholder="e.g. Moon Bagua"
              className="w-full rounded-xl bg-bg-card card-border px-3 py-2.5 text-sm text-white placeholder-white/30 outline-none"
            />
          </div>
          <div>
            <label className="mb-1.5 flex items-center justify-between text-sm text-white/70">
              Token Symbol
              <span className="text-xs text-white/30">{symbol.length}/10</span>
            </label>
            <input
              value={symbol}
              onChange={(e) => setSymbol(e.target.value.toUpperCase().slice(0, 10))}
              maxLength={10}
              placeholder="e.g. MOON"
              className="w-full rounded-xl bg-bg-card card-border px-3 py-2.5 text-sm text-white placeholder-white/30 outline-none"
            />
          </div>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm text-white/70">Token Image</label>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex h-full min-h-[104px] w-full flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-bg-border bg-bg-card px-3 py-4 text-white/50"
            >
              {imageDataUrl ? (
                <img src={imageDataUrl} alt="Token preview" className="h-14 w-14 rounded-lg object-cover" />
              ) : (
                <>
                  <UploadImageIcon />
                  <span className="text-xs">Upload Image (PNG, JPG)</span>
                </>
              )}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          <div className="space-y-2 rounded-xl bg-bg-card card-border p-3">
            {CHECKLIST.map((item) => (
              <div key={item} className="flex items-start gap-2 text-xs text-white/70">
                <CheckCircleIcon className="mt-0.5 shrink-0 text-accent-green" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <label className="mb-1.5 flex items-center justify-between text-sm text-white/70">
            Description (optional)
            <span className="text-xs text-white/30">{description.length}/300</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value.slice(0, 300))}
            maxLength={300}
            rows={3}
            placeholder="Tell the world about your token..."
            className="w-full resize-none rounded-xl bg-bg-card card-border px-3 py-2.5 text-sm text-white placeholder-white/30 outline-none"
          />
        </div>

        {txError && (
          <p className="mt-3 rounded-xl border border-accent-red/30 bg-accent-red/10 px-4 py-2.5 text-sm text-accent-red">
            {txError}
          </p>
        )}
        {txHash && (
          <p className="mt-3 rounded-xl border border-accent-green/30 bg-accent-green/10 px-4 py-2.5 text-sm text-accent-green">
            Token created: {txHash.slice(0, 10)}...{txHash.slice(-6)}
          </p>
        )}

        <button
          onClick={handlePrimaryButton}
          disabled={submitting}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-accent-purple py-3.5 text-center font-semibold text-white disabled:opacity-60"
        >
          <RocketIcon width="18" height="18" />
          {primaryLabel}
        </button>
        <p className="mt-2 text-center text-xs text-white/40">
          Deploys on {CHAIN_NAME} • Takes a few seconds
        </p>
      </div>
    </section>
  );
}
