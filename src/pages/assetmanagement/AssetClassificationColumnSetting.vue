<template>
  <div class="info_protection">
    <!-- <div class="breadcrumb">
           <p><a href="#">Home </a><span>></span> Asset management<span>></span> Asset list</p>
       </div> -->
    <Breadcrumb
      link="dashboard"
      text1="Home"
      text2="자산관리"
      text3="자산 목록"
      link2="/assetListSelection"
      text2link="/assetListSelection"
    />
    <div class="heading flex justify-between align-end">
      <h4>자산분류 및 컬럼 설정</h4>
    </div>
    <div class="asset_clasification_wrap">
      <div class="main_wrap flex justify-start">
        <div class="left_wrap">
          <div class="heading">
            <span>자산분류 관리</span>
          </div>
          <div class="btn_wrap">
            <button type="button" @click="additionCategory">추가</button>
            <button
              type="button"
              class="gray_border"
              @click="assetClassificationDeleteCategory"
            >
              삭제
            </button>
          </div>
          <div class="system_main_wrap flex justify-start">
            <div class="system_wrap">
              <div class="list">
                <ul>
                  <li
                    v-for="(category, i) in categoryList"
                    :key="i"
                    @click="
                      getCategoryDetails(
                        $event,
                        category.id,
                        category.category_name,
                        category.description,
                        category.is_displayed,
                        category.tab_type
                      )
                    "
                    :data-index="i"
                  >
                    {{ category.category_name }}
                  </li>
                  <!-- <li @click="
                      getCategoryDetails(
                        $event,
                        category.id,
                        category.category_name,
                        category.description,
                        category.is_displayed,
                        category.tab_type
                      )
                    "><a href="#">Web</a></li>
                                    <li><a href="#">DBMS</a></li>
                                    <li><a href="#">software</a></li>
                                    <li><a href="#">network</a></li>
                                    <li><a href="#">Application</a></li>
                                    <li><a href="#">information</a></li>
                                    <li><a href="#">protection system</a></li>
                                    <li><a href="#">terminal</a></li>
                                    <li><a href="#">document</a></li> -->
                </ul>
              </div>
              <div class="btn_wrap">
                <button type="button" @click="categoryDown">
                  <img src="@/assets/icon/arrowDown2.svg" />
                </button>
                <button type="button" @click="categoryUp">
                  <img src="@/assets/icon/arrowUp2.svg" />
                </button>
              </div>
            </div>
            <div class="classification_form">
              <div class="flex flex-col">
                <div class="overflow-x-auto form_table">
                  <div class="inline-block min-w-full">
                    <div class="overflow-hidden">
                      <table class="min-w-full border text-center">
                        <thead class="border-b">
                          <tr>
                            <th
                              scope="col"
                              class="form_head text-sm font-medium text-gray-900 px-6 py-4 border-r"
                            >
                              분류
                            </th>
                            <th
                              scope="col"
                              class="text-sm font-medium text-gray-900 px-6 py-4 border-r text-left"
                            >
                              {{ categoryName }}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr class="border-b">
                            <td
                              class="form_head text-sm text-gray-900 font-light px-6 py-4 border-r"
                            >
                              분류명
                            </td>
                            <td
                              class="text-sm text-gray-900 font-light px-6 py-4 border-r"
                            >
                              <input
                                type="text"
                                placeholder="분류명"
                                v-model="categoryName"
                                :disabled="isCategoryDisable"
                              />
                            </td>
                          </tr>
                          <tr class="bg-white border-b">
                            <td
                              class="form_head text-sm text-gray-900 font-light px-6 py-4 border-r"
                            >
                              분류설명
                            </td>
                            <td
                              class="text-sm text-gray-900 font-light px-6 py-4 border-r"
                            >
                              <textarea
                                :disabled="isCategoryDisable"
                                v-model="categoryDesc"
                                placeholder="분류설명"
                              ></textarea>
                            </td>
                          </tr>
                          <tr class="bg-white border-b">
                            <td
                              class="form_head px-6 py-4 text-sm font-medium text-gray-900 border-r"
                            >
                              분류표시
                            </td>
                            <td
                              colspan="2"
                              class="text-sm text-gray-900 font-light px-6 py-4 text-center border-r"
                            >
                              <div class="flex justify-start">
                                <div>
                                  <div class="form-check">
                                    <input
                                      :disabled="isCategoryDisable"
                                      ref="categoryDiasplay"
                                      class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                      type="checkbox"
                                      value=""
                                      id="flexCheckDefault"
                                    />
                                    <label
                                      class="form-check-label inline-block text-gray-800"
                                      for="flexCheckDefault"
                                    >
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div class="confirm">
                <button
                  type="button"
                  @click="assetClassificationUpdateCategory"
                >
                  확인
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="left_wrap">
          <div class="heading">
            <span>분류별 컬럼 관리</span>
          </div>
          <div class="btn_wrap" v-if="isColAdd">
            <button type="button" @click="addCategoryColumns">추가</button>
            <button
              type="button"
              class="gray_border"
              @click="deleteCategoryFields"
            >
              삭제
            </button>
          </div>
          <div class="system_main_wrap flex justify-start">
            <div class="system_wrap">
              <div class="list">
                <ul>
                  <li
                    v-for="column in assetListColumns"
                    :key="column"
                    @click="
                      getColumnDetails(
                        $event,
                        column.category_field_id,
                        column.field_name,
                        column.field_width,
                        column.is_field_displayed,
                        column.is_edit
                      )
                    "
                  >
                    {{ column.field_name }}
                  </li>
                </ul>
              </div>
              <div class="btn_wrap">
                <button type="button" @click="columnDown">
                  <img src="@/assets/icon/arrowDown2.svg" />
                </button>
                <button type="button" @click="columnUp">
                  <img src="@/assets/icon/arrowUp2.svg" />
                </button>
              </div>
            </div>
            <div class="classification_form">
              <div class="flex flex-col">
                <div class="overflow-x-auto form_table">
                  <div class="inline-block min-w-full">
                    <div class="overflow-hidden">
                      <table class="min-w-full border text-center">
                        <tbody>
                          <tr class="border-b">
                            <td
                              class="form_head text-sm text-gray-900 font-light px-6 py-4 border-r"
                            >
                              컬럼명
                            </td>
                            <td
                              class="text-sm text-gray-900 font-light px-6 py-4 border-r"
                            >
                              <input
                                :disabled="is_edit"
                                v-model="columnName"
                                type="text"
                                placeholder="컬럼명"
                              />
                            </td>
                          </tr>
                          <tr class="bg-white border-b">
                            <td
                              class="form_head text-sm text-gray-900 font-light px-6 py-4 border-r"
                            >
                              컬럼너비
                            </td>
                            <td
                              class="text-sm text-gray-900 font-light px-6 py-4 border-r"
                            >
                              <input
                                :disabled="is_edit"
                                v-model="columnWidth"
                                type="text"
                                placeholder="컬럼너비"
                                @keypress="isNumber($event)"
                              />
                            </td>
                          </tr>
                          <tr class="bg-white border-b">
                            <td
                              class="form_head px-6 py-4 text-sm font-medium text-gray-900 border-r"
                            >
                              컬럼표시
                            </td>
                            <td
                              colspan="2"
                              class="text-sm text-gray-900 font-light px-6 py-4 text-center border-r"
                            >
                              <div class="flex justify-start">
                                <div>
                                  <div class="form-check">
                                    <input
                                      :disabled="is_edit"
                                      ref="columnDisplay"
                                      class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                      type="checkbox"
                                      value=""
                                      id="flexCheckDefault"
                                    />
                                    <label
                                      class="form-check-label inline-block text-gray-800"
                                      for="flexCheckDefault"
                                    >
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div class="confirm" v-if="colConfirm">
                <button type="button" @click="assetClassificationUpdateColumns">
                  확인
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="button_wrap fixed-button-wrap flex justify-end">
      <!-- <div class="buttons flex justify-start">
                <button type="button" class="gray">Asset Ledger Download</button>
                <button type="button" class="gray">Share Your Assets</button>
            </div> -->
      <div class="buttons flex justify-end">
        <!-- <button type="button">My Revision History</button> -->
        <button type="button" @click="$router.push('assetListSelection')">
          뒤로가기
        </button>
      </div>
    </div>
    <!-- <ValidationModal
      v-if="isValidate"
      bodyText="Required data to perform this action"
      @close="isValidate = false"
      @confirm="isValidate = false"
      firstBtn="Confirm"
    /> -->
  </div>
</template>

<script>
import AssetManagementService from "@/services/AssetManagementService";
import Breadcrumb from "@/components/Breadcrumb.vue";
import ValidationModal from "@/components/modals/ValidationModal.vue";
import Toast from "@/alert/alert.js";
export default {
  name: "AssetClassificationColumnSetting",
  components: {
    Breadcrumb,
    ValidationModal,
  },
  data() {
    return {
      tabType: "",
      categoryList: [],
      selectedCatId: "1",
      categoryName: "",
      categoryDesc: "",
      isCategoryDisplay: "",
      assetListColumns: [],
      selectedColId: "",
      columnName: "",
      columnWidth: "",
      isColDisplay: "",
      assetListFieldData: [],
      isValidate: false,
      isCategoryAddition: false,
      isCategoryDisable: true,
      isColumnAddition: false,
      isColumnDisable: true,
      is_edit: true,
      isColAdd: false,
      colConfirm: false,
    };
  },

  created() {
    this.AssetManagementService = new AssetManagementService();
  },
  beforeMount() {
    this.getAssetClassificationCriteria();
  },
  methods: {
    // for asset classification
    getAssetClassificationCriteria() {
      this.AssetManagementService.assetClassificationCriteria().then((res) => {
        console.log("classification-criteria", res);
        this.categoryList = res.data.assets_category_list;
      });
    },

    assetClassificationUpdateCategory() {
      if (!this.categoryName || !this.categoryDesc) {
        if (this.categoryName == "") {
          Toast.fire({ title: "분류명을 입력해주세요" });
        } else if (this.categoryDesc == "") {
          Toast.fire({ title: "분류설명을 입력해주세요" });
        }
        this.isValidate = true;
        return;
      }

      if (this.isCategoryAddition) {
        this.addClassificationCategory();
      } else {
        let credentials = {
          assets_category_id: this.selectedCatId,
          category_name: this.categoryName,
          description: this.categoryDesc,
          is_displayed: this.$refs.categoryDiasplay.checked ? "y" : "n",
        };
        this.AssetManagementService.assetClassificationUpdateCategory(
          credentials
        ).then((res) => {
          console.log("update-classification-category", res);
          if (res.status == 200) {
            Toast.fire({ title: res.data.message });
            this.getAssetClassificationCriteria();
          } else {
            Toast.fire({ title: res.response.data.error });
          }
        });
      }
    },

    assetClassificationDeleteCategory() {
      if (!this.selectedCatId) {
        this.isValidate = true;
        return;
      }
      this.AssetManagementService.assetClassificationDeleteCategory(
        this.selectedCatId
      ).then((res) => {
        console.log("update-classification-delete", res);
        if (res.status == 200) {
          this.categoryName = "";
          this.categoryDesc = "";
          this.isCategoryDisplay = "";
          this.$refs.categoryDiasplay.checked = false;
          this.getAssetClassificationCriteria();
          Toast.fire({ title: res.data.message });
        } else {
          Toast.fire({ title: res.response.data.error });
        }
      });
    },

    getCategoryDetails(e, id, name, desc, display, tab) {
      Array.from(document.querySelectorAll("li")).forEach((element) =>
        element.classList.remove("active-category")
      );
      e.target.classList.add("active-category");

      this.selectedCatId = id;
      this.categoryName = name;
      this.categoryDesc = desc;
      this.isCategoryDisplay = display;
      this.tabType = tab;
      if (tab !== "default") {
        this.isCategoryDisable = false;
        this.isColumnDisable = false;
      } else {
        this.isCategoryDisable = true;
        this.isColumnDisable = true;
      }

      if (this.isCategoryDisplay == "y") {
        this.$refs.categoryDiasplay.checked = true;
      } else {
        this.$refs.categoryDiasplay.checked = false;
      }
      this.columnName = "";
      this.columnWidth = "";
      this.isColDisplay = "";
      this.$refs.columnDisplay.checked = false;
      this.isColAdd = true;
      this.is_edit = true;
      this.getAssetTableColumns(this.selectedCatId);
    },

    additionCategory() {
      this.categoryName = "";
      this.categoryDesc = "";
      this.isCategoryDisplay = "";
      this.isCategoryAddition = true;
      this.isCategoryDisable = false;
      this.$refs.categoryDiasplay.checked = false;
    },

    addClassificationCategory() {
      let isCategoryExist = Array.from(this.categoryList).some(
        (item) => item.category_name == this.categoryName
      );

      if (isCategoryExist) {
        Toast.fire({ title: "이미 존재하는 분류명입니다" });
        return;
      }

      let credentials = {
        parent_id: this.selectedCatId,
        category_name: this.categoryName,
        description: this.categoryDesc,
        is_displayed: this.$refs.categoryDiasplay.checked ? "y" : "n",
      };
      this.AssetManagementService.addClassificationCategory(credentials).then(
        (res) => {
          console.log("add-classification-category", res);
          if (res.status == 200) {
            this.isCategoryAddition = false;
            this.isCategoryDisable = true;
            this.getAssetClassificationCriteria();
            Toast.fire({ title: res.data.message });
          } else {
            Toast.fire({ title: res.response.data.error });
          }
        }
      );
    },

    // selection up and down for category

    categoryUp() {
      let activeList = document.querySelector(".active-category");
      if (activeList.previousElementSibling !== null) {
        activeList.classList.remove("active-category");
        activeList.previousElementSibling.classList.add("active-category");
        activeList.previousElementSibling.click();
        activeList.previousElementSibling.scrollIntoView({
          behavior: "smooth",
        });
      }
    },

    categoryDown() {
      let activeList = document.querySelector(".active-category");
      if (activeList.nextElementSibling !== null) {
        activeList.classList.remove("active-category");
        activeList.nextElementSibling.classList.add("active-category");
        activeList.nextElementSibling.click();
        activeList.nextElementSibling.scrollIntoView({ behavior: "smooth" });
      }
    },

    // for column managemnet
    getAssetTableColumns(id) {
      this.colConfirm = false;
      this.AssetManagementService.allFieldList(id).then((res) => {
        console.log("asset-columns-list", res);
        this.assetListColumns = res.data.all_assets_category_field_list;
      });
    },

    getColumnDetails(e, id, name, width, display, is_edit) {
      console.log("is edit", is_edit);
      this.colConfirm = true;
      Array.from(document.querySelectorAll("li")).forEach((element) =>
        element.classList.remove("active-category-field")
      );
      e.target.classList.add("active-category-field");

      this.selectedColId = id;
      this.columnName = name;
      this.columnWidth = width;
      this.isColDisplay = display;

      if (is_edit == "n") {
        this.is_edit = true;
      } else {
        this.is_edit = false;
      }

      if (this.isColDisplay == "y") {
        this.$refs.columnDisplay.checked = true;
      } else {
        this.$refs.columnDisplay.checked = false;
      }
    },

    addCategoryColumns() {
      this.columnName = "";
      this.columnWidth = "";
      this.isColDisplay = "";
      this.isColumnAddition = true;
      (this.isColumnDisable = false),
        (this.$refs.columnDisplay.checked = false);
      this.is_edit = false;
      this.colConfirm = true;
      console.log("object", this.is_edit);
    },

    assetClassificationUpdateColumns() {
      if (!this.columnName || !this.columnWidth) {
        if (this.columnName == "") {
          Toast.fire({ title: "컬럼명을 입력해주세요" });
        } else if (this.columnWidth == "") {
          Toast.fire({ title: "컬럼너비를 입력해주세요" });
        }
        this.isValidate = true;
        return;
      }

      if (this.isColumnAddition) {
        this.addClassificationColumn();
        this.is_edit = true;
        this.colConfirm = false;
      } else {
        let credentials = {
          assets_category_id: this.selectedCatId,
          field_name: this.columnName,
          is_field_displayed:
            this.$refs.columnDisplay.checked == true ? "y" : "n",
          field_width: this.columnWidth,
          assets_category_field_id: this.selectedColId,
        };
        this.AssetManagementService.updateCategoryList(credentials).then(
          (res) => {
            if (res.status == 200) {
              Toast.fire({ title: res.data.message });
              this.getAssetTableColumns(this.selectedCatId);
              console.log("update-classification-columns", res);
              this.is_edit = true;
              this.colConfirm = false;
            } else {
              Toast.fire({ title: res.response.data.error });
            }
          }
        );
      }
    },

    addClassificationColumn() {
      let isColumnExist = Array.from(this.assetListColumns).some(
        (item) => item.field_name == this.columnName
      );
      if (isColumnExist) {
        return;
      }

      let credentials = {
        assets_category_id: this.selectedCatId,
        field_name: this.columnName,
        is_field_displayed:
          this.$refs.columnDisplay.checked == true ? "y" : "n",
        field_width: this.columnWidth,
      };
      this.AssetManagementService.addClassificationCategoryFields(
        credentials
      ).then((res) => {
        console.log("add-classification-category", res);
        if (res.status == 200) {
          this.isColumnAddition = false;
          this.isColumnDisable = true;
          this.getAssetTableColumns(this.selectedCatId);
          Toast.fire({ title: res.data.message });
          this.columnName = "";
          this.columnWidth = "";
        }
      });
    },
    deleteCategoryFields() {
      if (this.selectedColId == "") {
        return;
      }
      this.AssetManagementService.assetColumnDelete(
        this.selectedCatId,
        this.selectedColId
      ).then((res) => {
        console.log("delete-columns", res);
        if (res.status == 200) {
          Toast.fire({ title: res.data.message });
          this.getAssetTableColumns(this.selectedCatId);
          this.is_edit = true;
        } else {
          Toast.fire({ title: res.response.data.error });
        }
      });
    },

    // selection up and down for category

    columnUp() {
      let activeList = document.querySelector(".active-category-field");
      if (activeList.previousElementSibling !== null) {
        activeList.classList.remove("active-category-field");
        activeList.previousElementSibling.classList.add(
          "active-category-field"
        );
        activeList.previousElementSibling.click();
        activeList.previousElementSibling.scrollIntoView({
          behavior: "smooth",
        });
      }
    },

    columnDown() {
      let activeList = document.querySelector(".active-category-field");
      if (activeList.nextElementSibling !== null) {
        activeList.classList.remove("active-category-field");
        activeList.nextElementSibling.classList.add("active-category-field");
        activeList.nextElementSibling.click();
        activeList.nextElementSibling.scrollIntoView({ behavior: "smooth" });
      }
    },

    isNumber: function (evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
  },
};
</script>

<style scoped>
.list li {
  cursor: pointer;
}
.active-category,
.active-category-field {
  background-color: rgb(236, 231, 231);
}
</style>
