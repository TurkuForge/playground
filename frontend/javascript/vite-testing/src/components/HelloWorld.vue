<template>
  <h1>{{ msg }}</h1>
  <button @click="count++">count is: {{ count }}</button>
  <Links />
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import Links from "@/components/Links.vue";

export default defineComponent({
  name: "HelloWorld",
  components: {
    Links,
  },
  props: {
    msg: {
      type: String,
      required: true,
    },
  },
  setup: () => {
    const count = ref(0);
    return { count };
  },
});
</script>
