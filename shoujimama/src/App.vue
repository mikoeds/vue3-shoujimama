<script setup lang="ts">
</script>

<template>
   <RouterView />
</template>

<style lang="scss">
@import "./assets/css/reset.css";
@import "./assets/css/main.css";
@import "./assets/css/color-dark.css";

#app{
  max-width: 100%;
}
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  background-color: #fff;
}

::-webkit-scrollbar-thumb {
  border-radius: 5px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
