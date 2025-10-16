<script setup lang="ts">
import MyHeader from '$src/components/MyHeader.vue'
</script>

<template>
  <MyHeader :example="{ value: 'Hello Vite + Vue.js + tailwindUI static SPA' }" />

  <nav class="p-4">
    <a
      class="mr-4"
      href="/"
    >
      Home
    </a>

    <a href="/about">
      About
    </a>
  </nav>

  <router-view />
</template>
