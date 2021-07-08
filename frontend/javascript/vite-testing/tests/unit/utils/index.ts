import { flushPromises, mount, MountingOptions } from "@vue/test-utils";
import { ComponentPublicInstance, defineComponent, h, Suspense } from "vue";

export const mountWithSuspense = async ({
  component,
  props,
  mountingOptions,
}: {
  component: new () => ComponentPublicInstance;
  props?: Object;
  mountingOptions?: MountingOptions<{}>;
}) => {
  const wrapper = mount(
    defineComponent({
      render() {
        return h(Suspense, null, {
          default: h(component, props),
        });
      },
    }),
    mountingOptions
  );

  // Resolve `async setup`, `async created`, etc.
  await flushPromises();

  return wrapper;
};
