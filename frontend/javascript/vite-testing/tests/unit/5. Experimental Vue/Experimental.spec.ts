import Experimental from "@/components/Experimental.vue";
import { useApi } from "@/composables/useApi";
import { mocked } from "ts-jest/utils";
import { mountWithSuspense } from "../utils";

jest.mock("@/composables/useApi");

const mockedUseApi = mocked(useApi);

describe("Experimental.vue", () => {
  beforeAll(() => {
    mockedUseApi.mockResolvedValue({
      userData: { age: 50, name: "Baby Yoda" },
    });
  });

  it("renders props.msg when passed", async () => {
    const msg = "Experimental features";
    const wrapper = await mountWithSuspense({
      component: Experimental,
      props: {
        msg,
      },
      mountingOptions: {
        global: {
          stubs: ["Links"],
        },
      },
    });

    const experimental = wrapper.findComponent(Experimental);
    expect(experimental.text()).toMatch(msg);

    const button = experimental.find("button");
    await button.trigger("click");
    expect(button.text()).toContain("1");

    // Currently, some Vue Test Utils features don't work properly when using `<script setup>`.
    // One of those is `stubs`. As seen below, the `Links` component is included in the snapshot
    // although it should have been replaced with `<links-stub>`.
    expect(experimental.html()).toMatchInlineSnapshot(`
      "<h1>Experimental features</h1><button>count is: 1</button><pre>{
        \\"age\\": 50,
        \\"name\\": \\"Baby Yoda\\"
      }</pre>
      <p> Recommended IDE setup: <a href=\\"https://code.visualstudio.com/\\" target=\\"_blank\\">VSCode</a> + <a href=\\"https://marketplace.visualstudio.com/items?itemName=octref.vetur\\" target=\\"_blank\\"> Vetur </a> or <a href=\\"https://github.com/johnsoncodehk/volar\\" target=\\"_blank\\">Volar</a> (if using <code>&lt;script setup&gt;</code>) </p>
      <p>See <code>README.md</code> for more information.</p>
      <p><a href=\\"https://vitejs.dev/guide/features.html\\" target=\\"_blank\\"> Vite Docs </a> | <a href=\\"https://v3.vuejs.org/\\" target=\\"_blank\\">Vue 3 Docs</a></p>"
    `);
  });
});
