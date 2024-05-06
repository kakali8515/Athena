<template>
    <div class="modal-overlap waitingcompanyapproval">
        <div class="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
            <div class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
            <div class="modal-header flex flex-shrink-0 items-center justify-between p-4 rounded-t-md">
                <h5 class="text-xl font-medium leading-normal text-gray-800" id="exampleModalScrollableLabel">
                  네트워크 구성도 추가
                </h5>
                <button type="button"
                class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                data-bs-dismiss="modal" aria-label="Close" @click="this.$emit('close')"></button>
            </div>

            <form class="form_wrap" @submit="(e) => e.preventDefault()" enctype="multipart/form-data" method="post">
                <div class="modal-body relative">
                    <div class="document_pssword">
                        <div
                            class="form"
                            :class="error.tab_name ? 'field-error' : ''"
                        >
                        <p>구성도 명</p>
                        <input type="text" placeholder="구성도 명"  class="form-control" v-model="diagram_name">
                        <span>{{ error.tab_name }}</span>
                        </div>
                        <div class="file_upload_wrap">
                            <div class="input_wrap">
                                <input type="text" readonly placeholder="파일명 .확장자" v-model="fileName">
                                <div class="file_wrap">
                                    <button type="button">업로드</button>
                                    <input class="onchangeFile" type="file" @change="onFileChange">
                                </div>
                                <p class="info-msg">1개의 이미지 파일만 입력 가능합니다 (최대 20mb)</p>
                                <p v-if="errorMsg" class="fileErrorMsg">{{ errorMsg }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <div
                class="modal-footer flex flex-shrink-0 items-center justify-center p-4 rounded-b-md">
                <button type="button"
                @click="uploadImage"
                class="full_button blue_bordered px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded focus:outline-none focus:ring-0 transition duration-150 ease-in-out" style="font-size:18px;">
                업로드
                </button>
                <button type="button"
                @click="this.$emit('close')"
                class="full_button bordered px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded focus:outline-none focus:ring-0 transition duration-150 ease-in-out" >
                취소
                </button> 
                
                </div>
            </div>
        </div>
    </div>
</template>


<script>    
import NetworkDiagramService from '@/services/NetworkDiagramService'
import networkValidation from '@/validation/networkValidation'

export default {
  name: 'ImageAdditionModal',

  data() {
    return {
      diagram_name: "", 
      file: "",
      fileName: "",
      fileSize: "",
      errorMsg: "",
      error: {},
    };
  },

  created() {
    this.NetworkDiagramService = new NetworkDiagramService()
  },

  methods: {
    checkError() {
      let upload_data = {
        tab_name: this.diagram_name, 
        file_name: this.file,
      };

      const { isInvalid, error } = networkValidation(upload_data);

      if (isInvalid) {
        this.error = error;
        return false;
      } else {
        this.error = {};
        return true;
      }
    },
    async uploadImage() {
      if (!this.checkError()) {
        return;
      } else if (this.errorMsg !== "") {
        return;
      } 
      else if (this.file === "") {
        // this.$emit('close')
        this.$emit('openCheckAttachmentModal')
        return;
      } else {
        let formData = new FormData();
        formData.append("diagram_name",this.diagram_name);
        formData.append("diagram", this.file);
        formData.append("certification",this.$store.state.header.certificate);
        const res = await this.NetworkDiagramService.uploadImage(formData)
        if(res) {
          this.$emit('close')
          this.$emit('getNetworkDiagramDetail')
        }
      }
    },

    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.file = files[0];
      this.fileSize = e.target.files[0].size;
      this.fileName = this.file.name;
      let allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
      if (!allowedExtensions.exec(this.file.name)) {
        this.errorMsg = "jpg, jpeg, png 파일만 업로드 가능합니다";
        return false;
      }
      if (this.fileSize > 1024 * 1024 * 20) {
        this.errorMsg = "1개의 이미지 파일만 입력 가능합니다 (최대 20mb)";
        this.$emit("openUnableToUploadModal")
        return false;
      }
      this.errorMsg = "";
    },

  }
}
</script>


<style lang="scss">
    .onchangeFile {
      text-indent: -999px;
    cursor: pointer;
    }
</style>