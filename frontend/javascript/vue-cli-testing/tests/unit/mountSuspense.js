import { mount } from "@vue/test-utils";
import { defineComponent, h, Suspense } from "vue";

export const mountSuspense = (component, props, options) => {
  return mount(
    defineComponent({
      render() {
        return h(Suspense, null, {
          default: h(component, props),
          fallback: h("div", "fallback"),
        });
      },
    }),
    options
  );
};
