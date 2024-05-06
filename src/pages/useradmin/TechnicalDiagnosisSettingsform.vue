<template>
    <div class="info_protection">
         <Breadcrumb link="dashboard" text1="Home" text2="Manager"/>
       <TechnicalDiagnosisTemplate />
       
       <div class="managmenttable">
           <div class="setting_wrap">  
                <div class="leftbar">
                  <UserAdminSidebar :itemList="template_added_list"/>
                </div>
                <div class="rightbar">
                    <div class="form_wrap">
                        <div class="wrap">
                            <div class="form">
                                <p>Item code</p>
                                <input type="text" v-model="code" placeholder="UNX-201">
                            </div>
                            <div class="form">
                                <p>Item Name</p>
                                <input type="text" v-model="item" placeholder="Item root home, path directory permissions and path settings">
                            </div>
                        </div>
                        <div class="wrap">
                            <div class="form">
                                <p>importance</p>
                                <input type="text" v-model="grade" placeholder="High">
                            </div>
                        </div>
                        <div class="wrap ">
                            <div class="form select_wrap">
                                <p>Standard</p>
                                <textarea v-model="explain" placeholder="Criteria: Session Timeout “600 seconds (10 minutes)” Good when set to below"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>     
        </div>
        <div class="button_wrap fixed-button-wrap flex justify-between">
            <div class="buttons flex justify-start">
                
                
            </div>
            <div class="buttons flex justify-end">
                
                <button type="button">Save</button>
                
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
  name: 'TechnicalDiagnosisSettingsform',
   components: {
        UserAdminSidebar,
        TechnicalDiagnosisTemplate,
        Breadcrumb
    },
    data() {
      return {
        template_added_list:[],
        code:'',
        explain:'',
        item:'',
        grade:''
      }
    },
    created() {
    this.userAdmin = new userAdmin();
  },
    mounted() {
        this.viewDetails();
    },
    methods : {
        viewDetails() {
             this.userAdmin
        .viewDiagnosisListView(this.$route.params.id)
        .then((res) => {
          if (res.status == 200) {
            console.log(res.data)
            this.code=res.data.code;
            this.explain=res.data.explain;
            this.item=res.data.item;
            this.grade=res.data.grade;
          }
        })
        .catch((err) => {
          return;
        });
        }
    }
    
}
</script>


<style lang="scss">
   
</style>