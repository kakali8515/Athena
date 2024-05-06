<template>
    <div class="limit_wrap">
        <select @change="changeLimit($event)">
            <option>25</option>
            <option>50</option>
        </select>
        <button @click="getlimit()">Apply</button>
    </div>
</template>

<script>
export default {
    name: "TableLimit",
    data() {
        return {
            limit: ''
        }
    },
    methods: {
        changeLimit(event) {
            this.limit = event.target.value;
        },
        getlimit() {
            this.$emit('newLimit', this.limit);
        }
    }
};
</script>

<style lang="scss">

.limit_wrap {
    margin-bottom: 0px;
    display: flex;
    justify-content: flex-end;

    select {
        width: 220px;
        margin-right: 30px;
        padding: 0 15px;
        background: url(@/assets/icon/dropdown.svg) no-repeat center right 15px;
        font-size: 14px;
        line-height: 16px;
        font-weight: 500;
        border: 1px solid #cfcfcf;
        height: 36px;
    }

    button {
        padding: 7px 20px;
        border: 1px solid #5798e6;
        border-radius: 5px;
        height: 36px;
        color: #5798e6;
    }
}
</style>
