import HelloWorld from "@/components/HelloWorld.vue";
import { mount } from "@vue/test-utils";

describe("HelloWorld.vue", () => {
  it("renders props.msg when passed", async () => {
    const msg = "new message";
    const wrapper = mount(HelloWorld, {
      props: { msg },
      global: {
        stubs: ["Links"],
      },
    });

    expect(wrapper.text()).toMatch(msg);

    const button = wrapper.find("button");
    await button.trigger("click");
    expect(button.text()).toContain("1");

    expect(wrapper.html()).toMatchInlineSnapshot(`
      "<h1>new message</h1><button>count is: 1</button>
      <links-stub></links-stub>"
    `);
  });
});
