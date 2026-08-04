"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { BrowserProvider, formatEther } from "ethers";
import { CHAIN_ID, DEFAULT_NETWORK } from "./config";

const WalletContext = createContext(null);

function buildChainParams(network) {
  return {
    chainId: "0x" + network.chainId.toString(16),
    chainName: network.name,
    nativeCurrency: network.nativeCurrency,
    rpcUrls: network.rpcUrls,
    blockExplorerUrls: network.blockExplorerUrls,
  };
}

export function WalletProvider({ children }) {
  const [address, setAddress] = useState(null);
  const [balance, setBalance] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState(null);
  // Network chosen from the "Select Network" popup — defaults to Giwa Chain.
  const [selectedNetwork, setSelectedNetwork] = useState(DEFAULT_NETWORK);

  const getEthereum = () => (typeof window !== "undefined" ? window.ethereum : null);

  const refreshBalance = useCallback(async (addr) => {
    const ethereum = getEthereum();
    if (!ethereum || !addr) return;
    const provider = new BrowserProvider(ethereum);
    const raw = await provider.getBalance(addr);
    setBalance(formatEther(raw));
  }, []);

  // Generic chain switcher — works for any network in lib/config.js NETWORKS,
  // not just Giwa Chain. Asks the wallet to add the chain if it doesn't know it yet.
  const switchToNetwork = useCallback(async (network) => {
    const ethereum = getEthereum();
    if (!ethereum) return;
    const params = buildChainParams(network);
    try {
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: params.chainId }],
      });
    } catch (switchError) {
      // Chain not added yet — ask the wallet to add it.
      if (switchError?.code === 4902) {
        await ethereum.request({
          method: "wallet_addEthereumChain",
          params: [params],
        });
      } else {
        throw switchError;
      }
    }
  }, []);

  // Kept for backward compatibility with screens that only ever connect to Giwa Chain.
  const switchToGiwaChain = useCallback(async () => {
    await switchToNetwork(DEFAULT_NETWORK);
  }, [switchToNetwork]);

  // `connect` now optionally takes a network (selected from the popup). When
  // called with no argument (existing call sites), it falls back to whichever
  // network was last selected, defaulting to Giwa Chain.
  const connect = useCallback(
    async (network) => {
      const targetNetwork = network || selectedNetwork;
      const ethereum = getEthereum();
      if (!ethereum) {
        setError("No wallet found. Install MetaMask or another Web3 wallet.");
        return;
      }
      setConnecting(true);
      setError(null);
      try {
        const accounts = await ethereum.request({ method: "eth_requestAccounts" });
        await switchToNetwork(targetNetwork);
        const chainHex = await ethereum.request({ method: "eth_chainId" });
        setAddress(accounts[0]);
        setChainId(parseInt(chainHex, 16));
        setSelectedNetwork(targetNetwork);
        await refreshBalance(accounts[0]);
      } catch (err) {
        setError(err?.message || "Failed to connect wallet.");
      } finally {
        setConnecting(false);
      }
    },
    [refreshBalance, switchToNetwork, selectedNetwork]
  );

  const disconnect = useCallback(() => {
    setAddress(null);
    setBalance(null);
    setChainId(null);
  }, []);

  useEffect(() => {
    const ethereum = getEthereum();
    if (!ethereum) return;

    const handleAccountsChanged = (accounts) => {
      if (accounts.length === 0) {
        disconnect();
      } else {
        setAddress(accounts[0]);
        refreshBalance(accounts[0]);
      }
    };
    const handleChainChanged = (hexChainId) => {
      setChainId(parseInt(hexChainId, 16));
    };

    ethereum.on?.("accountsChanged", handleAccountsChanged);
    ethereum.on?.("chainChanged", handleChainChanged);

    return () => {
      ethereum.removeListener?.("accountsChanged", handleAccountsChanged);
      ethereum.removeListener?.("chainChanged", handleChainChanged);
    };
  }, [disconnect, refreshBalance]);

  const value = useMemo(
    () => ({
      address,
      balance,
      chainId,
      connecting,
      error,
      selectedNetwork,
      isOnGiwaChain: chainId === CHAIN_ID,
      connect,
      disconnect,
      switchToGiwaChain,
      switchToNetwork,
    }),
    [
      address,
      balance,
      chainId,
      connecting,
      error,
      selectedNetwork,
      connect,
      disconnect,
      switchToGiwaChain,
      switchToNetwork,
    ]
  );

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}

export function useWallet() {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error("useWallet must be used within a WalletProvider");
  return ctx;
}
