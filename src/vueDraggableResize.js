import Sortable from "sortablejs";
import { camelize } from "./util/helper";

function emit(evtName, evtData) {
    this.$nextTick(() => this.$emit(evtName.toLowerCase(), evtData));
}
function computeIndexes(slots, children, isTransition, footerOffset) {
    if (!slots) {
        return [];
    }

    const elmFromNodes = slots.map(elt => elt.elm);
    const footerIndex = children.length - footerOffset;
    const rawIndexes = [...children].map((elt, idx) =>
        idx >= footerIndex ? elmFromNodes.length : elmFromNodes.indexOf(elt)
    );
    return isTransition ? rawIndexes.filter(ind => ind !== -1) : rawIndexes;
}
function delegateAndEmit(evtName) {
    return evtData => {
        if (this.realList !== null) {
            console.log(evtName)
            this["onDrag" + evtName](evtData);
        }
        emit.call(this, evtName, evtData);
    }
}
function getSlot(slot, scopedSlot, key) {
    return slot[key] || (scopedSlot[key] ? scopedSlot[key]() : undefined);
}

function isTransition(slots) {
    if (!slots || slots.length !== 1) {
        return false;
    }
    const [{ componentOptions }] = slots;
    if (!componentOptions) {
        return false;
    }
    return isTransitionName(componentOptions.tag);
}
const eventsListened = ["Start", "Add", "Remove", "End"];

const props = {
    options: Object,
    list: {
        type: Array,
        required: false,
        default: null
    },
    value: {
        type: Array,
        required: false,
        default: null
    },
    element: {
        type: String,
        default: "div"
    },
    tag: {
        type: String,
        default: null
    }
}
const vueDraggableResizeComponent = {
    name: 'vueDraggableResize',
    inheritAttrs: false,
    props,
    data() {
        return {
            transitionMode: false,
            noneFunctionalComponentMode: false
        }
    },
    render(h) {
        const children = this.$slots.default; // 获取包裹容器内的子元素列表
        return h(this.getTag(), {}, children);
    },
    created() {
        if (this.list !== null && this.value !== null) {
            console.error(
                "Value and list props are mutually exclusive! Please set one or another."
            )
        }
        if (this.options !== undefined) {
            console.warn(
                "Options props is deprecated, add sortable options directly as vue.draggable.resize item, or use v-bind."
            );
        }
    },
    computed: {
        rootContainer() {
            return this.transitionMode ? this.$el.children[0] : this.$el;
        },
        realList() {
            return this.list ? this.list : this.value;
        }
    },
    watch: {
        // realList() {
        //     this.computeIndexes();
        // }
    },
    mounted() {
        const optionsAdded = {};
        eventsListened.forEach(elt => {
            optionsAdded["on" + elt] = delegateAndEmit.call(this, elt);
        });
        const attributes = Object.keys(this.$attrs).reduce((res, key) => {
            res[camelize(key)] = this.$attrs[key];
            return res;
        }, {});
        const options = Object.assign({}, this.options, attributes, optionsAdded);
        console.log(options)
        this._sortable = new Sortable(this.rootContainer, options);
        //this.computeIndexes();
    },
    beforeDestroy() {
        //if (this._sortable !== undefined) this._sortable.destroy();
    },
    methods: {
        getTag() {
            return this.tag || this.element;
        },
        onDragStart(evt) {
            console.log(evt)
        },
        onDragEnd() {
        },
        computeIndexes() {
            this.$nextTick(() => {
                this.visibleIndexes = computeIndexes(
                    this.getChildrenNodes(),
                    this.rootContainer.children,
                    this.transitionMode,
                    this.footerOffset
                );
            });
        },
        getChildrenNodes() {
            const rawNodes = this.$slots.default;
            return rawNodes;
        }
    }
}
if (typeof window !== 'undefined' && 'Vue' in window) {
    window.Vue.component('vueDraggableResize', vueDragComponent);
}
export default vueDraggableResizeComponent;