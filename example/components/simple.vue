<template>
    <div class="col-6">
        <h3>Draggable Resize {{ draggingInfo }}</h3>
        <vueDraggableResize
            class="list-group"
            :list="list"
            ghost-class="ghost"
            @start="draggable = true"
            @end="draggable = false"
        >
            <div
                class="list-group-item"
                v-for="element in list"
                :key="element.name"
            >
                {{ element.name }}
            </div>
        </vueDraggableResize>
    </div>
</template>
<script>
import vueDraggableResize from "@/vueDraggableResize"
export default {
    name: "simple",
    components: {
        vueDraggableResize
    },
    data () {
        return {
            list: [
                { name: 'lucy', id: 0 },
                { name: 'jack', id: 1 },
                { name: 'sandy', id: 2}
            ],
            draggable: false
        }
    },
    computed: {
        draggingInfo () {
            return this.draggable ? "under dragging" : "";
        }
    },
}
</script>