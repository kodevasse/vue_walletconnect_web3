<template>
  <main>
    <div
      class="p-4 flex flex-col mx-auto bg-neutral bg-opacity-10 w-64 text-center rounded-md border mb-2"
    >
      <p>X{{ x.toFixed(0) }}</p>
      <p>Y{{ y.toFixed(0) }}</p>
    </div>
    <div
      class="p-4 flex flex-col mx-auto bg-neutral bg-opacity-10 w-64 text-center rounded-md border mb-2"
    >
      <p class="text-xs">{{ storeWallet.shortAddress() }}</p>
      <p>{{}}</p>
      <button class="btn w-full" @click="storeWallet.connectWallet()">
        Connect Wallet
      </button>
    </div>
    <div
      class="p-1 justify-start flex flex-col mx-auto bg-neutral bg-opacity-10 w-64 text-center rounded-md border mb-2"
    >
      <div class="flex flex-col text-start ml-1">
        <p>Wallet connected: {{ storeWallet.walletLoaded }}</p>

        <p>Chain ID: {{ storeWallet.wallet.chainId }}</p>
        <p>Chain Name: {{ storeWallet.wallet.chainName }}</p>
        <p>
          Address Balance: {{ Number(storeWallet.wallet.balance).toFixed(4) }}
        </p>
      </div>
    </div>
  </main>
</template>

<script setup>
import { useLocalStorage, useMouse, usePreferredDark } from "@vueuse/core";
import { useStoreWallet } from "@/stores/storeWallet.js";

const storeWallet = useStoreWallet();
const { x, y } = useMouse();

// Wallet integration from storeWallet
storeWallet.initWallet();

// Ethereum Window
window.ethereum.on("accountsChanged", function (accounts) {
  storeWallet.initWallet();
  // Time to reload your interface with accounts[0]!
});
window.ethereum.on("chainChanged", function (chainId) {
  window.location.reload();
});

// // Force page refreshes on network changes
// {
//     // The "any" network will allow spontaneous network changes
//     const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
//     provider.on("network", (newNetwork, oldNetwork) => {
//         // When a Provider makes its initial connection, it emits a "network"
//         // event with a null oldNetwork along with the newNetwork. So, if the
//         // oldNetwork exists, it represents a changing network
//         if (oldNetwork) {
//             window.location.reload();
//         }
//     });
// }
// persist state in localStorage
const store = useLocalStorage("my-storage", {
  name: "Apple",
  color: "red",
});
</script>
