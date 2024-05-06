<template>
  <div class="modal-overlap waitingcompanyapproval z-10">
    <div
      class="
        modal-dialog modal-dialog-centered
        relative
        w-auto
        pointer-events-none
      "
    >
      <div
        class="
          modal-content
          border-none
          shadow-lg
          relative
          flex flex-col
          w-full
          pointer-events-auto
          bg-white bg-clip-padding
          rounded-md
          outline-none
          text-current
        "
      >
        <div
          class="
            modal-header
            flex flex-shrink-0
            items-center
            justify-between
            p-4
            rounded-t-md
          "
        >
          <h5 class="text-xl font-medium leading-normal text-gray-800">
            자산 중요도 평가 기준 변경
          </h5>
          <button
            type="button"
            class="
              btn-close
              box-content
              w-4
              h-4
              p-1
              text-black
              border-none
              rounded-none
              opacity-50
              focus:shadow-none focus:outline-none focus:opacity-100
              hover:text-black hover:opacity-75 hover:no-underline
            "
            aria-label="Close"
            @click="close"
          ></button>
        </div>
        <div class="modal-body relative">
          <div class="flex flex-col modaltable">
            <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="py-4 inline-block min-w-full sm:px-6 lg:px-8">
                <div class="overflow-hidden border-table">
                  <table class="min-w-full text-center">
                    <thead class="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          class="
                            justify-center
                            text-sm
                            font-medium
                            text-gray-900
                            px-6
                            py-4
                          "
                        >
                        구분
                        </th>
                        <th
                          scope="col"
                          class="
                            justify-center
                            text-sm
                            font-medium
                            text-gray-900
                            px-6
                            py-4
                          "
                        >
                        등급
                        </th>
                        <th
                          scope="col"
                          class="
                            justify-center
                            text-sm
                            font-medium
                            text-gray-900
                            px-6
                            py-4
                          "
                        >
                        평가범위
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(item, index) in details"
                        :key="index"
                        class="bg-white border-b"
                      >
                        <td
                          v-if="index == 0"
                          :rowspan="details.length"
                          class="
                            text-sm text-gray-900
                            font-light
                            px-6
                            py-4
                            rowspan-border
                          "
                        >
                          {{ criteria }}
                        </td>
                        <td
                          v-if="item.threat_rating_range || item.value_rank==null"
                          class="text-sm text-gray-900 font-light px-6 py-4"
                        >
                          {{ item.value }}
                        </td>
                        <td
                          v-else
                          class="text-sm text-gray-900 font-light px-6 py-4"
                        >
                          {{ item.value + "[" + item.value_rank + "]" }}
                        </td>
                        <td
                          v-if="
                            item.grade_range || item.grade_range==0 ||
                            item.implementation_cost_range || item.implementation_cost_range==0 ||
                            item.implementation_difficulty_range || item.implementation_difficulty_range==0 ||
                            item.threat_rating_range || item.threat_rating_range==0
                          "
                          class="text-sm text-gray-900 font-light px-6 py-4"
                        >
                          <div class="number_wrap">
                            <input
                              type="number"
                              :id="item.id"
                              @change="getModifiedData"
                              :value="
                                item.grade_range ||
                                item.implementation_cost_range ||
                                item.implementation_difficulty_range ||
                                item.threat_rating_range
                              "
                            />
                          </div>
                        </td>
                        <td
                          v-else
                          class="text-sm text-gray-900 font-light px-6 py-4"
                        >
                          <div class="number_wrap">
                            <input :id="item.id" @change="getRangeFromModifiedData" type="number" :value="item.range_from" />
                            <span><img src="@/assets/icon/icon.svg" /></span>
                            <input :id="item.id" @change="getRangeToModifiedData" type="number" :value="item.range_to" />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="
            modal-footer
            flex flex-shrink-0
            items-center
            justify-center
            p-4
            rounded-b-md
          "
        >
          <button
            type="button"
            @click="correctionCriteriaData"
            class="
              blue_bordered
              full-button
              px-6
              py-2.5
              text-white
              font-medium
              text-xs
              leading-tight
              uppercase
              rounded
              shadow-md
               hover:shadow-lg
             focus:shadow-lg focus:outline-none focus:ring-0
              active:shadow-lg
              transition
              duration-150
              ease-in-out
            "
          >
          저장
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import userAdmin from "@/services/userAdmin";
export default {
  name: "ManagementDiagnosisSettingsModal",
  data() {
    return {
      data: [],
      login_comoany_id: localStorage.getItem("compid"),
    };
  },
  props: ["criteria", "details", 'selectedCriteriaValue'],
  created() {
    this.userAdmin = new userAdmin();
  },
  methods: {
    close() {
      this.$emit("close");
    },
    getRangeFromModifiedData(event) {
        let id = event.target.id;
      let range = event.target.value;
       this.details.forEach((item) => {
          if (item.id == id) {
            item.range_from = range;
          }
        });
    },
    getRangeToModifiedData(event) {
        let id = event.target.id;
      let range = event.target.value;
       this.details.forEach((item) => {
          if (item.id == id) {
            item.range_to = range;
          }
        });
    },
    getModifiedData(event) {
      let id = event.target.id;
      let range = event.target.value;
      if (this.selectedCriteriaValue == "grade") {
        this.details.forEach((item) => {
          if (item.id == id) {
            item.grade_range = range;
          }
        });
      }
      if (this.selectedCriteriaValue == "implementation_cost") {
        this.details.forEach((item) => {
          if (item.id == id) {
            item.implementation_cost_range = range;
          }
        });
      }
      if (this.selectedCriteriaValue == "threat_rating") {
        this.details.forEach((item) => {
          if (item.id == id) {
            item.threat_rating_range = range;
          }
        });
      }
      if (this.selectedCriteriaValue == "implementation_difficulty") {
        this.details.forEach((item) => {
          if (item.id == id) {
            item.implementation_difficulty_range = range;
          }
        });
      }
    },
    correctionCriteriaData() {
      for (let i = 0; i < this.details.length; i++) {
        if (this.details[0].company_id == this.login_comoany_id) {
          if (this.selectedCriteriaValue == "grade") {
            this.data.push({
              id: this.details[i].id,
              grade_range: this.details[i].grade_range,
            });
          }

          if (this.selectedCriteriaValue == "implementation_cost") {
            this.data.push({
              id: this.details[i].id,
              range: this.details[i].implementation_cost_range,
            });
          }

          if (this.selectedCriteriaValue == "threat_rating") {
            this.data.push({
              id: this.details[i].id,
              range: this.details[i].threat_rating_range,
            });
          }

          if (this.selectedCriteriaValue == "implementation_difficulty") {
            this.data.push({
              id: this.details[i].id,
              range: this.details[i].implementation_difficulty_range,
            });
          }

          if (this.selectedCriteriaValue == "priority" || this.selectedCriteriaValue == "urgency" || this.selectedCriteriaValue == "vulnerability" || this.selectedCriteriaValue == "security_rating") {
            this.data.push({
              id: this.details[i].id,
              range_from: parseInt(this.details[i].range_from),
              range_to: this.details[i].range_to,
            });
          }

        } else {
          if (this.selectedCriteriaValue == "grade") {
            this.data.push({
              id: "",
              value: this.details[i].value,
              value_rank: this.details[i].value_rank,
              grade_range: this.details[i].grade_range,
            });
          }

          if (this.selectedCriteriaValue == "implementation_cost") {
            this.data.push({
              id: "",
              value: this.details[i].value,
              value_rank: this.details[i].value_rank,
              range: this.details[i].implementation_cost_range,
            });
          }

          if (this.selectedCriteriaValue == "threat_rating") {
            this.data.push({
              id: "",
              value: this.details[i].value,
              range: this.details[i].threat_rating_range,
            });
          }

          if (this.selectedCriteriaValue == "implementation_difficulty") {
            this.data.push({
              id: "",
              value: this.details[i].value,
              value_rank: this.details[i].value_rank,
              range: this.details[i].implementation_difficulty_range,
            });
          }
          if (this.selectedCriteriaValue == "priority") {
            this.data.push({
              id: "",
              value: this.details[i].value,
              range_from: this.details[i].range_from,
              range_to: this.details[i].range_to,
            });
          }
          if (this.selectedCriteriaValue == "urgency" || this.selectedCriteriaValue == "vulnerability" || this.selectedCriteriaValue == "security_rating") {
            this.data.push({
              id: "",
              value: this.details[i].value,
              value_rank: this.details[i].value_rank,
              range_from: parseInt(this.details[i].range_from),
              range_to: this.details[i].range_to,
            });
          }

        }
      }

      if (this.selectedCriteriaValue == "grade") {
        this.saveGrade();
      }
      if (this.selectedCriteriaValue == "implementation_cost") {
        this.saveImplementationCost();
      }
      if (this.selectedCriteriaValue == "threat_rating") {
        this.saveThreatRating();
      }
      if (this.selectedCriteriaValue == "implementation_difficulty") {
        this.saveImplementationDifficulty();
      }
      if (this.selectedCriteriaValue == "urgency") {
        this.saveUrgency();
      }
      if (this.selectedCriteriaValue == "priority") {
        this.savePriority();
      }
      if (this.selectedCriteriaValue == "vulnerability") {
        this.saveVulnerabilty();
      }
      if (this.selectedCriteriaValue == "security_rating") {
        this.saveSecurityLevel();
      }
    },

    // save grade
    saveGrade() {
      this.userAdmin
        .saveGrade(this.data)
        .then((res) => {
          if (res.status == 200) {
            this.data = [];
            this.$emit("correction");
            this.$emit("close");
          }
        })
        .catch((err) => {
          return false;
        });
    },
    // save implementation cost
    saveImplementationCost() {
      this.userAdmin
        .saveImplementationCost(this.data)
        .then((res) => {
          if (res.status == 200) {
            this.data = [];
            this.$emit("correction");
            this.$emit("close");
          }
        })
        .catch((err) => {
          return false;
        });
    },
    // save threat rating
    saveThreatRating() {
      this.userAdmin
        .saveThreatRating(this.data)
        .then((res) => {
          if (res.status == 200) {
            this.data = [];
            this.$emit("correction");
            this.$emit("close");
          }
        })
        .catch((err) => {
          return false;
        });
    },
    // save implementation difficulty
    saveImplementationDifficulty() {
      this.userAdmin
        .saveImplementationDifficulty(this.data)
        .then((res) => {
          if (res.status == 200) {
            this.data = [];
            this.$emit("correction");
            this.$emit("close");
          }
        })
        .catch((err) => {
          return false;
        });
    },
    // save urgency
    saveUrgency() {
      this.userAdmin
        .saveUrgency(this.data)
        .then((res) => {
          if (res.status == 200) {
            this.data = [];
            this.$emit("correction");
            this.$emit("close");
          }
        })
        .catch((err) => {
          return false;
        });
    },
    // save priority
    savePriority() {
      this.userAdmin
        .savePriority(this.data)
        .then((res) => {
          if (res.status == 200) {
            this.data = [];
            this.$emit("correction");
            this.$emit("close");
          }
        })
        .catch((err) => {
          return false;
        });
    },
    // save priority
    saveVulnerabilty() {
      this.userAdmin
        .saveVulnerabilty(this.data)
        .then((res) => {
          if (res.status == 200) {
            this.data = [];
            this.$emit("correction");
            this.$emit("close");
          }
        })
        .catch((err) => {
          return false;
        });
    },

     // save security
     saveSecurityLevel() {
      this.userAdmin
        .saveSecurityLevel(this.data)
        .then((res) => {
          if (res.status == 200) {
            this.data = [];
            this.$emit("correction");
            this.$emit("close");
          }
        })
        .catch((err) => {
          return false;
        });
    },

  },
};
</script>

<style lang="scss">
</style>