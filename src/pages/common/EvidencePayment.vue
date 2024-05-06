<template>
  <div class="payment_main_wrap">
    <div class="head_wrap">
      <div class="left_wrap">
        <div class="bread-wrap">
          <Breadcrumb
            link="/dashboard"
            text1="사용자"
            text2="전자결재"
            text2link="/electronicPayment"
          />
        </div>
        <div class="heading">
          <h4>증적 결재</h4>
        </div>
      </div>
      <div class="right_wrap">
        <div class="flex flex-col">
          <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-4 inline-block min-w-full sm:px-6 lg:px-8">
              <div class="overflow-hidden">
                <table class="min-w-full text-center">
                  <tr></tr>
                </table>

                <div class="payment_status_outer">
                  <div class="data_set">
                    <p class="title bg-gry">계좌</p>
                    <hr />
                    <p class="status bg-gry">결재</p>
                  </div>
                  <div
                    class="data_set"
                    v-for="(item, index) of paymentDetails.order_of_payment"
                    :key="index"
                  >
                    <p class="title">{{ item.name }}</p>
                    <hr />
                    <p class="status">{{ item.display_status }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="payment_table">
      <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-4 inline-block min-w-full sm:px-6 lg:px-8">
            <div class="overflow-hidden">
              <table class="min-w-full text-center">
                <thead class="border-b dark_head">
                  <tr>
                    <th
                      scope="col"
                      class="text-sm font-medium text-gray-900 px-6 py-4"
                    >
                      증적명
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-gray-900 px-6 py-4"
                    >
                      기안자
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-gray-900 px-6 py-4"
                    >
                      기안시간
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-gray-900 px-6 py-4"
                    >
                      참조
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <!-- manager_information -->
                  <!-- <template > -->
                  <tr class="bg-white border-b">
                    <td class="px-6 py-4 text-sm font-medium text-gray-900">
                      {{ paymentDetails.evidence }}
                    </td>
                    <td class="text-sm text-gray-900 font-light px-6 py-4">
                      {{ paymentDetails.user_name }}
                    </td>
                    <td class="text-sm text-gray-900 font-light px-6 py-4">
                      {{ dateformat(paymentDetails.due_date) }}
                    </td>
                    <td class="text-sm text-gray-900 font-light px-6 py-4">
                      <p>
                        {{ referanceData.toString() }}
                      </p>
                    </td>
                  </tr>
                  <!-- </template> -->
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="eveidence_slider">
      <div
        v-if="paymentDetails.evidence_type == 'template'"
        class="evidence_temp"
      >
        <p v-html="paymentDetails.template_information.template"></p>
      </div>
      <!-- <template v-if="showPdf == false"> -->
      <div v-if="paymentDetails.evidence_type == 'file'" class="evidence_img evidence_wrap">
        <div
          class="pdf_wrap"
          v-if="
            paymentDetails.file_name.replace(/^.*\./, '') == 'pdf' ||
            paymentDetails.file_name.replace(/^.*\./, '') == 'xlsx' ||
            paymentDetails.file_name.replace(/^.*\./, '') == 'xls' ||
            paymentDetails.file_name.replace(/^.*\./, '') == 'doc' ||
            paymentDetails.file_name.replace(/^.*\./, '') == 'docx' ||
            paymentDetails.file_name.replace(/^.*\./, '') == 'hwp'
          "
        >
          <iframe
            :src="pdfSource"
            style="width: 100%; height: 650px; border: none"
          ></iframe>
        </div>
        <img
          v-else
          :src="imgBaseUrl + paymentDetails.file_name"
          alt="evidance"
          @click.right="rightClickPrevent($event)"
        />
      </div>
      <!-- </template> -->
    </div>
    <div class="button_wrap fixed-button-wrap">
      <div class="left_button">
        <button type="button" @click="evidenceDownload">증적 다운로드</button>
        <button
          type="button"
          @click="downloadOriginaFile"
          class="download_attatchment"
          v-if="paymentDetails.evidence_type == 'file'"
        >
          파일첨부
        </button>
      </div>
      <div
        class="right_button"
        v-if="
          paymentDetails.user_status == 'save' ||
          paymentDetails.user_status == 'pending'
        "
      >
        <button type="button" class="red_border" @click="isRejected = true">
          반려
        </button>
        <button type="button" class="blue_border" @click="getEvidenceApprove">
          결재하기
        </button>
      </div>
    </div>
  </div>
  <ApprovalManagement
    v-if="isRejected"
    @close="isRejected = false"
    :evd_id="evidence_id"
    :tranc_id="transaction_id"
  />
  <PaymentCompleted v-if="isApproved" @close="isApproved = false" />
  <Loading
    :active="isLoading"
    :can-cancel="true"
    :on-cancel="onCancel"
    :is-full-page="fullPage"
  ></Loading>
</template>

<script>
import CommonService from "@/services/CommonService";
import moment from "moment";
import ApprovalManagement from "@/components/modals/ApprovalManagement";
import PaymentCompleted from "@/components/modals/PaymentCompleted";
import Breadcrumb from "@/components/Breadcrumb.vue";
import EvidenceManagement from "@/services/EvidenceManagement";
import Toast from "@/alert/alert.js";


export default {
  name: "EvidencePayment",
  components: {
    ApprovalManagement,
    PaymentCompleted,
    Breadcrumb,
  },
  data() {
    return {
      paymentDetails: [],
      referanceData: "",
      evidence_id: this.$route.params.e_id ? this.$route.params.e_id : "",
      transaction_id: this.$route.params.t_id ? this.$route.params.t_id : "",
      isRejected: false,
      isApproved: false,
      imgBaseUrl: process.env.VUE_APP_IMAGE_BASE_URL,
      isLoading: false,
      pdfSource: "",
      showPdf: false,
    };
  },
  created() {
    this.commonService = new CommonService();
    this.evidenceManagement = new EvidenceManagement();
  },
  mounted() {
    this.getPaymentDetails();
    this.dateformat();
  },
  methods: {
    // get electronic data
    getPaymentDetails() {
      this.commonService
        .paymentDetails(this.evidence_id, this.transaction_id)
        .then((res) => {
          if (res.status == 200) {
            this.paymentDetails = res.data.data;
            console.log(
              "this.paymentDetails.file_name",
              this.paymentDetails.file_name
            );
            // this.pdfSource = this.imgBaseUrl + this.paymentDetails.file_name;
            this.referanceData = this.paymentDetails.manager_information.map(
              (item) => {
                return item.name;
              }
            );
            this.convertDocument();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // payment accept
    getEvidenceApprove() {
      this.commonService
        .evidenceApprove(this.evidence_id, this.transaction_id)
        .then((res) => {
          if (res.status == 200) {
            console.log(res);
            this.isApproved = true;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // date formate fn
    dateformat(value) {
      if (value) {
        return moment(String(value)).format("YYYY-MM-DD hh:mm");
      }
    },
    // downoad evidance
    evidenceDownload() {
      this.commonService
        .downloadEvidence(this.evidence_id, this.transaction_id)
        .then((res) => {
          if (res.status == 200) {
            const url = `${process.env.VUE_APP_API_BASE_URL}/download/file?url=${res.data.path}&type=unlink`; // later required base url to dynamic
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "Evidence");
            document.body.appendChild(link);
            link.click();
            // let path = res.data.path;
            // path = path + 'type=unlink';
            // let data = { url: path, fileName: 'Evidence' };
            // this.$store.dispatch('diagnosisManagement/createDownloadFiles', data);
          } else if (res.response.status == 401) {
            Toast.fire({ title: res.response.data.error });
          } else {
            return;
          }
        });
    },
    hexaDecode(hexx) {
      var hex = hexx.toString(); //force conversion
      var str = "";
      for (var i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
      return this.imgBaseUrl + str;
    },
    convertDocument() {
      console.log(
        "this.paymentDetails.file_name",
        this.paymentDetails.file_name
      );
      this.isLoading = true;
      this.evidenceManagement
        .convertPdf(this.evidence_id, this.paymentDetails.file_name)
        .then((res) => {
          if (res.status == 200) {
            const url = `${process.env.VUE_APP_API_BASE_URL}/download/file?url=${res.data.url}`; // later required base url to dynamic
            // const link = document.createElement("a");
            // link.href = url;
            // console.log(link);
            // link.setAttribute("download", "download");
            // document.body.appendChild(link);
            // link.click();
            this.isLoading = false;
            this.pdfSource = this.hexaDecode(res.data.url) + "#toolbar=0";
            setTimeout(() => {
              this.showPdf = true;
            }, 500);
          } else {
            this.isLoading = false;
          }
        });
    },

    downloadOriginaFile() {
      if(this.paymentDetails.download_original_file_name){
      const url = `${process.env.VUE_APP_API_BASE_URL}/download/file?url=${this.paymentDetails.download_original_file_name}`; // later required base url to dynamic
      const link = document.createElement("a");
      link.href = url;
      // console.log(link);
      link.setAttribute("download", "download");
      document.body.appendChild(link);
      link.click();
      }
      else{
        Toast.fire({ title: "접근 권한이 없습니다"});
      }
    },
    rightClickPrevent(e){
      e.preventDefault()
    }
  },
};
</script>

<style lang="scss" scoped>
.download_attatchment {
  display: flex;
  justify-content: center;
  position: relative;
  align-items: center;
  margin-left: 20px;
}
.left_button {
  display: flex;
}
.payment_status_outer {
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;

  .data_set {
    // display: flex;
    border: 1px solid #f2f2f2;

    .bg-gry {
      background: #f2f2f2;
    }

    .title,
    .status {
      padding: 10px 15px;
    }
  }
}

.evidence_img {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  overflow: auto;
}
.evidence_temp {
  padding: 20px;
  height: 100%;
  overflow: auto;
}
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

.bread-wrap {
  .breadcrumb {
    p {
      a {
        color: #666 !important;
        &:last-child {
          color: #3780e6 !important;
        }
      }
    }
  }
}
.pdf_wrap{
  width: 100%;
}
</style>
