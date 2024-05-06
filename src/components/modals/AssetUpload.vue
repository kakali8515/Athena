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
            엑셀 자산 업로드
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
            @click="close"
          ></button>
        </div>
        <div class="modal-body relative">
          <div class="document_pssword diagnosis_wrap">
            <div class="file_upload_wrap">
              <!-- <p>업로드</p> -->
              <div class="input_wrap upload-modal">
                <input
                  type="text"
                  placeholder="엑셀 파일을 업로드해주세요"
                  v-model="fileName"
                  readonly
                />
                <span class="fileErrorMsg">{{ error.file }}</span>
                <div class="file_wrap">
                  <button type="button">파일 선택</button>
                  <input
                    class="onchangeFile"
                    type="file"
                    v-on:change="onFileChange"
                    required
                  />
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
            class="
              full_button
              bordered
              px-6
              py-2.5
              bg-blue-600
              text-white
              font-medium
              text-xs
              leading-tight
              uppercase
              rounded
              focus:bg-blue-700 focus:outline-none focus:ring-0
              active:bg-blue-800
              transition
              duration-150
              ease-in-out
            "
            @click="close"
          >
            취소
          </button>
          <button
            :disabled="file == ''"
            :class="file == '' ? 'cursor-not-allowed' : ''"
            type="button"
            @click="upload"
            class="
              full_button
              solid
              px-6
              py-2.5
              bg-blue-600
              text-white
              font-medium
              text-xs
              leading-tight
              uppercase
              rounded
              hover:bg-blue-700
              focus:bg-blue-700 focus:outline-none focus:ring-0
              active:bg-blue-800
              transition
              duration-150
              ease-in-out
            "
            style="font-size: 18px"
          >
            파일 업로드
          </button>
        </div>
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
import AssetManagementService from "@/services/AssetManagementService";
import Toast from "@/alert/alert.js";
export default {
  name: "AssetUpload",
  props: ["activeId"],
  components: {},
  data() {
    return {
      error: {},
      fileName: "",
      file: "",
      errorMsg: "",
      isLoading: false,
      fullPage: true,
    };
  },
  created() {
    this.AssetManagementService = new AssetManagementService();
  },
  methods: {
    close() {
      this.$emit("close");
    },
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.file = files[0];
      this.fileSize = e.target.files[0].size;
      let allowedExtensions = /(\.xlsx)$/i;
      if (!allowedExtensions.exec(this.file.name)) {
        this.render = true;
        this.error.file = ".xlxs 파일만 업로드 가능합니다";
        this.url = "";
        return false;
      } else if (this.fileSize > 1024 * 1024 * 20) {
        this.render = true;
        this.error.file = "업로드 파일 용량은 최대 20mb입니다";
        this.url = "";
        this.fileName = "";
        return false;
      } else if (allowedExtensions.exec(this.file.name)) {
        this.error.file = "";
        this.render = false;
        this.fileName = this.file.name;
        this.fileExtension = this.fileName.replace(/^.*\./, "");
      }
      this.error.file = "";
    },

    upload() {
      let formData = new FormData();
      formData.append("category_id", this.activeId);
      formData.append("certification", this.$store.state.header.certificate);
      formData.append("file_name", this.file);
      this.isLoading = true;
      this.AssetManagementService.uploadExcel(formData).then((res) => {
        if (res.status == 200) {
          this.isLoading = false;
          Toast.fire({ title: res.data.message });
          this.$emit("confirm");
          this.$emit("close");
        } else {
          this.isLoading = false;
          Toast.fire({ title: res.response.data.error });
        }
      });
    },
  },
};
</script>

<style lang="scss">
</style>