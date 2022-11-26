<template>
  <!-- Alchemy API-->
  <Transition>
    <div
      v-if="address"
      class="flex indicator flex-col p-0.5 border- justify-center rounded-xl w-full sm:w-3/5 h-full mt-5 mx-auto bg-gradient-to-r from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]"
    >
      <div
        v-if="address"
        class="flex flex-col h-full bg-gray-800 text-white rounded-lg p-2"
      >
        <span
          class="indicator-item indicator-top indicator-center badge badge-secondary"
          >AlchemyAPI</span
        >

        <span class="flex flex-col text-blue-400">
          NFT's in account:
          <div
            v-if="loadingNft"
            class="radial-progress text-secondary animate-spin-fast"
            style="--value: 40; --size: 1.2rem"
          ></div>
          <div
            v-if="accountNfts"
            v-for="nft in accountNfts"
            class="text-white hover:outline outline-1 hover:bg-opacity-60 outline-gray-500 transition-all w-3/4 bg-[#181818] rounded-md pb-1 pl-1"
          >
            <a
              target="_blank"
              :href="`${blockScanUrl}/address/${nft.contract.address}`"
              ><div
                class="flex flex-row flex-wrap align-top justify-start gap-x-2"
              >
                <span class="bg-gray-700 text-sm px-2 rounded-md mt-1"
                  >Title: {{ nft.title }}</span
                >
                <span class="bg-gray-700 text-sm px-2 rounded-md mt-1"
                  >Supply: {{ nft.contract.totalSupply }}</span
                >
                <span class="bg-gray-700 text-sm px-2 rounded-md mt-1"
                  >Type: {{ nft.contract.tokenType }}</span
                >
                <span class="bg-gray-700 text-sm px-2 rounded-md mt-1"
                  >Symbol: {{ nft.contract.symbol }}</span
                >
              </div>
            </a>
          </div>
          <div v-if="noNfts" class="text-white">Account has no nft's</div>
        </span>
        <span class="flex flex-col text-blue-400">
          Tokens
          <div
            v-if="tokenBalance && loading"
            class="radial-progress text-secondary animate-spin-fast"
            style="--value: 40; --size: 1.2rem"
          ></div>
          <span v-for="token in tokenBalance" class=""
            ><a
              class="hover:text-teal-600 text-white transition-all"
              target="_blank"
              :href="`${blockScanUrl}/address/${token.contractAddress}`"
              >{{ token.contractAddress }}</a
            ></span
          >
        </span>
        <div v-if="!tokenBalance" class="text-white">Account has no tokens</div>
        <span class="flex flex-col">
          <span class="text-blue-400">LatestBlock:</span>
          {{ latestBlock }}</span
        >
        <div
          v-if="tokenBalance && loading"
          class="radial-progress text-secondary animate-spin-fast"
          style="--value: 40; --size: 1.2rem"
        ></div>
      </div>
      <div
        v-if="!address"
        class="flex flex-col h-full bg-gray-900 text-white rounded-lg p-1"
      >
        <!-- <div class="flex align-middle justify-center mt-10">
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
      </div> -->
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { Network, Alchemy } from "alchemy-sdk";
import { ref, onMounted, reactive, watch, computed } from "vue";
import { useStoreWallet } from "@/stores/storeWallet.js";
// Pinia store
const storeWallet = useStoreWallet();

// SLEEP FUNCTION
function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}
// Components variables
const latestBlock = ref();
// Standard app

const cId = ref(0);

const tokenBalance = ref(true);
const accountNfts = ref(false);
const loading = ref(true);
const loadingNft = ref(true);
const noBalance = ref(false);
const noNfts = ref(false);
const apiLoading = ref(false);

const blockScanUrl = computed((contract) => {
  if (storeWallet.walletLoaded) {
    if (storeWallet.wallet.chainName === "goerli") {
      return "https://goerli.etherscan.io/";
    } else if (storeWallet.wallet.chainName === "maticmum") {
      return "https://mumbai.polygonscan.com/";
    } else if (storeWallet.wallet.chainName === "homestead") {
      return "https://etherscan.io/";
    } else if (storeWallet.wallet.chainName === "matic") {
      return "https://polygonscan.com/";
    } else if (storeWallet.wallet.chainName === "ropsten") {
      return "https://ropsten.etherscan.io/";
    } else return false;
  } else {
    return false;
  }
});

// Alchemy

const address = computed(() => {
  if (storeWallet.walletLoaded) {
    return storeWallet.wallet.address;
  } else {
    return undefined;
  }
});
const networkED = computed(() => {
  if (storeWallet.walletLoaded) {
    if (storeWallet.wallet.chainName === "goerli") {
      return "eth-goerli";
    } else if (storeWallet.wallet.chainName === "maticmum") {
      return "polygon-mumbai";
    } else if (storeWallet.wallet.chainName === "homestead") {
      return "eth-mainnet";
    } else if (storeWallet.wallet.chainName === "matic") {
      return "polygon-mainnet";
    } else if (storeWallet.wallet.chainName === "ropsten") {
      return "eth-ropsten";
    } else return false;
  } else {
    return false;
  }
});

watch(address, async (newAddress) => {
  if (
    newAddress &&
    storeWallet.walletLoaded &&
    typeof (storeWallet.wallet.chainName !== null)
  ) {
    console.log("new", newAddress, "old", address.value);
    noNfts.value = false;
    tokenBalance.value = true;
    accountNfts.value = false;
    loading.value = true;
    loadingNft.value = true;
    latestBlock.value = null;
    setTimeout(() => {
      InitAPICall();
    }, 900);
  }
});

// fetching Alchemy API
const InitAPICall = async () => {
  if (address.value && storeWallet.walletLoaded) {
    const settings = {
      apiKey: import.meta.env.VITE_ALCHEMY_API, // Replace with your Alchemy API Key.
      network: networkED.value, // Replace with your network.
    };
    console.log("SETTINGS NETWORK", settings.network);
    console.log("novalue", networkED, "value", networkED.value);
    const alchemy = new Alchemy(settings);
    loading.value = true;
    loadingNft.value = true;
    // Get balance Alchemy API
    await alchemy.core.getTokenBalances(address.value).then((response) => {
      if (response.tokenBalances <= 0) {
        loading.value = false;
        tokenBalance.value = false;
      } else {
        loading.value = false;
        tokenBalance.value = response.tokenBalances;
      }
    });
    // Get last block number Alchemy API
    await alchemy.core.getBlockNumber().then((response) => {
      latestBlock.value = response;
      //
    });
    // Access the Alchemy NFT API
    await alchemy.nft.getNftsForOwner(address.value).then((response) => {
      if (response.ownedNfts.length <= 0) {
        loadingNft.value = false;
        noNfts.value = true;
      } else {
        loadingNft.value = false;
        noNfts.value = false;
        accountNfts.value = response.ownedNfts;
      }
      //
    });
    // The wallet address / token we want to query for:
    const ownerAddr = address.value;
    const balances = await alchemy.core
      .getTokenBalances(ownerAddr)
      .then((response) => {
        return response.tokenBalances;
      });

    console.log(balances);

    // loop for finding all the contractAddresses assosi. with account
    const tokensOnAccount = [];
    if (!balances.length === 0) {
      for (let i = 0; i < balances.length; i++) {
        console.log(balances[i].contractAddress);
        tokensOnAccount.push(balances[i].contractAddress);
      }
      // The token address we want to query for metadata:

      const metadata = await alchemy.core
        .getTokenMetadata(tokensOnAccount[1])
        .then((response) => {
          if (this.metadata !== undefined) {
            console.log("METADATA", this.metadata);
            loading.value = false;
          } else {
            loading.value = false;
          }
          return response;
        });
    } else {
      loading.value = false;
      console.log("no TOKENS ON BALANCE/ACCOUNT");
    }
    console.log("Token Balances:", balances);
    loading.value = false;
  } else {
    console.log("no address present from initAPICALL Nfts.vue");
  }
};
</script>
<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
