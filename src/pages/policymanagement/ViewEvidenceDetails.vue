<template>
  <div class="info_protection">
    <Breadcrumb
      link="dashboard"
      text1="Home"
      text2="정책관리"
      text3="정보보호정책"
      link2="../informationProtectionPolicyadded"
    />
    <div class="heading flex justify-between align-end">
      <h4>증적 상세보기</h4>
      <div class="history_wrap">
        <span>업로드 이력</span>
        <select
          v-model="history_id"
          @change="updateDetails"
          :disabled="uploadHistoryList.length == 0"
        >
          <option value="" selected>선택</option>
          <option
            :value="item.history_id"
            v-for="(item, index) in uploadHistoryList"
            :key="index"
          >
            {{ dateformat(item.history_date) }}
          </option>
        </select>
      </div>
    </div>
    <div class="evidance_report">
      <div class="evidence_table">
        <div class="flex flex-col">
          <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full sm:px-6 lg:px-8">
              <div class="overflow-hidden">
                <table class="min-w-full text-center">
                  <thead class="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        class="text-sm font-medium text-gray-900 px-6 py-4"
                      >
                        통제영역
                      </th>
                      <th
                        scope="col"
                        class="text-sm font-medium text-gray-900 px-6 py-4"
                      >
                        증적 코드
                      </th>
                      <th
                        scope="col"
                        class="text-sm font-medium text-gray-900 px-6 py-4"
                      >
                        증적 명
                      </th>
                      <th
                        scope="col"
                        class="text-sm font-medium text-gray-900 px-6 py-4"
                      >
                        실사여부
                      </th>
                      <th
                        scope="col"
                        class="text-sm font-medium text-gray-900 px-6 py-4"
                      >
                        주기
                      </th>
                      <th
                        scope="col"
                        class="text-sm font-medium text-gray-900 px-6 py-4"
                      >
                        결재
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="bg-white border-b">
                      <td class="px-6 py-4 text-sm font-medium text-gray-900">
                        {{ control_area }}
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4">
                        {{ evidence_code }}
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4">
                        {{ evidence }}
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4">
                        {{ due_diligence }}
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4">
                        {{ cycle }}
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4">
                        {{ current_status }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="evidence_details_wrap">
        <div class="explenation">
          <div class="heading">
            <h4>설명</h4>
          </div>
          <div class="details">
            <p>{{ explanation }}</p>
          </div>
        </div>
        <div class="evidence_table details_table">
          <div class="flex flex-col">
            <div class="overflow-x-auto">
              <div class="py-4 inline-block min-w-full">
                <div class="overflow-hidden">
                  <table class="min-w-full text-center">
                    <thead class="border-b bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          class="text-sm font-medium text-gray-900 px-6 py-4"
                        >
                          영역
                        </th>
                        <th
                          scope="col"
                          class="text-sm font-medium text-gray-900 px-6 py-4"
                        >
                          통제항목
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(item, index) in area_control_item_information"
                        :key="index"
                        class="bg-white border-b"
                      >
                        <td class="px-6 py-4 text-sm font-medium text-gray-900">
                          {{ item.area }}
                        </td>
                        <td class="text-sm text-gray-900 font-light px-6 py-4">
                          {{ item.control_item }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="explenation">
          <div class="heading">
            <h4>담당자</h4>
          </div>
          <div class="details">
            <p>
              <span v-for="(manager, index) in manager_information" :key="index"
                >{{ manager.name
                }}<span v-if="index + 1 < manager_information.length"
                  >,
                </span></span
              >
            </p>
          </div>
        </div>
      </div>
      <div class="evidence_wrap" v-if="original_file_name">
        <div class="file_extension">
          <span>{{ original_file_name }}</span>
          <img src="@/assets/icon/Close_square.svg" />
        </div>
      </div>
      <div class="eveidence_slider" v-if="file_path">
        <div class="pdf_wrap">
          <iframe
            v-if="showPdf"
            :src="pdfSource"
            style="width: 100%; height: 583px; border: none"
          ></iframe>
        </div>
        <div
          id="carouselExampleControls"
          class="carousel slide relative"
          data-bs-ride="carousel"
          v-if="showPdf == false"
        >
          <div class="carousel-inner relative w-full overflow-hidden">
            <div class="carousel-item active relative float-left w-full">
              <div class="block w-full" v-if="file_path">
                <div
                  class="evidence_wrap"
                  v-if="
                    file_path.replace(/^.*\./, '') == 'pdf' ||
                    file_path.replace(/^.*\./, '') == 'xls' ||
                    file_path.replace(/^.*\./, '') == 'xlsx' ||
                    file_path.replace(/^.*\./, '') == 'doc' ||
                    file_path.replace(/^.*\./, '') == 'docx' ||
                    file_path.replace(/^.*\./, '') == 'hwp'
                  "
                >
                  <div
                    @click="
                      convertDocument(file_path, file_path.replace(/^.*\./, ''))
                    "
                    class="file_extension"
                  >
                    <a>
                      <img src="@/assets/icon/pdf.svg" />
                    </a>
                  </div>
                </div>
                <img v-else :src="imgBaseUrl + file_path" />
              </div>
            </div>
            <!-- <div class="carousel-item relative float-left w-full">
                    <div class="block w-full"></div>
                    </div>
                    <div class="carousel-item relative float-left w-full">
                    <div class="block w-full"></div>
                    </div> -->
          </div>
          <!-- <button
                    class="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
                    type="button"
                    data-bs-target="#carouselExampleControls"
                    data-bs-slide="prev"
                >
                    <span class="carousel-control-prev-icon inline-block bg-no-repeat" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button
                    class="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
                    type="button"
                    data-bs-target="#carouselExampleControls"
                    data-bs-slide="next"
                >
                    <span class="carousel-control-next-icon inline-block bg-no-repeat" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button> -->
        </div>
      </div>
      <div class="evidence_wrap" v-if="template_information">
        <span class="template-information" v-html="template_information"></span>
      </div>
    </div>
  </div>
  <Loading
    :active="isLoading"
    :can-cancel="true"
    :on-cancel="onCancel"
    :is-full-page="fullPage"
  ></Loading>
</template>

<script>
import PolicyManagementService from "@/services/PolicyManagementService";
import Breadcrumb from "@/components/Breadcrumb.vue";
import EvidenceManagement from "@/services/EvidenceManagement";
import moment from "moment";
export default {
  name: "ViewEvidenceDetails",
  components: {
    Breadcrumb,
  },
  data() {
    return {
      evidence_id: this.$route.params.id,
      history_id: "",
      uploadHistoryList: [],
      control_area: "",
      evidence_code: "",
      due_diligence: "",
      cycle: "",
      current_status: "",
      area_control_item_information: [],
      explanation: "",
      manager_information: [],
      evidence: "",
      file_path: "",
      imgBaseUrl: process.env.VUE_APP_IMAGE_BASE_URL,
      original_file_name: "",
      template_information: "",
      isLoading: false,
      showPdf: false,
      pdfSource: "",
    };
  },
  created() {
    this.PolicyManagementService = new PolicyManagementService();
    this.evidenceManagement = new EvidenceManagement();
  },
  mounted() {
    this.historyList();
    this.dateformat();
    this.evidenceDetails();
  },
  methods: {
    evidenceDetails() {
      this.PolicyManagementService.evidenceDetails(
        this.evidence_id,
        this.history_id
      )
        .then((res) => {
          if (res.status == 200) {
            this.control_area = res.data.data.control_area;
            this.evidence_code = res.data.data.evidence_code;
            this.due_diligence = res.data.data.due_diligence;
            this.cycle = res.data.data.cycle;
            this.current_status = res.data.data.current_status;
            this.area_control_item_information =
              res.data.data.area_control_item_information;
            this.explanation = res.data.data.explanation;
            this.manager_information = res.data.data.manager_information;
            this.evidence = res.data.data.evidence;
            this.file_path = res.data.data.file_name;
            this.original_file_name = res.data.data.original_file_name;
            this.template_information =
              res.data.data.template_information.template;
          }
        })
        .catch((err) => {
          return;
        });
    },
    historyList() {
      this.PolicyManagementService.uploadHistoryList(this.evidence_id)
        .then((res) => {
          if (res.status == 200) {
            this.uploadHistoryList = res.data.evidence_upload_histrory_list;
            // this.history_id =
            //   res.data.evidence_upload_histrory_list[0].history_id;
            // this.evidenceDetails();
          }
        })
        .catch((err) => {
          return;
        });
    },
    dateformat(value) {
      if (value) {
        return moment(String(value)).format("YYYY-MM-DD");
      }
    },
    updateDetails() {
      this.evidenceDetails();
    },
    hexaDecode(hexx) {
      var hex = hexx.toString(); //force conversion
      var str = "";
      for (var i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
      return this.imgBaseUrl + str;
    },
    convertDocument(fileName, extension) {
      this.isLoading = true;
      this.evidenceManagement
        .convertPdf(this.evidence_id, fileName)
        .then((res) => {
          if (res.status == 200) {
            const url = `${process.env.VUE_APP_API_BASE_URL}/download/file?url=${res.data.url}`; // later required base url to dynamic
            // const link = document.createElement("a");
            // link.href = url;
            // console.log(link);
            // link.setAttribute("download", "download");
            // document.body.appendChild(link);
            // link.click();
            this.pdfSource = this.hexaDecode(res.data.url);
            setTimeout(() => {
              this.showPdf = true;
            }, 500);
            this.isLoading = false;
          } else {
            this.isLoading = false;
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep table {
  border-collapse: collapse;
  width: 100%;

  td {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }

  th {
    background-color: #dddddd;
    border: 1px solid #c6c5c5;
    text-align: left;
    padding: 8px;
  }
}

img {
  width: 100%;
}
</style>
