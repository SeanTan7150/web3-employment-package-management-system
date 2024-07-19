declare var window: any;

export async function getCurrentConnectedAddress() {
  if (typeof window !== "undefined" && window.ethereum) {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    if (accounts.length > 0) {
      return accounts[0];
    }
  }
  return ""; // Indicate no address found
}
