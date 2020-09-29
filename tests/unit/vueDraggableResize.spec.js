import {shallowMount } from "@vue/test-utils";

import vueDraggableResize from "@/vueDraggableResize";

let wrapper;
describe("when initialized with incorrect props", () => {
    const { error } = console;
    const { warn } = console;

    beforeEach(() => {
        console.error = jest.fn();
        console.warn = jest.fn();
    });

    afterEach(() => {
        console.error = error;
        console.warn = warn;
    })
    it("log an error when list and value are both not null", () => {
        wrapper = shallowMount(vueDraggableResize);
        expect(console.error).toBeCalledWith("Value and list props are mutually exclusive! Please set one or another.");
    });
});