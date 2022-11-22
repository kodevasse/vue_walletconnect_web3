import { defineStore } from "pinia";
import { ethers } from "ethers";

// import {
//   collection,
//   onSnapshot,
//   doc,
//   deleteDoc,
//   updateDoc,
//   addDoc,
//   query,
//   orderBy,
// } from "firebase/firestore";
// import { db } from "@/js/firebase";
// import { useStoreAuth } from "@/stores/storeAuth";

// let todosCollectionRef = [];
// let todosCollectionQuery = [];
// let getTodosSnapshot = null;

export const useStoreWallet = defineStore("storeWallet", {
  state: () => {
    return {
      wallet: {
        accounts: [],
        address: "",
        balance: 0,
        chainId: null,
        chainName: "",
      },
      provider: null,
      signer: null,
      walletLoaded: false,
      walletNotFound: false,
      isConnected: null,
      manualDisconnect: false,
      shortBalance: function () {
        if (this.wallet.balance.length !== 0) {
          return this.wallet.balance.toFixed(4);
        } else {
          return this.wallet.balance;
        }
      },
      shortAddress: function () {
        if (this.wallet.address !== undefined) {
          if (this.wallet.address.length > 2) {
            return (
              this.wallet.address.slice(1, 6) +
              "........." +
              this.wallet.address.slice(35, 42)
            );
          } else {
            return "";
          }
        } else {
          return "";
        }
      },
    };
  },
  actions: {
    async initWallet() {
      const manualDisconnected = localStorage.getItem(
        "my-storage",
        "disconnected"
      );
      console.log(manualDisconnected);
      // Ethers get signer and provider
      if (window.ethereum) {
        (this.provider = await new ethers.providers.Web3Provider(
          window.ethereum,
          "any"
        )),
          console.log(`Wallet found: ${this.provider.connection.url}`);
        this.signer = await this.provider.getSigner();

        // checking if connected
        this.isConnected = async () => {
          // this.wallet.accounts = await this.provider.send(
          //   "eth_requestAccounts",
          //   []
          // );
          const provider = await new ethers.providers.Web3Provider(
            window.ethereum
          );
          const accounts = await provider.listAccounts();
          if (accounts.length !== 0 && !manualDisconnected) {
            console.log("accounts", accounts[0]);
            this.wallet.accounts = accounts;
            this.wallet.address = this.wallet.accounts[0];
            this.initAccount();
            localStorage.removeItem("my-storage", "disconnected");
            this.walletLoaded = true;
            console.log();
            // initAccount();

            if (typeof accounts === "string") return false;
            return accounts.length > 0;
          } else {
            console.log("no account pre approved");
          }
        };
      } else {
        this.walletNotFound = true;
      }
      this.isConnected();
    },
    async connectWallet() {
      const manualDisconnected = localStorage.getItem(
        "my-storage",
        "disconnected"
      );
      console.log(manualDisconnected);
      this.walletLoaded = false;

      this.wallet.accounts = await this.provider.send(
        "eth_requestAccounts",
        []
      );
      if (typeof this.wallet.accounts === "string") {
        console.log("An error occurred" + this.wallet.accounts);
      }
      this.wallet.address = this.wallet.accounts[0];
      this.initAccount();
      localStorage.removeItem("my-storage", "disconnected");
      this.walletLoaded = true;
    },
    // Init the account information
    async initAccount() {
      var provider = await new ethers.providers.Web3Provider(window.ethereum);

      var balancePreCalc = await provider.getBalance(this.wallet.address);
      // Convert big number
      this.wallet.balance = ethers.utils.formatEther(balancePreCalc);

      // Get chain name and chain id
      var { name, chainId } = await provider.getNetwork();
      this.wallet.chainId = chainId;
      this.wallet.chainName = name;

      // blockNumber.value = await provider.getBlockNumber();
      // InitAPICall();
    },
    netWorkChanged() {
      // // Force page refreshes on network changes

      // The "any" network will allow spontaneous network changes
      // const provider = new ethers.providers.Web3Provider(
      //   window.ethereum,
      //   "any"
      // );
      this.provider.on("network", (newNetwork, oldNetwork) => {
        // When a Provider makes its initial connection, it emits a "network"
        // event with a null oldNetwork along with the newNetwork. So, if the
        // oldNetwork exists, it represents a changing network
        if (oldNetwork) {
          window.location.reload();
        }
      });
    },
    async disconnectWallet() {
      this.wallet.accounts = [];
      this.wallet.address = "";
      this.wallet.balance = 0;
      this.wallet.chainId = null;
      this.wallet.chainName = "";

      this.walletLoaded = false;
      this.walletNotFound = false;
      this.isConnected = null;
      this.manualDisconnect = true;
      localStorage.setItem("my-storage", "disconnected");
    },
    clearTodos() {},
    async addTodo(content) {},
    async deleteTodo(idToDelete) {},
    async updateTodo(id, content, duedate, priority, category, reward) {},
    async isfavUpdateTodo(id, isfav) {},
    async doneUpdateTodo(id, done) {},
  },
  getters: {
    getTodoContent: (state) => {
      return null;
    },
    totalTodosTodo: (state) => {},
    totalCharactersTodo: (state) => {},
  },
});
