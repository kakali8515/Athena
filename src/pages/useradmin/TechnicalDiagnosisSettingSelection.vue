<template>
    <div class="info_protection">
       <Breadcrumb link="dashboard" text1="Home" text2="관리자"/>
       <TechnicalDiagnosisTemplate />
       
       <div class="managmenttable">
           <div class="setting_wrap">  
                <div class="leftbar">
                  <UserAdminSidebar :itemList="template_added_list" @getItemId="itemID($event)"/>
                </div>
                <div class="rightbar">
                  <div class="head">
                    <h4>설명</h4>
                    </div>
                    <div class="dtls">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sit blandit nulla platea. Vulputate pretium tempus sit lectus non turpis tincidunt elementum. In lacus etiam ullamcorper malesuada aliquet eleifend. Duis nisl ut viverra quis libero consequat eget neque, tristique. Elit eget mi, sollicitudin dignissim scelerisque massa arcu, dictum porta. In tempor ipsum condimentum eu sodales. Tempor posuere magna lobortis morbi pellentesque aliquam morbi lorem leo. Tortor tincidunt porttitor egestas pulvinar egestas. Mattis pellentesque integer ultrices felis donec. In dolor id felis eget nam. Ut cum sed in tortor nisl rutrum mattis. Lobortis cras ipsum in feugiat turpis. Habitasse odio velit vulputate sagittis posuere.</p>

                    <p>Amet proin faucibus aenean risus vestibulum vitae. Volutpat adipiscing turpis ipsum, tempus ut eu. Pharetra auctor rutrum faucibus mattis ultricies pellentesque cras sagittis. Erat lobortis mi egestas cras egestas platea rhoncus tellus integer. Nec ornare quis bibendum ac. Cras facilisi amet eros ultrices. Eu dignissim tellus libero diam sit amet. Urna fames malesuada integer dui, porttitor mi morbi auctor. Mauris, dictumst diam diam nec in posuere commodo. In tristique gravida maecenas nisl.</p>
                  </div>
                </div>
            </div>     
        </div>
        <div class="button_wrap fixed-button-wrap flex justify-between">
            <div class="buttons flex justify-start">
                
                
            </div>
            <div class="buttons flex justify-end">
                <!-- <button type="button" class="gray">Change Standard</button> -->
                <button @click="this.$router.push('/TechnicalDiagnosisEditItemGroup')" type="button">진단보기</button>
                
            </div>
        </div>
    </div>
</template>

<script>
import UserAdminSidebar from '@/components/UserAdminSidebar.vue';
import TechnicalDiagnosisTemplate from '@/components/TechnicalDiagnosisTemplate.vue';
import Breadcrumb from "@/components/Breadcrumb.vue";
import userAdmin from "@/services/userAdmin";
export default {
  name: 'TechnicalDiagnosisSettingSelection',
   components: {
        UserAdminSidebar,
        TechnicalDiagnosisTemplate,
        Breadcrumb
    },
    data() {
      return {
        template_added_list:[],
      }
    },
    created() {
    // this.userAdmin = new userAdmin();
    // this.$store.dispatch("technicalDiagnosis/getAdminsidebarMenuList");
  },
    mounted() {
      localStorage.removeItem("template_name");
      this.$store.state.technicalDiagnosisId='';
    },
    methods: {
      itemID(id) {
      console.log(id)
      this.$store.state.technicalDiagnosisId=id;
      this.$router.push('/TechnicalDiagnosisEditItemGroup')
      // this.$router.push(`/TechnicalDiagnosisEditItemGroup/${id}`)
      // this.id=id;
    },
    }
}
</script>


<style lang="scss">
   
</style>