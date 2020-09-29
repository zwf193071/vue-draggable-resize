const vueDraggableResizeComponent = {
    name: 'vueDraggableResize',
    inheritAttrs: false,
    created() {
        if (this.list !== null && this.value !== null) {
            console.error(
                "Value and list props are mutually exclusive! Please set one or another."
            )
        }
    },
}
if (typeof window !== 'undefined' && 'Vue' in window) {
    window.Vue.component('vueDraggableResize', vueDragComponent);
}
export default vueDraggableResizeComponent;