import { defineStore } from "pinia";
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
      wallet: [
        {
          accounts: [2, 1],
          address: 1,
          balance: 0,
          chainId: 0,
          chainName: "",
        },
      ],
      walletLoaded: false,
    };
  },
  actions: {
    init() {
      // Ethers
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      console.log(provider, signer);

      // this.getTodos();
    },
    async getTodos() {
      this.todosLoaded = false;

      getTodosSnapshot = onSnapshot(
        todosCollectionQuery,
        (querySnapshot) => {
          let todos = [];
          querySnapshot.forEach((doc) => {
            let todo = {
              id: doc.id,
              content: doc.data().content,
            };
            todos.push(todo);
          });
          this.todos = todos;
          this.todosLoaded = true;
        },
        (error) => {
          console.log("error message", error.message);
        }
      );
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
