import HelloWorld from "@/components/HelloWorld.vue";
import HelloWorldSubComponents from "@/components/HelloWorldSubComponents";
import { useApi } from "@/composables/useApi";
import { flushPromises } from "@vue/test-utils";
import { mountSuspense } from "./mountSuspense";
import suspenseShallowMount, { FALLBACK_TEXT } from "./SuspenseShallowMount";

jest.mock("@/composables/useApi", () => ({
  useApi: jest.fn(),
}));

describe("Home.vue", () => {
  useApi.mockResolvedValue({
    api: {
      getPromo: jest.fn().mockResolvedValue([{ name: "promo1" }]),
    },
  });

  it("renders props.msg with `mountSuspense`", async () => {
    const msg = "new message";
    const props = { msg };
    const wrapper = mountSuspense(HelloWorld, props);

    await flushPromises();

    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.text()).toMatch(msg);
  });

  it("renders props.msg with `mountSuspense` and stubs out all other components", async () => {
    const msg = "new message";
    const props = { msg };
    const stubs = Object.keys(HelloWorldSubComponents.components);
    const options = {
      global: {
        stubs,
      },
    };
    const wrapper = mountSuspense(HelloWorldSubComponents, props, options);

    await flushPromises();

    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.text()).toMatch(msg);
  });

  it("renders props.msg", async () => {
    const msg = "new message";
    const wrapper = suspenseShallowMount(HelloWorld, { props: { msg } });

    expect(wrapper.text()).toMatch(FALLBACK_TEXT);
    expect(wrapper.element).toMatchSnapshot();

    await flushPromises();

    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.text()).toMatch(msg);
  });

  it("renders props.msg and stubs out all other components", async () => {
    const msg = "new message";
    const wrapper = suspenseShallowMount(HelloWorldSubComponents, {
      props: { msg },
    });

    expect(wrapper.text()).toMatch(FALLBACK_TEXT);
    expect(wrapper.element).toMatchSnapshot();

    await flushPromises();

    expect(wrapper.text()).toMatch(msg);
    expect(wrapper.element).toMatchSnapshot();
  });
});
