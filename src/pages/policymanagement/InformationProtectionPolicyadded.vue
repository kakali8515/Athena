<template>
  <div class="info_protection">
    <Breadcrumb link="dashboard" text1="Home" text2="정책관리" />
    <div class="heading flex justify-between align-end">
      <h4>정보보호정책</h4>
      <button
        @click="this.$router.push('/InformationProtectionPolicySettingWithContent')"
        type="button"
      >
        정보보호정책 설정
      </button>
    </div>
    <div class="info_main_wrap">
      <div class="add_nopolicy_wrap flex justify-center" v-if="policyList.length==0">
               <p>정책그룹을 추가해주세요.</p>
           </div>
      <div class="add_policy_wrap" v-else>
        <div
          v-for="(policy, index) in policyList"
          :key="index"
          class="policy_group flex justify-start"
        >
          <div class="side_head">
            <p>{{ policy.policy_group_name }}:</p>
          </div>
          <div class="group_list">
            <div
              v-for="(item, index) in policy.policy_list"
              :key="index"
              class="name_wrap"
            >
              <span @click="this.$router.push(`/ViewEvidenceDetails/${item.evidence_id}`)" :class="item.process_cycle_status == 'y' ? 'graywrap' : ''"
                ><img src="@/assets/icon/check_icon_outline.svg" />{{
                  item.evidence
                }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import PolicyManagementService from "@/services/PolicyManagementService";
import Breadcrumb from "@/components/Breadcrumb.vue";
export default {
  name: "InformationProtectionPolicyadded",
  components: {
    Breadcrumb
  },
  data() {
    return {
      certification: this.$store.state.header.certificate,
      policyList: [],
    };
  },
  created() {
    this.PolicyManagementService = new PolicyManagementService();
  },
  watch: {
    '$store.state.header.certificate': function (newVal, oldVal) {
      if (newVal != oldVal && newVal) {
        this.infoPolicyList();
      }
    }
  },
  mounted() {
    this.infoPolicyList();
  },
  methods: {
    infoPolicyList() {
      this.PolicyManagementService.infoProtectionPolicy(this.certification)
        .then((res) => {
          if (res.status == 200) {
            this.policyList = res.data.policy_list;
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