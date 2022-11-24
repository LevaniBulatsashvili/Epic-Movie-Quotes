<template>
  <body class="min-h-[100vh]">
    <router-view></router-view>
  </body>
</template>

<script setup>
import "@/config/vee-validate/rules";
import "@/config/vee-validate/messages";
</script>

<style scoped>
body {
  background: linear-gradient(
    187.16deg,
    #181623 0.07%,
    #191725 51.65%,
    #0d0b14 98.75%
  );
}
</style>
