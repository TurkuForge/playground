import HelloWorld from "@/components/HelloWorld.vue";
import { useApi } from "@/composables/useApi";
import flushPromises from "flush-promises";
import suspenseShallowMount, {FALLBACK_TEXT} from "./SuspenseShallowMount";
import HelloWorldSubComponents from "@/components/HelloWorldSubComponents";

jest.mock("@/composables/useApi", () => ({
  useApi: jest.fn(),
}));

describe("Home.vue", () => {
  useApi.mockResolvedValue({
    api: {
      getPromo: jest.fn().mockResolvedValue([{ name: "promo1" }]),
    },
  });

  it("renders props.msg when passed", async () => {
    const msg = "new message";
    const wrapper = suspenseShallowMount( HelloWorld, { props: {msg} } );

    expect(wrapper.text()).toMatch(FALLBACK_TEXT);
    expect(wrapper.element).toMatchSnapshot();

    await flushPromises();

    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.text()).toMatch(msg);
  });

  it('renders props.message and stubs out all other components', async () => {
    const msg = "new message";
    const wrapper = suspenseShallowMount( HelloWorldSubComponents, { props: {msg} } );

    expect(wrapper.text()).toMatch(FALLBACK_TEXT);
    expect(wrapper.element).toMatchSnapshot();

    await flushPromises();

    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.text()).toMatch(msg);
  });
});
