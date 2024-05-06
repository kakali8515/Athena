<template>
 
  <div class="faq_sidebar_wrapper">
    <ul>
      <li>
        <a href="#" @click="ViewAll()">
          전체보기
          <img src="@/assets/icon/arrow-right.svg">
        </a>
      </li>
      <li v-for="item in tagList" :key="item.index">
        <a href="#" @click="getCategoryId(item.id)">
        {{ item.faq_category_name}}
          <img src="@/assets/icon/arrow-right.svg">
        </a>
      </li>
     
    </ul>
  </div>
</template>

<script>
import CustomerCenterService from "@/services/CustomerCenterService";
export default {
  name: 'FaqSidebar',
  data(){
    return{
      tagList:[]
    }
  },
  created() {
    this.CustomerCenterService = new CustomerCenterService();
  },
  mounted() {
    this.faqTagList();
  },
  methods: {
     faqTagList() {
      this.CustomerCenterService.faqtagList()
        .then((res) => {
          if (res.status == 200) {
            this.tagList = res.data.tags;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getCategoryId(id) {
      this.$emit("tag_id", id);
    },
    ViewAll() {
      this.$emit("tag_id", "");
    }
  }
}
</script>


