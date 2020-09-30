<template>
    <div id="app">
        <div class="tab-content">
            <div
                class="tab-pane show active"
                :id="component.name"
                v-for="component in componentList"
                :key="component.name"
            >
                <div class=" justify-content-center jumbotron main-container">
                    <div class="row icon-container">
                        <component :is="component.name"></component>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
const requireContext = require.context("./components", false, /\.vue$/);
const components = requireContext.keys().reduce((item, key) => {
    const component = requireContext(key).default;
    item[component.name] = component;
    return item;
}, {});
export default {
    name: 'app',
    components,
    data() {
        const componentList = Object.keys(components)
            .map(key => components[key])
            .sort((a, b) => a.order - b.order);
        return {
            componentList
        };
    }
}
</script>
<style>
.list-group-item {
    cursor: move;
}
</style>