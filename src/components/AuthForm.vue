<template>
  <div class="auth-form">
    <h1 v-if="isAuth">Iniciar Sesión</h1>
    <h1 v-else>Registrarse</h1>
    <form @submit.prevent="submitForm">
      <input v-model="user.email" type="email" placeholder="Email" required />
      <input
        v-model="user.password"
        type="password"
        placeholder="Contraseña"
        required
      />
      <input
        v-if="!isAuth"
        v-model="user.confirmPassword"
        type="password"
        placeholder="Confirmar contraseña"
        required
      />
      <button type="submit">
        {{ isAuth ? "Iniciar Sesión" : "Registrarse" }}
      </button>
    </form>
    <p>
      <span>
        {{ isAuth ? "¿No tienes cuenta? " : "¿Ya tienes cuenta? " }}
      </span>
      <RouterLink :to="isAuth ? '/signup' : '/login'">
        {{ isAuth ? "Registrarse" : "Iniciar Sesión" }}
      </RouterLink>
    </p>
  </div>
</template>

<script>
import { RouterLink } from "vue-router";
export default {
  name: "AuthForm",
  props: {
    isAuth: Boolean,
  },
  data() {
    return {
      user: {
        email: "",
        password: "",
        confirmPassword: "",
      },
    };
  },
  methods: {
    submitForm() {
      this.$emit("submit", this.user);
    },
  },
};
</script>

<style scoped>
.auth-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}
form {
  width: 200px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
