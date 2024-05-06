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
          <h5
            class="text-xl font-medium leading-normal text-gray-800"
            id="exampleModalScrollableLabel"
          >
            선택 일괄 변경
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
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="this.$emit('close')"
          ></button>
        </div>
        <div class="modal-body relative">
          <div class="change_wrap">
            <div class="form m-t-0">
              <p>구현비용</p>
              <select v-model="implementation_cost">
                <option value="" selected disabled>선택</option>
                <option 
                  :value="cost.id"
                  v-for="(cost, index) in cost"
                  :key="index"
                >
                  {{ cost.value }}
                </option>
              </select>
              <span class="error-msg">{{ errors.implementation_cost }}</span>
            </div>
            <div class="form">
              <p>구현 난이도</p>
              <select v-model="implementation_difficulty">
                <option value="" selected disabled>선택</option>
                <option
                  :value="difficult.id"
                  v-for="(difficult, index) in difficulty"
                  :key="index"
                >
                  {{ difficult.value }}
                </option>
              </select>
              <span class="error-msg">{{
                errors.implementation_difficulty
              }}</span>
            </div>
            <div class="form">
              <p>조치현황</p>
              <select v-model="risk_progress_result">
                <option value="risk_acceptance">위험수용</option>
                <option value="action_to_be_taken">조치예정</option>
                <option value="completed">조치완료</option>
              </select>
            </div>
            <div class="form">
              <p>담당자 변경</p>
              <VueMultiselect
                v-model="managerData"
                placeholder="입력"
                label="name"
                track-by="id"
                :options="manager"
                :multiple="true"
              ></VueMultiselect>
            </div>
            <div class="form date-input">
              <p class="date-label">일정 변경</p>
              <!-- <input
               onfocus="this.min=new Date().toISOString().split('T')[0]"
                v-model="action_schedule"
                type="date"
                placeholder="DD/MM/YYYY"
                onkeydown="return false"
                lang="ko"
              /> -->
              <Datepicker
                v-model="action_schedule"
                :enableTimePicker="false"
                placeholder="선택"
                format="yyyy-MM-dd"
                type="date"
                :minDate="new Date()"
                locale="ko"
                cancelText="취소"
                selectText="선택"
              />
              <span class="error-msg">{{ errors.action_schedule }}</span>
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
            @click="changeData"
            class="
              blue_bordered
              full_button
              px-6
              py-2.5
              text-white
              font-medium
              text-xs
              leading-tight
              uppercase
              rounded
              focus:outline-none focus:ring-0
              transition
              duration-150
              ease-in-out
            "
          >
            변경하기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import RiskMgmntService from "@/services/RiskMgmntService";
import VueMultiselect from "vue-multiselect";
import validator from "validator";
import { errorMsg } from "@/config/Message";
export default {
  name: "ChangeOnce",
  props: ["cost", "difficulty", "managementId", "manager", "tabType"],
  components: { VueMultiselect },
  data() {
    return {
      costList: [],
      difficultyList: [],
      implementation_cost: "",
      implementation_difficulty: "",
      risk_progress_result: "risk_acceptance",
      action_schedule: "",
      managerData: [],
      errors: {},
    };
  },
  created() {
    this.riskMgmntService = new RiskMgmntService();
  },
  methods: {
    changeData() {
      if (validator.isEmpty(this.implementation_cost.toString())) {
        this.errors.implementation_cost = errorMsg.implementation_cost;
      } else if (validator.isEmpty(this.implementation_difficulty.toString())) {
        this.errors.implementation_difficulty =
          errorMsg.implementation_difficulty;
      }
      else if (validator.isEmpty(this.action_schedule.toString())) {
        this.errors.action_schedule =
          errorMsg.action_schedule;
      }  else {
        const getFormatedDate = (dt) => {
          const date = new Date(dt);
          return (
            date.getFullYear() +
            "-" +
            (date.getMonth() > 8
              ? date.getMonth() + 1
              : "0" + (date.getMonth() + 1)) +
            "-" +
            (date.getDate() > 9 ? date.getDate() : "0" + date.getDate())
          );
        };

        this.$emit("impCost", this.implementation_cost);
        this.$emit("impDifficulty", this.implementation_difficulty);
        this.$emit("riskProgress", this.risk_progress_result);
        this.$emit("schedule", getFormatedDate(this.action_schedule));
        this.$emit("managerData", this.managerData);
        this.$emit("saveData");
        this.$emit("close");
      }
    },
    asyncFind(query) {
      this.options = findService(query);
    },
  },
};
</script>

<style lang="scss">
.form {
  .multiselect__option--highlight {
    background: #3780e6;
    &:after {
      background: #3780e6;
    }
  }
  .multiselect__tag {
    background: #3780e6;
  }
  .multiselect__input {
    border: none !important;
  }
  &.date-input {
    .date-label {
      margin-bottom: 10px;
    }
    input {
      margin-top: 0 !important;
      padding: 0 33px !important;
    }
  }
  .dp__main  {
      width: 100%;
  }
}
</style>