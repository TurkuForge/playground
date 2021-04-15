<template>
  <div class="hello">
    <pre>{{ api.getPromo }}</pre>
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br />
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener"
      >vue-cli documentation</a
      >.
    </p>
    <CLIPlugins />
    <EssentialLinks />
    <Ecosystem />
  </div>
</template>

<script>
import { useApi } from "@/composables/useApi";
import CLIPlugins from "@/components/CLIPlugins";
import EssentialLinks from "@/components/EssentialLinks";
import Ecosystem from "@/components/Ecosystem";

export default {
  name: "HelloWorldSubComponents",
  components: {Ecosystem, EssentialLinks, CLIPlugins},
  props: {
    msg: String,
  },
  async setup() {
    const api = await useApi();
    return api;
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
