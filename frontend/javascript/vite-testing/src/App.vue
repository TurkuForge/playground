<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
  <suspense>
    <Experimental msg="Testing experimental features in Vue" />
  </suspense>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Experimental from "@/components/Experimental.vue";
import HelloWorld from "@/components/HelloWorld.vue";

export default defineComponent({
  name: "App",
  components: {
    Experimental,
    HelloWorld,
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
