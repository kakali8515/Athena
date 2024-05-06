<template>
    <div class="limit_wrap  ml-30">
        <select @change="selectCol($event)">
            <option disabled selected>선택</option>
            <option v-for="(value, name, index) in obj" :key="index" :value="name">
                {{ value }}
            </option>
        </select>
        <select @change="selectOrd($event)">
            <option disabled selected>선택</option>
            <option value="asc"> 오름차순 정렬 </option>
            <option value="desc"> 내림차순 정렬 </option>
        </select>
    </div>
</template>

<script>
export default {
    name: "SortingDropdown",
    props: {
        obj: Array
    },
    data() {
        return {
            selectedCol: '',
            selectedOrd: '',
        }
    },
    methods: {
        selectCol(event) {
            this.$emit('selectedCol', event.target.value);
        },
        selectOrd(event) {
            this.$emit('selectedOrd', event.target.value);
        },
    }
};
</script>

<style lang="scss">

</style>
