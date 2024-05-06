<template>
    <div class="AuthorityName-modal">
        <CustomModal v-show="showModal" width="width-md" :showCloseBtn="true" @close="Submit">
            <template #header>
                <h5>권한명 추가</h5>
            </template>
            <template #body>
                <p>제목부터 작성 해주십시오.</p>
            </template>
            <template #footer>
                <button type="button" class="custom primary-btn btn-100 btn-blue-solid" @click="Submit">닫기</button>
            </template>
        </CustomModal>
    </div>
</template>

<script>
import CustomModal from '@/components/CustomModal.vue';
export default {
    components: {
        CustomModal,
    },
    props: {
        showModal: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        Submit() {
            this.$emit('submit',false);
        },
    },
};
</script>
<style lang="scss" scoped>
  .custom{
    font-size:18px;
    line-height:22px;
    font-weight:600;
  }
  </style>