<template>
  <div class="relative border-t border-color py-4 text-center text-sm background">
    <p> Ⓒ {{ website.name.toLocaleUpperCase() }} PVT LTD 2023 - {{ currentYear }}</p>
    <!-- <div class="hidden space-x-4">
      <NuxtLink to="/terms-of-use"> Terms of Use </NuxtLink>
      <NuxtLink to="/privacy-policy"> Privacy Policy </NuxtLink>
      <NuxtLink to="/cookies-policy"> Cookies Policy </NuxtLink>
    </div> -->
  </div>
</template>

<script setup lang="ts">
const { website } = useInfo()
const currentYear = ref(new Date().getFullYear())
</script>
