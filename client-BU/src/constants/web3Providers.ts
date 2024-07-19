import Web3 from "web3";

const providerUrl =
  "wss://eth-sepolia.g.alchemy.com/v2/sIqNHVU7HaXwRCM9ppMp9ul47fp1UdkQ";
// console.log("Connecting to provider:", providerUrl);
let web3Instance: Web3 | null = null;

function getWeb3Instance(): Web3 {
  if (!web3Instance) {
    web3Instance = new Web3(new Web3.providers.WebsocketProvider(providerUrl));
  }
  return web3Instance;
}

export { getWeb3Instance };
