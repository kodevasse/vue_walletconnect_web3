<template>
  <div class="mb-8">
    <ConnectWalletButton
      class="mx-auto my-5"
      :address="address"
      @click="connect"
      :dark="true"
    /><button
      v-if="address"
      @click="initAccount(), InitAPICall()"
      class="btn btn-xs btn-success flex mx-auto"
    >
      Resync
    </button>
  </div>
  <!-- Ethers JS -->
  <div
    class="flex indicator flex-col p-0.5 border- justify-center rounded-xl w-full sm:w-3/5 h-64 mt-5 mx-auto bg-gradient-to-r from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]"
  >
    <div
      v-if="address"
      class="flex flex-col h-full bg-gray-800 text-white rounded-lg p-1"
    >
      <span
        class="indicator-item indicator-top indicator-center badge badge-primary"
        >Ethers.js</span
      >
      <span class="flex flex-col">
        <span class="text-blue-400">Address:</span> {{ address }}</span
      >
      <span class="flex flex-col">
        <span class="text-blue-400">balance</span>
        {{ balance }}</span
      >
      <span class="flex flex-col">
        <span class="text-blue-400">Blocknumber:</span>
        {{ blockNumber }}</span
      >
      <span class="flex flex-col">
        <span class="text-blue-400">chainId</span> {{ cId }}</span
      >
      <span class="flex flex-col">
        <span class="text-blue-400">chainName </span>{{ chainName }}</span
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
  <!-- Alchemy API-->
  <div
    class="flex indicator flex-col p-0.5 border- justify-center rounded-xl w-full sm:w-3/5 h-64 mt-5 mx-auto bg-gradient-to-r from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]"
  >
    <div
      v-if="address"
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
  <!-- <div class="p-4 flex flex-col space-y-6 pt-10">
    <button class="btn btn-warning" @click="connectWallet">
      Connect Wallet
    </button>
    <button class="btn" :disabled="myAddress" @click="getAccountInfo">
      Get Account Info</button
    >{{ blockNumber }}<br />{{ balance }}<br />{{ myAddress }} 
  </div> -->
</template>

<script setup>
import { Network, Alchemy } from "alchemy-sdk";
import { ref, onMounted, reactive } from "vue";
import { ethers } from "ethers";
import { ConnectWalletButton } from "vue-connect-wallet";
import { useMetaMaskWallet } from "vue-connect-wallet";

// Alchemy
const settings = {
  apiKey: import.meta.env.VITE_ALCHEMY_API, // Replace with your Alchemy API Key.
  network: Network.MATIC_MUMBAI, // Replace with your network.
};

const alchemy = new Alchemy(settings);
const tokenBalance = ref(true);
const accountNfts = ref(true);
const loading = ref(true);
const noBalance = ref(false);
const noNfts = ref(false);
// Standard app
const address = ref("");
const balance = ref("");
const blockNumber = ref("sync...");
const cId = ref(0);
const chainName = ref("sync...");
const wallet = useMetaMaskWallet();

wallet.onAccountsChanged((accounts) => {
  console.log("account changed to: ", accounts[0]);
  address.value = accounts[0];
  initAccount();
});
wallet.onChainChanged((chainId) => {
  console.log("chain changed to:", chainId);
  window.location.reload();
});

const connect = async () => {
  const accounts = await wallet.connect();
  if (typeof accounts === "string") {
    console.log("An error occurred" + accounts);
  }
  address.value = accounts[0];
};

const switchAccount = async () => {
  await wallet.switchAccounts();
  connect();
};

const isConnected = async () => {
  const accounts = await wallet.getAccounts();
  await provider.send("eth_requestAccounts", []);
  address.value = accounts[0];
  initAccount();
  if (typeof accounts === "string") return false;
  return accounts.length > 0;
};
onMounted(() => {
  isConnected();
});

// Ethers
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

// init the account to ethers
const initAccount = async () => {
  var balanceUncalced = await provider.getBalance(address.value);

  balance.value = ethers.utils.formatEther(balanceUncalced);

  blockNumber.value = await provider.getBlockNumber();
  var { name, chainId } = await provider.getNetwork();
  console.log(name, chainId);
  cId.value = chainId;
  chainName.value = name;
  InitAPICall();
};
//
//
// Alchemy API CALLS
const latestBlock = ref();

const InitAPICall = async () => {
  // Get balance Alchemy API
  await alchemy.core.getTokenBalances(address.value).then((response) => {
    if (response.tokenBalances <= 0) {
      tokenBalance.value = false;
    } else {
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
      accountNfts.value = false;
    } else {
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
  for (let i = 0; i < balances.length; i++) {
    console.log(balances[i].contractAddress);
    tokensOnAccount.push(balances[i].contractAddress);
  }
  // The token address we want to query for metadata:

  const metadata = await alchemy.core
    .getTokenMetadata(tokensOnAccount[1])
    .then((response) => {
      return response;
    });

  console.log("Token Balances:");
  console.log(balances);
  console.log("Token Metadata: ");
  console.log(metadata);
  loading.value = false;
};
</script>
