import { useEffect } from "react";

const useMetaMaskAccountListener = (onAccountChange: () => void) => {
  useEffect(() => {
    if (window.ethereum) {
      const handleAccountChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          // user disconnected wallet
          onAccountChange();
        } else {
          console.log("Account changed to: ", accounts[0]);
          onAccountChange();
        }
      };

      window.ethereum.on("accountsChanged", handleAccountChanged);
      return () => {
        window.ethereum.removeListener("accountsChanged", handleAccountChanged);
      };
    }
  }, [onAccountChange]);
};

export default useMetaMaskAccountListener;
