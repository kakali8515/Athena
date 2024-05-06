<template>
  <div class="modal-overlap waitingcompanyapproval">
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
           대시보드 설정
          </h5>
          <button
            type="button"
            @click="close"
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
          ></button>
        </div>
        <div class="modal-body relative">
          <div class="dashboard_wrap">
            <div class="data_wrap">
              <p>자산관리</p>
              <label
                for="default-toggle-asset"
                class="inline-flex relative items-center cursor-pointer"
              >
                <input
                  type="checkbox"
                  v-model="asset"
                  value=""
                  id="default-toggle-asset"
                  class="sr-only peer"
                  ref="asset"
                />
                <div
                  class="
                    back
                    w-11
                    h-6
                    bg-gray-200
                    peer-focus:outline-none
                    rounded-full
                    peer
                    dark:bg-gray-700
                    peer-checked:after:translate-x-full
                    peer-checked:after:border-white
                    after:content-['']
                    after:absolute
                    after:top-[2px]
                    after:left-[2px]
                    after:bg-white
                    after:border-gray-300
                    after:border
                    after:rounded-full
                    after:h-5
                    after:w-5
                    after:transition-all
                    dark:border-gray-600
                    peer-checked:bg-blue-600
                  "
                ></div>
              </label>
            </div>
            <div class="data_wrap">
              <p>증적관리</p>
              <label
                for="default-toggle-evidence"
                class="inline-flex relative items-center cursor-pointer"
              >
                <input
                  type="checkbox"
                  v-model="evidence"
                  value=""
                  id="default-toggle-evidence"
                  class="sr-only peer"
                  ref="evidence"
                />
                <div
                  class="
                  back
                    w-11
                    h-6
                    bg-gray-200
                    peer-focus:outline-none
                    
                    rounded-full
                    peer
                    dark:bg-gray-700
                    peer-checked:after:translate-x-full
                    peer-checked:after:border-white
                    after:content-['']
                    after:absolute
                    after:top-[2px]
                    after:left-[2px]
                    after:bg-white
                    after:border-gray-300
                    after:border
                    after:rounded-full
                    after:h-5
                    after:w-5
                    after:transition-all
                    dark:border-gray-600
                    peer-checked:bg-blue-600
                  "
                ></div>
              </label>
            </div>
            <div class="data_wrap">
              <p>진단관리</p>
              <label
                for="default-toggle-diagnos"
                class="inline-flex relative items-center cursor-pointer"
              >
                <input
                  type="checkbox"
                  v-model="diagnos"
                  value=""
                  id="default-toggle-diagnos"
                  class="sr-only peer"
                  ref="diagnos"
                />
                <div
                  class="
                  back
                    w-11
                    h-6
                    bg-gray-200
                    peer-focus:outline-none
                    
                    rounded-full
                    peer
                    dark:bg-gray-700
                    peer-checked:after:translate-x-full
                    peer-checked:after:border-white
                    after:content-['']
                    after:absolute
                    after:top-[2px]
                    after:left-[2px]
                    after:bg-white
                    after:border-gray-300
                    after:border
                    after:rounded-full
                    after:h-5
                    after:w-5
                    after:transition-all
                    dark:border-gray-600
                    peer-checked:bg-blue-600
                  "
                ></div>
              </label>
            </div>
            <div class="data_wrap">
              <p>위험관리</p>
              <label
                for="default-toggle-risk"
                class="inline-flex relative items-center cursor-pointer"
              >
                <input
                  type="checkbox"
                  v-model="risk"
                  value=""
                  id="default-toggle-risk"
                  class="sr-only peer"
                  ref="risk"
                />
                <div
                  class="
                  back
                    w-11
                    h-6
                    bg-gray-200
                    peer-focus:outline-none
                    
                    rounded-full
                    peer
                    dark:bg-gray-700
                    peer-checked:after:translate-x-full
                    peer-checked:after:border-white
                    after:content-['']
                    after:absolute
                    after:top-[2px]
                    after:left-[2px]
                    after:bg-white
                    after:border-gray-300
                    after:border
                    after:rounded-full
                    after:h-5
                    after:w-5
                    after:transition-all
                    dark:border-gray-600
                    peer-checked:bg-blue-600
                  "
                ></div>
              </label>
            </div>
            <div class="data_wrap">
              <p>일정관리</p>
              <label
                for="default-toggle-schedule"
                class="inline-flex relative items-center cursor-pointer"
              >
                <input
                  type="checkbox"
                  v-model="schedule"
                  value=""
                  id="default-toggle-schedule"
                  class="sr-only peer"
                  ref="schedule"
                />
                <div
                  class="
                  back
                    w-11
                    h-6
                    bg-gray-200
                    peer-focus:outline-none
                    
                    rounded-full
                    peer
                    dark:bg-gray-700
                    peer-checked:after:translate-x-full
                    peer-checked:after:border-white
                    after:content-['']
                    after:absolute
                    after:top-[2px]
                    after:left-[2px]
                    after:bg-white
                    after:border-gray-300
                    after:border
                    after:rounded-full
                    after:h-5
                    after:w-5
                    after:transition-all
                    dark:border-gray-600
                    peer-checked:bg-blue-600
                  "
                ></div>
              </label>
            </div>
            <div class="data_wrap">
              <p>공지사항</p>
              <label
                for="default-toggle-notice"
                class="inline-flex relative items-center cursor-pointer"
              >
                <input
                  type="checkbox"
                  v-model="notice"
                  value=""
                  id="default-toggle-notice"
                  class="sr-only peer"
                  ref="notice"
                />
                <div
                  class="
                  back
                    w-11
                    h-6
                    bg-gray-200
                    peer-focus:outline-none
                    
                    rounded-full
                    peer
                    dark:bg-gray-700
                    peer-checked:after:translate-x-full
                    peer-checked:after:border-white
                    after:content-['']
                    after:absolute
                    after:top-[2px]
                    after:left-[2px]
                    after:bg-white
                    after:border-gray-300
                    after:border
                    after:rounded-full
                    after:h-5
                    after:w-5
                    after:transition-all
                    dark:border-gray-600
                    peer-checked:bg-blue-600
                  "
                ></div>
              </label>
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
          @click="saveSetup"
            type="button"
            class="
              solid
              full-button
              px-6
              py-2.5
              bg-blue-600
              text-white
              font-medium
              text-xs
              leading-tight
              
              rounded
              
              
              transition
              duration-150
              ease-in-out
            "
          >
            설정하기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "DashboardSetUp",
  props: {
    setupVal: Object,
  },
  data() {
    return {
      asset: this.setupVal.asset,
      risk: this.setupVal.risk,
      notice: this.setupVal.notice,
      schedule: this.setupVal.schedule,
      diagnos: this.setupVal.diagnos,
      evidence: this.setupVal.evidence,
    };
  },
  methods: {
    showOptions() {
      if (this.setupVal.asset == "y") {
        this.$refs.asset.checked = true;
      } else {
        this.$refs.asset.checked = false;
      }

      if (this.setupVal.risk == "y") {
        this.$refs.risk.checked = true;
      } else {
        this.$refs.risk.checked = false;
      }

      if (this.setupVal.risk == "y") {
        this.$refs.risk.checked = true;
      } else {
        this.$refs.risk.checked = false;
      }
    },

    saveSetup() {
      let data = {
        asset: this.$refs.asset.checked,
        risk: this.$refs.risk.checked,
        notice: this.$refs.notice.checked,
        schedule: this.$refs.schedule.checked,
        diagnos: this.$refs.diagnos.checked,
        evidence: this.$refs.evidence.checked,
      };

     this.$emit("setupData", data)
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss">
.back{
  background-color: #C3CBCD;
}
.mb-0{
  margin-bottom:0 !important;
}
</style>