import { defineStore } from "pinia";
import {
  collection,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
  addDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "@/js/firebase";
import { useStoreAuth } from "@/stores/storeAuth";

let todosCollectionRef = [];
let todosCollectionQuery = [];
let getTodosSnapshot = null;

export const useStoreTodos = defineStore("storeTodos", {
  state: () => {
    return {
      todos: [
        // {
        //   id: 1,
        //   priority: 1,
        //   content: "Destroy The World??",
        //   reward: 500,
        //   category: "Per",
        //   isfav: false,
        //   done: false,
        //   duedate: "01.01.2022",
        //   datecreated: "01.01.2021",
        // },
      ],
      todosLoaded: false,
    };
  },
  actions: {
    init() {
      const storeAuth = useStoreAuth();
      console.log("storeAuth.user.id", storeAuth.user.id);
      todosCollectionRef = collection(db, "todosc");
      todosCollectionQuery = query(
        todosCollectionRef,
        orderBy("datecreated", "desc")
      );
      //initialize database refs
      this.getTodos();
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
    clearTodos() {
      this.todos = [];
      if (getTodosSnapshot) getTodosSnapshot(); //unsubscribe from any active listener
    },
    async addTodo(content) {
      let datecreated = new Date();

      await addDoc(todosCollectionRef, {
        content: content,
      });
    },
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
