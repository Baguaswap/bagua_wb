// Bagua Swap runs on Giwa Chain — network settings below.
// Values default to GIWA Sepolia testnet and can be overridden with env vars.
export const CHAIN_ID = Number(process.env.NEXT_PUBLIC_CHAIN_ID || 91342);
export const CHAIN_NAME = process.env.NEXT_PUBLIC_CHAIN_NAME || "Giwa Chain";
export const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL || "https://sepolia-rpc.giwa.io";
export const EXPLORER_URL = process.env.NEXT_PUBLIC_EXPLORER_URL || "https://sepolia-explorer.giwa.io";
export const NATIVE_CURRENCY = {
  name: "ETH",
  symbol: "ETH",
  decimals: 18,
};

export const GIWA_CHAIN_PARAMS = {
  chainId: "0x" + CHAIN_ID.toString(16),
  chainName: CHAIN_NAME,
  nativeCurrency: NATIVE_CURRENCY,
  rpcUrls: [RPC_URL],
  blockExplorerUrls: [EXPLORER_URL],
};

// List of networks available in the "Select Network" popup (network switcher
// triggered from the Connect button in the header). Add more entries here to
// support more networks later — each one needs a unique `id`, `chainId`,
// `type` ("mainnet" or "testnet") so it can be filtered/searched in the popup.
export const NETWORKS = [
  {
    id: "giwa-chain",
    name: CHAIN_NAME,
    type: "testnet",
    chainId: CHAIN_ID,
    iconUrl: "/giwa-chain-icon.png",
    rpcUrls: [RPC_URL],
    blockExplorerUrls: [EXPLORER_URL],
    nativeCurrency: NATIVE_CURRENCY,
  },
  {
    id: "eth-sepolia",
    name: "Ethereum Sepolia",
    type: "testnet",
    chainId: 11155111,
    iconUrl: null, // no image asset — rendered with the inline EthIcon instead
    rpcUrls: ["https://rpc.sepolia.org"],
    blockExplorerUrls: ["https://sepolia.etherscan.io"],
    nativeCurrency: { name: "Sepolia ETH", symbol: "ETH", decimals: 18 },
  },
];

export const DEFAULT_NETWORK = NETWORKS[0];

// Contract addresses.
// NOTE: replace these with the addresses of your own contracts deployed on
// Giwa Chain — the values below are placeholders carried over from setup.
export const TOKEN_ADDRESS = process.env.NEXT_PUBLIC_TOKEN_ADDRESS || "0xb3478C0181cC542e051df8e080AF07dcE697B9C8";
export const FACTORY_ADDRESS = process.env.NEXT_PUBLIC_FACTORY_ADDRESS || "0x0de82c7E891eaD1d83fBFe4eC6547E9d9aefF2A8";
export const AMMS_ADDRESS = process.env.NEXT_PUBLIC_AMMS_ADDRESS || "0xc3839C57D6b00b5cB64eC373F93DC79ED147eBE2";

export const FACTORY_ABI = [
  "function createToken(string memory name, string memory symbol, uint256 supply, string memory tokenURI) external payable returns (address)",
  "function getAllTokens() external view returns (address[] memory)",
  "function creationFee() external view returns (uint256)",
  "event TokenCreated(address indexed tokenAddress, string name, string symbol, address indexed creator, string tokenURI)",
];

export const AMMS_ABI = [
  "function buyToken(address tokenAddress) external payable",
  "function sellToken(address tokenAddress, uint256 tokenAmount) external",
  "function tokenVault(address tokenAddress) external view returns (uint256)",
  "function isGraduated(address tokenAddress) external view returns (bool)",
  "event TokensPurchased(address indexed buyer, address indexed token, uint256 amountEth, uint256 amountTokens)",
  "event TokensSold(address indexed seller, address indexed token, uint256 amountTokens, uint256 amountEth)",
];

export const ERC20_ABI = [
  "function name() external view returns (string memory)",
  "function symbol() external view returns (string memory)",
  "function decimals() external view returns (uint8)",
  "function balanceOf(address account) external view returns (uint256)",
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function allowance(address owner, address spender) external view returns (uint256)",
];
