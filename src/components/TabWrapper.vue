<template>
    <div class="tabs">
        <ul class="tabs-header">
            <li v-for="title in tabTitles" :key="title" :class="{ active: title == selectedTitle }"
                @click="selectTitle(title)">
                {{ title }}
            </li>
        </ul>
        <slot />
    </div>
</template>

<script>
import { ref, provide, onMounted } from 'vue'

export default {
    setup(props, { slots }) {
        // console.log(slots.default());
        const tabTitles = ref(slots.default().map((tab) => tab.props?.title));
        const selectedTitle = ref(tabTitles.value[0])

        provide("selectedTitle", selectedTitle);
        return {
            tabTitles,
            selectedTitle
        }
    },
    methods: {
        selectTitle(title) {
            this.selectedTitle = title;
            this.$emit("getResponseTitle", title)
        }
    }
}
</script>

