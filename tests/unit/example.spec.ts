import { shallowMount } from "@vue/test-utils";
import MainContent from "@/components/MainContent.vue";

describe("MainContent.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(MainContent, {
      propsData: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
