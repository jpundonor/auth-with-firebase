import { createStore } from "vuex";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "@/firebaseconfig";

const store = createStore({
  state() {
    return {
      user: null,
      authChecked: false,
    };
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setAuthChecked(state, checked) {
      state.authChecked = checked;
    },
  },
  actions: {
    listenToAuthChanges({ commit }) {
      return new Promise((resolve) => {
        onAuthStateChanged(auth, (user) => {
          commit("setUser", user);
          commit("setAuthChecked", true);
          resolve();
        });
      });
    },
    async loginUser(_, user) {
      try {
        await signInWithEmailAndPassword(auth, user.email, user.password);
      } catch (error) {
        throw new Error(error.message);
      }
    },
    async signupUser(_, user) {
      try {
        await createUserWithEmailAndPassword(auth, user.email, user.password);
      } catch (error) {
        throw new Error(error.message);
      }
    },
    async logoutUser({ commit }) {
      await signOut(auth);
      commit("setUser", null);
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
    currentUser: (state) => state.user,
  },
});

export default store;
