<template>
   <div class="info_protection">
      <Breadcrumb link="dashboard" text1="Home" text2="고객센터" />
      <div class="heading bordered_head flex justify-between item-center">
         <h4>자주묻는 질문</h4>
      </div>
      <div class="faq-wrap">
         <FaqSidebar @tag_id="getTagId($event)" />
         <FaqRightside :tag_id="tag_id" />
      </div>
      <div class="button-wrap fixed-button-wrap faq-button">
         <button @click="this.$router.push(`/NoticeInquiry`)" type="button" class="bordered gray">1:1 문의</button>
      </div>

   </div>
</template>


<script>

import FaqSidebar from '@/components/FaqSidebar.vue'
import FaqRightside from '@/components/FaqRightside.vue'
import Breadcrumb from "@/components/Breadcrumb.vue";
export default {

   name: 'NoticeFaq',
   components: {
      FaqSidebar,
      FaqRightside,
      Breadcrumb
   },
   data() {
      return {
         tag_id: ''
      }
   },
   methods: {
      getTagId(e) {
         this.tag_id = e;
         console.log(this.tag_id)
      }
   }
}
</script>


<style lang="scss">

</style>