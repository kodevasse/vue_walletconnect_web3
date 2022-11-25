<template>
  <main class="pt-10">
    <div
      class="p-4 flex flex-col mx-auto bg-neutral bg-opacity-10 w-64 text-center rounded-md border mb-2 hidden"
    >
      <p>X{{ x.toFixed(0) }}</p>
      <p>Y{{ y.toFixed(0) }}</p>
    </div>
    <div
      class="mb-2 w-72 flex p-[0.05rem] flex-col justify-center rounded-lg mt-5 mx-auto bg-gradient-to-r from-[#4dcd99] via-[#c4f63b] to-[#ab71a2]"
    >
      <div
        class="h-full bg-gray-800 text-white rounded-lg p-4 flex flex-col text-center"
      >
        <p
          class="font-extrabold text-transparent text-base bg-clip-text bg-gradient-to-r from-teal-400 to-yellow-400"
        >
          Boilerplate Vue 3 + Vite - Web3
        </p>
      </div>
    </div>
    <div
      class="p-4 flex flex-col mx-auto bg-neutral bg-opacity-10 w-64 text-center rounded-md border mb-2"
    >
      <!-- <p class="text-xs">{{ storeWallet.shortAddress() }}</p> -->
      <p>{{}}</p>
      <div
        class="indicator w-full cursor-pointer"
        @click="
          !storeWallet.walletLoaded
            ? manualConnect()
            : storeWallet.disconnectWallet()
        "
      >
        <button
          class="p-2 tracking-wide bg-zinc-800 rounded-full w-full text-lg text-gray-200"
          :class="
            !storeWallet.walletLoaded
              ? ' bg-teal-500 bg-opacity-5  outline outline-gray-600 text-emerald-300 hover:text-emerald-700 hover:transition-all hover:delay-100 hover:duration-500 hover:bg-opacity-[0.07]'
              : ' hover:outline hover:outline-gray-700'
          "
        >
          <section
            :class="!storeWallet.walletLoaded && 'hidden'"
            class="indicator-item indicator-middle indicator-end badge bg-transparent border-none mr-7"
          ></section>
          {{ buttonText
          }}<span
            v-if="storeWallet.walletLoaded"
            class="indicator-item indicator-middle indicator-start badge h-6 bg-zinc-800 ml-[1.6rem] border-none text-teal-500"
          >
            <span class="">{{
              Number(storeWallet.wallet.balance).toFixed(4).slice(0, 4)
            }}</span></span
          ><span
            v-if="storeWallet.walletLoaded"
            class="indicator-item indicator-top rounded-full bg-zinc-800 indicator-end badge mr-28 border-none text-gray-400"
          >
            <span
              class="text-[0.5rem] hover:text-fuchsia-300 hover:transition-all hover:delay-100 hover:duration-500"
              >{{ networkDisplay }}</span
            ></span
          >
        </button>
      </div>
    </div>
    <div
      class="p-1 justify-start flex flex-col mx-auto bg-neutral bg-opacity-10 w-64 text-center rounded-md border mb-2"
      :class="storeWallet.walletLoaded ? 'bg-teal-300' : 'bg-red-300'"
    >
      <div class="flex flex-col text-start ml-1">
        <p>Wallet connected: {{ storeWallet.walletLoaded }}</p>

        <p>Chain ID: {{ storeWallet.wallet.chainId }}</p>
        <p>Chain Name: {{ storeWallet.wallet.chainName }}</p>
        <p v-if="storeWallet.walletLoaded">
          Address Balance: {{ Number(storeWallet.wallet.balance).toFixed(4) }}
        </p>
        <p v-else>Address Balance:</p>
      </div>
    </div>
    <div
      class="p-4 flex flex-col mx-auto bg-neutral bg-opacity-10 w-64 text-center rounded-md border mb-2"
    >
      Coming....
      <p>-Alchemy API integration</p>
      <p>-contract interaction</p>
      <p>-NFT + Tokens</p>
      <p>-+++</p>
    </div>

    <button
      class="btn btn-error mx-auto flex justify-center hidden"
      @click="updateEthAvatar()"
      disabled
    >
      Testfunctions
    </button>
    <Nfts />
  </main>
</template>

<script setup>
import { useMouse, usePreferredDark } from "@vueuse/core";
import { useStoreWallet } from "@/stores/storeWallet.js";
import Nfts from "@/components/alchemy/Nfts.vue";
import { computed, ref, watch, onMounted, onActivated } from "vue";
import jazzicon from "jazzicon";

// Update Identicon/Jazzicon for eth address
const updateEthAvatar = () => {
  const section = document.querySelector("section");
  console.log("address changed watched");

  const el = jazzicon(
    30,
    parseInt(storeWallet.wallet.address.slice(2, 10), 16)
  );
  section.innerHTML = "";
  section.appendChild(el);
};

const buttonText = computed(() => {
  if (!storeWallet.walletLoaded) return "Connect Wallet";
  return storeWallet.shortAddress();
});

// persist state in localStorage
// const store = useStorage(
//   "my-storage",
//   {
//     disconnected: null,
//   },
//   localStorage,
//   { mergeDefaults: true } // <--
// );

const storeWallet = useStoreWallet();
const { x, y } = useMouse();

const manualConnect = async () => {
  await storeWallet.connectWallet();
  updateEthAvatar();
};
// Wallet integration from storeWallet
onMounted(async () => {
  await storeWallet.initWallet();
  updateEthAvatar();
});

// Ethereum Window
if (window.ethereum) {
  window.ethereum.on("accountsChanged", async function (accounts) {
    if (accounts.length !== 0) {
      console.log(accounts);
      await storeWallet.initWallet();
      updateEthAvatar();
    } else {
      console.log("disconnected added to localstorage", accounts);
      localStorage.setItem("my-storage", "disconnected");

      storeWallet.disconnectWallet();
    }
    // Time to reload your interface with accounts[0]!
  });
  window.ethereum.on("chainChanged", function (chainId) {
    storeWallet.netWorkChanged();
  });
} else {
  alert("Please install a Web3 Wallet, Metamask");
}

const networkDisplay = computed(() => {
  if (storeWallet.walletLoaded) {
    if (storeWallet.wallet.chainName === "goerli") {
      return "Goerli - TestNetwork";
    } else if (storeWallet.wallet.chainName === "maticmum") {
      return "Mumbai - TestNetwork";
    } else if (storeWallet.wallet.chainName === "homestead") {
      return "Eth";
    } else if (storeWallet.wallet.chainName === "matic") {
      return "Matic";
    } else if (storeWallet.wallet.chainName === "ropsten") {
      return "Ropsten - TestNetwork";
    }
  } else {
    return false;
  }
});
</script>
