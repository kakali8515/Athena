<template>
  <div class="info_protection">
    <Breadcrumb link="dashboard" text1="Home" text2="관리자" />
    <div class="heading flex justify-between align-end">
      <h4>기술진단 추가하기</h4>
      <div class="history_wrap">
        <!-- <button
          @click="this.$router.push('/TechnicalDiagnosisaddItemGroup')"
          type="button"
        >
          Add
        </button> -->
      </div>
    </div>

    <div class="managmenttable">
      <div class="setting_wrap">
        <div class="leftbar">
          <UserAdminSidebar :itemList="template_added_list" @getItemId="itemID($event)" />
        </div>
        <div class="rightbar">
          <div class="form_wrap">
            <div class="wrap">
              <div class="form">
                <p>카테고리</p>
                <!-- <select v-model="category">
                  <option value="">Select</option>
                  <option
                    :value="category.category_key"
                    v-for="(category, index) in assestCategoryList"
                    :key="index"
                  >
                    {{ category.category_key }}
                  </option>
                </select> -->
                <input v-model="category" type="text" placeholder="카테고리" readonly />
              </div>
              <div class="form">
                <p>위험도</p>
                <!-- <select>
                  <option v-for="(risk,index) in riskList" :key="index">{{risk.technical_risk}}</option>
                </select> -->
                <input v-model="technical_risk" type="text" placeholder="위험도" readonly />
              </div>
            </div>
            <div class="wrap">
              <div class="form">
                <p>분야</p>
                <input :readonly="!id" v-model="Addclass" type="text" placeholder="분야" />
              </div>
              <div class="form">
                <p>항목코드</p>
                <input v-model="code" type="text" placeholder="#" readonly />
              </div>
              <div class="form">
                <p>항목명</p>
                <input :readonly="!id" v-model="item" type="text" placeholder="항목명" />
              </div>
            </div>
            <div class="wrap">
              <div class="form">
                <p>등급</p>
                <select v-model="grade">
                <option :disabled="!id" value="1">1</option>
                <option :disabled="!id" value="2">2</option>
                <option :disabled="!id" value="3">3</option>
                </select>
                <!-- <input v-model="grade" type="text" placeholder="Grade" /> -->
              </div>
              <div class="form">
                <p>설명</p>
                <input :readonly="!id" v-model="explain" type="text" placeholder="설명" />
              </div>
              <div class="form">
                <p>위험</p>
                <input :readonly="!id" v-model="risk" type="text" placeholder="위험" />
              </div>
            </div>
            <div class="wrap">
              <div class="form">
                <p>보호</p>
                <input :readonly="!id"
                  v-model="protection"
                  type="text"
                  placeholder="보호"
                />
              </div>
              <div class="form">
                <p>위협코드</p>
                <!-- <input v-model="threat" type="text" placeholder="Threat Code" /> -->
                <select v-model="threat">
                <option :disabled="!id" v-for="(threat,index) in tCodeLIst" :key="index" :value="threat.threat_code">{{threat.threat_code}}</option>
                </select>
              </div>
              <div class="form"></div>
            </div>
          </div>
          <div class="button_wrap fixed-button-wrap flex justify-between">
      <div class="buttons flex justify-start"></div>
      <div class="buttons flex justify-end">
        <button type="button" class="gray" @click="$router.push('/TechnicalDiagnosisSettingSelection')">뒤로가기</button>
        <button @click="editDiagnosis" type="button" v-if="permission=='edit' || this.$store.state.signin.is_user_admin == 'y'">저장</button>
      </div>
    </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import UserAdminSidebar from "@/components/UserAdminSidebar.vue";
import TechnicalDiagnosisTemplate from "@/components/TechnicalDiagnosisTemplate.vue";
import Breadcrumb from "@/components/Breadcrumb.vue";
import userAdmin from "@/services/userAdmin";
import Toast from "@/alert/alert.js";
export default {
  name: "TechnicalDiagnosisEditItemGroup",
  components: {
    UserAdminSidebar,
    TechnicalDiagnosisTemplate,
    Breadcrumb,
  },
  data() {
    return {
      template_added_list: [],
      assestCategoryList: "",
      category: "",
      code: "",
      Addclass: "",
      item: "",
      grade: "",
      explain: "",
      risk: "",
      protection: "",
      threat: "",
      id: this.$store.state.technicalDiagnosisId,
      riskList:'',
      tCodeLIst:[],
      technical_risk:''
    };
  },
  created() {
    this.userAdmin = new userAdmin();
  },
  computed:{
    permission(){
      return this.$store.state.sideBar.permission.technical_diagnosis_setting;
    }
  },
  mounted() {
    this.categoryList();
    this.threatCodeList();
    if(this.$store.state.technicalDiagnosisId) {
      this. viewDetails();
    }
  },
  methods: {
    viewDetails() {
      this.userAdmin
        .viewDiagnosisListView(this.id)
        .then((res) => {
          if (res.status == 200) {
            // console.log(res.data);
            this.code = res.data.code;
            this.explain = res.data.explain;
            this.item = res.data.item;
            this.grade = res.data.grade;
            this.Addclass = res.data.class;
            this.risk = res.data.risk;
            this.protection = res.data.protection;
            this.threat = res.data.threat;
            this.category=res.data.category;
            this.technical_risk=res.data.technical_risk;
            this.TechnicalRisk();
          }
        })
        .catch((err) => {
          return;
        });
    },
    itemID(id) {
      console.log(id)
      this.id=id;
      this.viewDetails();
      this.$store.state.technicalDiagnosisId='';
    },
    categoryList() {
      this.userAdmin
        .assetCategoryList()
        .then((res) => {
          if (res.status == 200) {
            // console.log(res.data.asset_category_list);
            this.assestCategoryList = res.data.asset_category_list;
          }
        })
        .catch((err) => {
          return;
        });
    },
    TechnicalRisk() {
      this.userAdmin
        .technicalRiskList(this.category)
        .then((res) => {
          if (res.status == 200) {
            this.riskList = res.data.technical_risk;
          }
        })
        .catch((err) => {
          return;
        });
    },
    threatCodeList() {
      this.userAdmin
        .threatCodeList()
        .then((res) => {
          if (res.status == 200) {
            this.tCodeLIst = res.data.data;
          }
        })
        .catch((err) => {
          return;
        });
    },
    editDiagnosis() {
      this.userAdmin
        .addTechnicalDiagnosis(
          this.category,
          this.code,
          this.Addclass,
          this.item,
          this.grade,
          this.explain,
          this.risk,
          this.protection,
          this.threat,
          this.id
        )
        .then((res) => {
          if (res.status == 200) {
            Toast.fire({ title: "수정이 완료되었습니다." });
            this.viewDetails();
          }
        })
        .catch((err) => {
          return;
        });
    },
  },
};
</script>


<style lang="scss">

</style>