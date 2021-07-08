<!-- Experimental.vue -->
<template>
  <h1>{{ msg }}</h1>
  <button @click="incrementCount">count is: {{ state.count }}</button>
  <pre>{{ userData }}</pre>
  <Links />
</template>

<script lang="ts" setup>
import { defineProps, reactive } from "vue";
import { useApi } from "@/composables/useApi";
import Links from "@/components/Links.vue";

defineProps({
  msg: {
    required: true,
    type: String,
  },
});

const state = reactive({ count: 0 });

const incrementCount = () => {
  state.count += 1;
};

const { userData } = await useApi();
</script>
