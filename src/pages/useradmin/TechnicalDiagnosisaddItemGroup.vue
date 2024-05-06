<template>
  <div class="info_protection">
    <div class="breadcrumb">
      <p><a href="#">Home </a><span>></span> Manager</p>
    </div>
    <div class="heading flex justify-between align-end">
      <h4>technical diagnosis add</h4>
    </div>

    <div class="managmenttable">
      <div class="setting_wrap">
        <div class="rightbar full-width">
          <div class="form_wrap">
            <div class="wrap">
              <div class="form">
                <p>Category</p>
                <select @change="getRiskList" v-model="category">
                  <option value="">Select</option>
                  <option
                    :value="category.category_key"
                    v-for="(category, index) in assestCategoryList"
                    :key="index"
                  >
                    {{ category.category_key }}
                  </option>
                </select>
              </div>
              <div class="form">
                <p>Technical risk</p>
                <select>
                  <!-- <option>Select</option> -->
                  <option v-for="(risk,index) in riskList" :key="index">{{risk.technical_risk}}</option>
                </select>
              </div>
            </div>
            <div class="wrap">
              <div class="form">
                <p>Class</p>
                <input v-model="Addclass" type="text" placeholder="Class" />
              </div>
              <div class="form">
                <p>Code</p>
                <input v-model="code" type="text" placeholder="#" />
              </div>
              <div class="form">
                <p>Item</p>
                <input v-model="item" type="text" placeholder="Item" />
              </div>
            </div>
            <div class="wrap">
              <div class="form">
                <p>Garde</p>
                <input v-model="grade" type="text" placeholder="Grade" />
              </div>
              <div class="form">
                <p>Explan</p>
                <input v-model="explain" type="text" placeholder="Explan" />
              </div>
              <div class="form">
                <p>Risk</p>
                <input v-model="risk" type="text" placeholder="Risk" />
              </div>
            </div>
            <div class="wrap">
              <div class="form">
                <p>Protection</p>
                <input
                  v-model="protection"
                  type="text"
                  placeholder="Protection"
                />
              </div>
              <div class="form">
                <p>Threat Code</p>
                <input v-model="threat" type="text" placeholder="Threat Code" />
              </div>
              <div class="form"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="button_wrap fixed-button-wrap flex justify-between">
      <div class="buttons flex justify-start"></div>
      <div class="buttons flex justify-end">
        <button @click="addDiagnosis" type="button">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
import UserAdminSidebar from "@/components/UserAdminSidebar.vue";
import userAdmin from "@/services/userAdmin";
export default {
  name: "TechnicalDiagnosisaddItemGroup",
  components: {
    UserAdminSidebar,
  },
  data() {
    return {
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
      id: "",
      riskList:""
    };
  },
  created() {
    this.userAdmin = new userAdmin();
  },
  mounted() {
    this.categoryList();
  },
  methods: {
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
    getRiskList() {
        this.TechnicalRisk();
    },
    TechnicalRisk() {
      this.userAdmin
        .technicalRiskList(this.category)
        .then((res) => {
          if (res.status == 200) {
            // console.log(res.data.asset_category_list);
            this.riskList = res.data.technical_risk;
          }
        })
        .catch((err) => {
          return;
        });
    },
    addDiagnosis() {
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
            console.log(res);
            this.$router.push(`/TechnicalDiagnosisEditItemGroup/${res.data.id}`)
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