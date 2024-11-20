<script>
import { mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["isAuthenticated", "currentUser"]),
    user() {
      return this.currentUser;
    },
  },
  methods: {
    ...mapActions(["logoutUser"]),
    async logout() {
      try {
        await this.logoutUser(this.user);
        this.$router.push("/login");
      } catch (error) {
        console.error("Error signing out", error.message);
      }
    },
  },
};
</script>

<template>
  <main>
    <h1>Home</h1>
    <h2 v-if="isAuthenticated">Bienvenido {{ currentUser?.email }}</h2>
    <button @click="logout">Cerrar Sesión</button>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}
</style>