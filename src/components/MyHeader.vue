<script setup lang="ts">
const props = defineProps<{ example: StringOrNumber, }>()
const a: StringOrNumber = { value: 1 } 
const foo = import.meta.env.BASE_URL
</script>

<template>
  <h1 class="bg-blue-500">
    {{ example.value }}
  </h1>
</template>
