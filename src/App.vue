<script setup lang="ts">
import MyHeader from '$src/components/MyHeader.vue'
</script>

<template>
  <MyHeader :example="{ value: 'Hello Vite + Vue.js + tailwindUI static SPA' }" />

  <nav class="p-4">
    <router-link
      class="mr-4"
      to="/"
    >
      Home
    </router-link>
    
    <router-link
      class="mr-4"
      to="/about"
    >
      About
    </router-link>
  </nav>

  <router-view />
</template>
