<template>
  <!-- Alchemy API-->
  <div
    class="flex indicator flex-col p-0.5 border- justify-center rounded-xl w-full sm:w-3/5 h-64 mt-5 mx-auto bg-gradient-to-r from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]"
  >
    <div
      v-if="storeWallet.wallet.address"
      class="flex flex-col h-full bg-gray-800 text-white rounded-lg p-1"
    >
      <span
        class="indicator-item indicator-top indicator-center badge badge-secondary"
        >AlchemyAPI</span
      >

      <span class="flex flex-col text-blue-400">
        NFT's in account:
        <div
          v-if="accountNfts"
          v-for="nft in accountNfts"
          class="text-white hover:text-teal-300 transition-all"
        >
          <a
            target="_blank"
            :href="`https://mumbai.polygonscan.com/address/${nft.contract.address}`"
            ><div
              class="flex flex-row flex-wrap align-top justify-start gap-x-2"
            >
              <span class="bg-cyan-900 text-sm px-2 rounded-md mt-1"
                >Title: {{ nft.title }}</span
              >
              <span class="bg-cyan-900 text-sm px-2 rounded-md mt-1"
                >Supply: {{ nft.contract.totalSupply }}</span
              >
              <span class="bg-cyan-900 text-sm px-2 rounded-md mt-1"
                >Type: {{ nft.contract.tokenType }}</span
              >
              <span class="bg-cyan-900 text-sm px-2 rounded-md mt-1"
                >Symbol: {{ nft.contract.symbol }}</span
              >
            </div>
          </a>
        </div>
        <div v-if="!accountNfts" class="text-white">Account has no nft's</div>
      </span>
      <span class="flex flex-col text-blue-400">
        Tokens
        <span
          v-for="token in tokenBalance"
          class="text-white hover:text-teal-600 transition-all"
          ><a
            target="_blank"
            :href="`https://mumbai.polygonscan.com/address/${token.contractAddress}`"
            >{{ token.contractAddress }}</a
          ></span
        >
      </span>
      <div v-if="!tokenBalance" class="text-white">Account has no tokens</div>
      <span class="flex flex-col">
        <span class="text-blue-400">LatestBlock:</span>
        {{ latestBlock }}</span
      >
    </div>
    <div
      v-if="!address"
      class="flex flex-col h-full bg-gray-900 text-white rounded-lg p-1"
    >
      <div class="flex align-middle justify-center mt-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="text-gray-600 animate-pulse icon icon-tabler icon-tabler-arrow-big-up-lines"
          width="60"
          height="60"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path
            d="M9 12h-3.586a1 1 0 0 1 -.707 -1.707l6.586 -6.586a1 1 0 0 1 1.414 0l6.586 6.586a1 1 0 0 1 -.707 1.707h-3.586v3h-6v-3z"
          ></path>
          <path d="M9 21h6"></path>
          <path d="M9 18h6"></path>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStoreWallet } from "@/stores/storeWallet.js";

const storeWallet = useStoreWallet();
</script>
