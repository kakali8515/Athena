<template>
  <div class="modal-overlap waitingcompanyapproval z-10">
    <div class="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
      <div
        class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
        <div class="modal-header flex flex-shrink-0 items-center justify-between p-4 rounded-t-md">
          <h5 class="text-xl font-medium leading-normal text-gray-800" id="exampleModalScrollableLabel">
            기업 선택
          </h5>
          <button type="button"
            class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
            aria-label="Close" @click="close"></button>
        </div>
        <div class="modal-body relative">
          <div class="choose_company_wrap">
            <p>선택하여 해당 서버에 접속 하실 수 있습니다.</p>
            <div class="company_data">
              <!-- <ul v-for="company in companyLists" :key="company.id" >
                    <li @click="getCompanyId(company.id)"><span></span><span></span></li>
                    </ul> -->
              <div class="overflow-x-auto relative">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead class=" bg-gray-50 text-center">
                    <tr>
                      <th class="py-4 px-6">기업명</th>
                      <th class="py-4 px-6">상태</th>
                      <th class="py-4 px-6">활동</th>
                    </tr>
                  </thead>
                  <tbody>
                    <!-- <tr :disabled="companyChoice !='company_selection_screen_exposure'" class="border-b dark:border-gray-700"
                      v-for="company in companyLists" :key="company.id"
                      :class="company.status == 'active' && companyChoice =='company_selection_screen_exposure' ? 'active-comapy': ''">
                      <td class="py-4 px-6" @click="companyChoice=='company_selection_screen_exposure' ? getCompanyId(company.id) : ''">
                        {{ company.company_name }}
                      </td>
                      <td class="py-4 px-6" @click="companyChoice=='company_selection_screen_exposure' ? getCompanyId(company.id) : ''">
                        {{ company.status }}
                      </td>
                      <td class="py-4 px-6">
                        <div class="data_backup" v-if="company.is_user_admin == 'y'">
                          <button type="button"
                            @click="companyChoice =='company_selection_screen_exposure' ? $emit('dataBackup', company.id) : ''">데이터 백업</button>
                        </div>
                      </td>
                    </tr> -->
                    <tr class="border-b dark:border-gray-700"
                      v-for="company in companyLists" :key="company.id"
                      :class="company.status == 'active' && companyChoice =='company_selection_screen_exposure' ? 'active-comapy': ''">
                      <td class="py-4 px-6" @click="companyChoice=='company_selection_screen_exposure' ? getCompanyId(company.id) : ''" :disabled="companyChoice !='company_selection_screen_exposure'">
                        {{ company.company_name }}
                      </td>
                      <td class="py-4 px-6" @click="companyChoice=='company_selection_screen_exposure' ? getCompanyId(company.id) : ''" :disabled="companyChoice !='company_selection_screen_exposure'">
                        {{ company.status }}
                      </td>
                      <td class="py-4 px-6">
                        <div class="data_backup" v-if="company.is_user_admin == 'y'">
                          <button type="button"
                            @click="$emit('dataBackup', company.id)">데이터 백업</button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <!-- <div class="data_backup">
                  <button type="button">데이터 백업</button>
                </div> -->
              </div>
            </div>
            <!-- <div class="addmore">
                  <button type="button" @click="addList"><img src="@/assets/icon/plus.svg">기업 추가하기</button>
                   </div> -->
            <div class="addmore flex-start ">
              <button class="no-border" type="button" @click="addList"><img src="@/assets/icon/plus.svg">기업
                추가하기</button>
            </div>
          </div>
          <div class="access_company_wrap">
            <p>기업 추가하기</p>
            <div class="company_data">
              <div class="flex justify-start">
                <div>
                  <div class="form-check">
                    <input v-model="companyChoice" value="last_joined_company"
                      class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                      type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                    <label class="form-check-label inline-block text-gray-800" for="flexRadioDefault1">
                      마지막 사용 기업 유지
                    </label>
                  </div>
                  <div class="form-check">
                    <input v-model="companyChoice" value="company_selection_screen_exposure"
                      class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                      type="radio" name="flexRadioDefault" id="flexRadioDefault2">
                    <label class="form-check-label inline-block text-gray-800" for="flexRadioDefault2">
                      기업 선택 화면 노출
                    </label>
                  </div>
                  <div class="form-check">
                    <input v-model="companyChoice" value="our_choice"
                      class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                      type="radio" name="flexRadioDefault" id="flexRadioDefault3">
                    <label class="form-check-label inline-block text-gray-800" for="flexRadioDefault3">
                      선택한 기업 유지
                    </label>
                  </div>
                </div>
              </div>
              <select v-show="showMyCompany" v-model="selectedCompanyID" @change="getSelectedCompanyID">
                <option disabled selected>기업명</option>
                <option v-for="(company, index) in approvedCompanyList" :key="index" :value="company.id">
                  {{ company.company_name }}</option>
              </select>
            </div>
            <h5>기업설정은 내 정보 변경하기에서 변경 하실 수 있습니다.</h5>
          </div>
        </div>
        <div class="modal-footer flex flex-shrink-0 items-center justify-center p-4 rounded-b-md">
          <button type="button" @click="confirm"
            class="full_button px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out">
            확인
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'ChooseCompany',
  props: ["companyLists", "accessCompanyType", "approvedCompanyList"],
  data() {
    return {
      companyChoice: "",
      showMyCompany: false,
      selectedCompanyID: "기업명",

    }
  },

  watch: {
    companyChoice(newVal, oldVal) {
      if (newVal != oldVal) {
        this.choiceOfCompany()
      }

      if (newVal == "our_choice") {
        this.showMyCompany = true;
      } else {
        this.showMyCompany = false;
      }
    },

    accessCompanyType(newVal, oldVal) {
      //alert(newVal)
      if (newVal != oldVal)
        this.getAccessCompanyType()
    }
  },
  methods: {

    close() {
      this.$emit("close")
    },

    confirm() {
      this.$emit("confirm")
    },

    getCompanyId(id) {
      this.$emit("companyID", id)
      this.$emit("confirm")
    },

    choiceOfCompany() {
      this.$emit("companyChoice", this.companyChoice)
    },

    getAccessCompanyType() {
      this.companyChoice = this.accessCompanyType;
    },

    getSelectedCompanyID() {
      // alert(this.selectedCompanyID)
      this.$emit("companyID", this.selectedCompanyID)

    },

    addList() {
      this.$emit("addList")
    }

  }
}
</script>

<style lang="scss">
table {
  tbody {
    tr {
      td {
        text-align: center;
      }
    }
  }
}

.active-comapy {
  cursor: pointer;
}
</style>