<template>
  <div class="modal-overlap waitingcompanyapproval bigmodal">
    <div
      class="modal-dialog modal-dialog-centered relative w-auto pointer-events-none"
    >
      <div
        class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current"
      >
        <div class="modal-header p-4 rounded-t-md">
          <div class="flex flex-shrink-0 items-center justify-between">
            <h5 class="text-xl font-medium leading-normal text-gray-800">
              결재 선택하기
            </h5>
            <button
              type="button"
              class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
              aria-label="Close"
              @click="
                () => {
                  $emit('closeModal', false);
                }
              "
            ></button>
          </div>
          <div class="subhead">
            <h4>결재 설정</h4>
            <p>이름을 드래그 하여 추가/삭제/이동 가능합니다</p>
          </div>
        </div>
        <div class="modal-body relative">
          <div class="choose_wrap">
            <div class="left_wrap">
              <span class="head">사용자</span>
              <div class="search_wrap">
                <div class="input_wrap">
                  <img src="@/assets/icon/Search.svg" />
                  <input
                    type="text"
                    placeholder="검색..."
                    v-model="searchItem"
                  />
                </div>
                <button
                  type="button"
                  class="bordered grey"
                  @click="searchManager"
                >
                  검색
                </button>
              </div>
              <div class="content_wrap">
                <draggable
                  v-model="managerList"
                  group="managers"
                  @start="drag = true"
                  @end="drag = false"
                  ghostClass="on-drag"
                  item-key="id"
                  animation="400"
                >
                  <template #item="{ element }">
                    <div class="content" draggable="true">
                      <h4>{{ element.name }}</h4>
                      <p>{{ element.department }}</p>
                    </div>
                  </template>
                </draggable>
                <!-- <div class="content" draggable="true">
                  <h4>Hong Gil Dong</h4>
                  <p>AAAA team leader</p>
                </div>
                <div class="content" draggable="true">
                  <h4>Ahn Gil-dong</h4>
                  <p>BBBB Team Manager</p>
                </div>
                <div class="content" draggable="true">
                  <h4>Two-line item</h4>
                  <p>Secondary team assistant</p>
                </div>
                <div class="content" draggable="true">
                  <h4>Two-line item</h4>
                  <p>Secondary team leader</p>
                </div> -->
              </div>
            </div>
            <div class="right-main">
            <div class="right_wrap">
              <span class="head">결재순서</span>
              <div class="content_wrap">
                <draggable
                  v-model="paymentArr"
                  group="managers"
                  @start="drag = true"
                  @end="drag = false"
                  ghostClass="on-drag"
                  animation="400"
                  item-key="id"
                >
                  <template #item="{ element, index }">
                    <div class="content" draggable="true">
                      <!-- content-after-arrow -->
                      <div class="content-after-arrow">
                        <div class="content_wrap_main" draggable="true">
                          <div class="icon_content">
                            <img src="@/assets/icon/hamburger2.svg" />
                            <div class="content">
                              <h4>{{ element.name }}</h4>
                              <p>{{ element.department }}</p>
                            </div>
                          </div>
                          <div
                            class="delete"
                            @click="RemoveManager(index, element)"
                          >
                            <img src="@/assets/icon/Delete.svg" />
                          </div>
                        </div>
                      </div>
                      <!-- <div :class="`arrow-down ${paymentArr.length - 1 === e ? 'hidden':''}`" v-for="(i,e) in paymentArr" :key="e">
                        <img src="@/assets/icon/arrow-down.svg" />
                      </div> -->
                    </div>
                  </template>
                </draggable>
                <!-- <div class="content_wrap_main" draggable="true">
                  <div class="icon_content">
                    <img src="@/assets/icon/hamburger2.svg" />
                    <div class="content">
                      <h4>Hong Gil Dong</h4>
                      <p>AAAA team leader</p>
                    </div>
                  </div>
                  <div class="delete">
                    <img src="@/assets/icon/Delete.svg" />
                  </div>
                </div>
                <div class="arrow-down">
                  <img src="@/assets/icon/arrow-down.svg" />
                </div>
                <div class="content_wrap_main" draggable="true">
                  <div class="icon_content">
                    <img src="@/assets/icon/hamburger2.svg" />
                    <div class="content">
                      <h4>Hong Gil Dong</h4>
                      <p>AAAA team leader</p>
                    </div>
                  </div>
                  <div class="delete">
                    <img src="@/assets/icon/Delete.svg" />
                  </div>
                </div>
                <div class="arrow-down">
                  <img src="@/assets/icon/arrow-down.svg" />
                </div>
                <div class="content_wrap_main" draggable="true">
                  <div class="icon_content">
                    <img src="@/assets/icon/hamburger2.svg" />
                    <div class="content">
                      <h4>Hong Gil Dong</h4>
                      <p>AAAA team leader</p>
                    </div>
                  </div>
                  <div class="delete">
                    <img src="@/assets/icon/Delete.svg" />
                  </div>
                </div> -->
              </div>
            </div>
            <p class="error_msg">{{error.message}}</p>
            </div>
          </div>
          
        </div>
        <div
          class="modal-footer flex flex-shrink-0 items-center justify-center p-4 rounded-b-md"
        >
          <button
            type="button"
            class="blue_bordered full-button px-6 py-2.5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
            @click="AddPayment"
          >
            설정완료
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import EvidenceManagement from "@/services/EvidenceManagement";
export default {
  name: "ChooseApproval",
  components: {
    draggable,
  },
  created() {
    this.evidenceManagement = new EvidenceManagement();
  },
  props: {
    existingPayment: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      drag: false,
      managerList: [],
      paymentArr: [],
      searchItem: "",
      error: {},
    };
  },
  mounted() {
    this.getmanagersList();
  },
  methods: {
    getmanagersList(data) {
      this.evidenceManagement.managersList(data).then((res) => {
        // console.log(res);
        if (res.status === 200) {
          this.managerList = res.data.data;
          if (this.existingPayment.length > 0) {
            this.paymentArr = [...this.existingPayment];
            let repeatedArr = this.managerList.filter((item) =>
              (this.existingPayment.findIndex((y) => y.id == item.id)) == -1
            );
            this.managerList = [...repeatedArr];
            console.log(repeatedArr);
          }
        }
      });
    },
    searchManager() {
      let inputData = {
        searchByText: this.searchItem,
      };
      this.getmanagersList(inputData);
    },
    AddPayment() {
        console.log("payment line", this.paymentArr);
      let current_userId = localStorage.getItem("uid");
      if(this.paymentArr.length==0) {
        this.error.message = "결재 담당자를 입력해주세요";
      }
      else if(this.paymentArr.length < 2) {
        this.error.message = "2명 이상의 결재 담당자를 입력해주세요";
      }
      else if(this.paymentArr[0].user_id === Number(current_userId)){
        this.error = {};
        this.$emit("paymentOrder", { display: false, value: this.paymentArr });
      }
      else {
        this.error.message = "증적 등록자를 최초 결재 담당자로 설정해야합니다";
      }
      
    },
    RemoveManager(id, item) {
      this.paymentArr.splice(id, 1);
      this.managerList.push(item);
    },
  },
};
</script>

<style scoped>
.on-drag {
  opacity: 0.5;
}
</style>
