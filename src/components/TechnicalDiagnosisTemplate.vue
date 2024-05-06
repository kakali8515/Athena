<template>
  <div class="heading flex justify-between align-end">
    <h4>기술진단 설정</h4>
    <div class="history_wrap">
      <select v-model="templateId"  @change="AddTemplate">
        <option value="" disabled>기본 템플릿</option>
        <option v-for="(item, index) in TemplateList" :key="index" :name="item.template_name" :value="item.id" :selected="item.id==this.$route.params.id">
          {{ item.template_name }}
        </option>
        <option value="+" v-if="permission=='edit' || this.$store.state.signin.is_user_admin == 'y'">
          [+] 기술진단 템플릿 추가하기
        </option>
      </select>
      <button @click="this.$router.push('/ChangeCriteria')" v-if="this.$route.path=='/TechnicalDiagnosisSettingSelection'" type="button">기준 변경하기</button>
    </div>
  </div>
    <TechnicalDiagnosisTemplateAdd
      v-if="isAddTemplateModal"
     @close="closeModal"
    />
</template>
<script>
import userAdmin from "@/services/userAdmin";
import TechnicalDiagnosisTemplateAdd from "@/components/modals/TechnicalDiagnosisTemplateAdd.vue";
export default {
  name: "TechnicalDiagnosisTemplate",
  components: {
    TechnicalDiagnosisTemplateAdd
  },
  data() {
    return {
      TemplateList: "",
      isAddTemplateModal:false,
      templateId:'',
      isCriteriaButton:false
    };
  },
  created() {
    this.userAdmin = new userAdmin();
  },
  mounted() {
    this.templateList();
  },
  computed:{
    permission(){
      return this.$store.state.sideBar.permission.technical_diagnosis_setting;
    }
  },
  methods: {
    closeModal() {
      this.isAddTemplateModal = false;
      this.templateId = "";
       this.templateList();
    },
    AddTemplate(event) {
        var options = event.target.options
      if (options.selectedIndex > -1) {
        var name = options[options.selectedIndex].getAttribute('name');
      }
        if(event.target.value=='+') {
            this.isAddTemplateModal = true;
        }
        else if(event.target.value=='') {
        }
        else {
            localStorage.setItem("template_name", name);
            this.$router.push(`/TechnicalDiagnosisTemplateAdd/${event.target.value}`);
        }
       
    },
    templateList() {
      this.userAdmin
        .templateList()
        .then((res) => {
          if (res.status == 200) {
            this.TemplateList = res.data.template_list;
          }
        })
        .catch((err) => {
          return;
        });
    },
  },
};
</script>