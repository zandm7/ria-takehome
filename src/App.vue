<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/weather/losangeles">Los Angeles</RouterLink>
        <RouterLink to="/weather/beijing">Beijing</RouterLink>
        <RouterLink to="/weather/riodejaneiro">Rio de Janeiro</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
  max-width: fit-content;
  margin: auto;
  display: flex;
  place-items: center;

  .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}

nav {
  width: fit-content;
  text-align: center;
  font-size: 1rem;
  padding: 1rem 0;
  margin-top: 1rem;

  a {
    display: inline-block;
    padding: 0.5rem 1rem;
    border: 1px solid var(--color-border);
    border-radius: 10px;
    margin: 10px;
  }
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav {
}
</style>
