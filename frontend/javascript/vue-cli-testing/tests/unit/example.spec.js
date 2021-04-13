import HelloWorld from "@/components/HelloWorld.vue";
import { useApi } from "@/composables/useApi";
import { mount } from "@vue/test-utils";
import flushPromises from "flush-promises";
import { defineComponent, h, Suspense } from "vue";

jest.mock("@/composables/useApi", () => ({
  useApi: jest.fn(),
}));

const mountSuspense = (component, props) => {
  return mount(
    defineComponent({
      render() {
        return h(Suspense, null, {
          default: h(component, props),
          fallback: h("div", "fallback"),
        });
      },
    })
  );
};

describe("Home.vue", () => {
  useApi.mockResolvedValue({
    api: {
      getPromo: jest.fn().mockResolvedValue([{ name: "promo1" }]),
    },
  });

  it("renders props.msg when passed", async () => {
    const msg = "new message";
    const wrapper = mountSuspense(HelloWorld, {
      msg,
    });

    await flushPromises();

    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.text()).toMatch(msg);
  });
});
