<template>
  <AuthForm :isAuth="false" @submit="signup" />
</template>

<script>
import { mapActions } from "vuex";
import AuthForm from "@/components/AuthForm.vue";

export default {
  components: {
    AuthForm,
  },
  methods: {
    ...mapActions(["signupUser"]),
    async signup(user) {
      if(user.password !== user.confirmPassword){
        alert("Las contraseñas no coinciden");
        return;
      }
      try {
        await this.signupUser(user);
        this.$router.push("/login");
      } catch (error) {
        console.error("Error creating user", error.message);
      }
    },
  },
};
</script>

<style scoped></style>
