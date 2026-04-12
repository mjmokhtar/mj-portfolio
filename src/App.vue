<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import AOS from 'aos'

onMounted(() => {
  AOS.init({ once: true })
})
</script>

<template>
  <RouterView />
</template>