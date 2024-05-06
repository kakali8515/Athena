<template>
  <div class="info_protection">
    <div class="breadcrumb">
    <Breadcrumb link="../dashboard" text1="Home" text2="Manager" />
    </div>
    <TechnicalDiagnosisTemplate />

    <div class="managmenttable">
      <div class="setting_wrap">
        <div class="leftbar">
          <UserAdminSidebar
            @getItem="updateItem"
            @popItem="popUpdatedItem"
            :itemList="template_added_list"
          />
        </div>
        <div class="rightbar">
          <div class="form_wrap">
            <div class="wrap">
              <div class="form">
                <p>Template name</p>
                <input
                  type="text"
                  placeholder="Template 01"
                  v-model="template_name"
                  readonly
                />
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
    
  <div class="button_wrap fixed-button-wrap flex justify-between">
            <div class="buttons flex justify-start"></div>
            <div class="buttons flex justify-end">
              <button type="button" class="gray" @click="$router.push('/TechnicalDiagnosisSettingSelection')">뒤로가기</button>
              <button @click="AddItemToGroup" type="button" v-if="permission=='edit' || this.$store.state.signin.is_user_admin == 'y'">저장</button>
            </div>
          </div>
  </div>
  <Loading
    :active="isLoading"
    :can-cancel="true"
    :on-cancel="onCancel"
    :is-full-page="fullPage"
  ></Loading>
</template>

<script>
import UserAdminSidebar from "@/components/UserAdminSidebar.vue";
import TechnicalDiagnosisTemplate from "@/components/TechnicalDiagnosisTemplate.vue";
import Breadcrumb from "@/components/Breadcrumb.vue";
import userAdmin from "@/services/userAdmin";
import Toast from "@/alert/alert.js";
export default {
  name: "TechnicalDiagnosisTemplateAdd",
  components: {
    UserAdminSidebar,
    TechnicalDiagnosisTemplate,
    Breadcrumb,
  },
  data() {
    return {
      template_name: localStorage.getItem("template_name"),
      risk_profile_tech_id: [],
      template_id:this.$route.params.id,
      template_added_list:[],
      isLoading:false,
    };
  },
  created() {
    this.userAdmin = new userAdmin();
  },
  mounted() {
    this.viewItem();
  },
  computed:{
    permission(){
      return this.$store.state.sideBar.permission.technical_diagnosis_setting;
    }
  },
  methods: {
    updateItem(e) {
      this.risk_profile_tech_id.push(Number(e));
      // console.log(this.risk_profile_tech_id)
    },
    popUpdatedItem(e) {
      // console.log(e)
      // console.log(this.risk_profile_tech_id)
      // this.risk_profile_tech_id.pop(e);
      if(this.risk_profile_tech_id.indexOf(Number(e)) > -1) {
        // console.log(this.risk_profile_tech_id.indexOf(Number(e)))
      }
      this.risk_profile_tech_id.splice(this.risk_profile_tech_id.indexOf(Number(e)), 1);
      // console.log(this.risk_profile_tech_id)
    },
    AddItemToGroup() {
      this.isLoading = true;
      this.userAdmin
        .addItem(this.template_id,this.risk_profile_tech_id)
        .then((res) => {
          if (res.status == 200) {
            // console.log(res)
            Toast.fire({ title: "수정이 완료되었습니다." });
            this.isLoading = false;
          }
          else {
            this.isLoading = false;
              Toast.fire({ title: res.response.data.error });
            }
        })
        .catch((err) => {
          this.isLoading = false;
          return;
        });
    },
    viewItem() {

        this.userAdmin
        .viewItem(this.template_id)
        .then((res) => {
          if (res.status == 200) {
            for(let i=0; i<res.data.template_added_list.length;i++) {
                this.template_added_list.push(res.data.template_added_list[i].default_id);
                this.risk_profile_tech_id.push(res.data.template_added_list[i].default_id);
            }
            // console.log(this.template_added_list)
          }
        })
        .catch((err) => {
          return;
        });
    }
  },
};
</script>


<style lang="scss">
</style>