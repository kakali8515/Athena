<template>
  <div
    class="modal-overlap waitingcompanyapproval actionguidelinemodal z-10"
    
  >
    <div class="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
      <div
        class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current"
      >
        <div class="modal-header flex flex-shrink-0 items-center justify-between p-4 rounded-t-md">
          <h5
            class="text-xl font-medium leading-normal text-gray-800"
            id="exampleModalScrollableLabel"
          >가이드라인</h5>
          <button
            type="button"
            class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
            @click="$store.dispatch('diagnosisManagement/toggleActionGuidelineModal', false)"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body relative">
          <div class="guideline_wrap">
            <!-- <p>{{actionGuidelineList}}</p> -->
            <ul>
              <li class="flex justify-content-between align-center">
                <p>Windows 서버</p>
                <!-- <a href="http://athena-api-dev.dvconsulting.org:4000/api/v1/technical-diagnosis-settings/file-download?file_key=action_guideline&file_name=DBMS 보안가이드라인.pdf" download>Download</a> -->
                <button type="button" class="download_button" @click="downLoadPdf(actionGuidelineList.windows_server)">다운로드</button>
              </li>
              <li class="flex justify-content-between align-center">
                <p>Unix 서버</p>
                <button type="button" class="download_button" @click="downLoadPdf(actionGuidelineList.unix_server)">다운로드</button>
              </li>
              <li class="flex justify-content-between align-center">
                <p>DBMS</p>
                <button type="button" class="download_button" @click="downLoadPdf(actionGuidelineList.dbms)">다운로드</button>
              </li>
              <li class="flex justify-content-between align-center">
                <p>WEB</p>
                <button type="button" class="download_button" @click="downLoadPdf(actionGuidelineList.web)">다운로드</button>
              </li>
              <li class="flex justify-content-between align-center">
                <p>IIS</p>
                <button type="button" class="download_button" @click="downLoadPdf(actionGuidelineList.iis)">다운로드</button>
              </li>
              <li class="flex justify-content-between align-center">
                <p>WAS</p>
                <button type="button" class="download_button" @click="downLoadPdf(actionGuidelineList.was)">다운로드</button>
              </li>
              <li class="flex justify-content-between align-center">
                <p>Network equipment</p>
                <button type="button" class="download_button" @click="downLoadPdf(actionGuidelineList.network_equipment)">다운로드</button>
              </li>
              <li class="flex justify-content-between align-center">
                <p>Security equipment</p>
                <button type="button" class="download_button" @click="downLoadPdf(actionGuidelineList.security_equipment)">다운로드</button>
              </li>
              <li class="flex justify-content-between align-center">
                <p>Windows PC</p>
                <button type="button" class="download_button" @click="downLoadPdf(actionGuidelineList.windows_pc)">다운로드</button>
              </li>
              <li class="flex justify-content-between align-center">
                <p>MAC PC</p>
                <button type="button" class="download_button" @click="downLoadPdf(actionGuidelineList.mac)">다운로드</button>
              </li>
            </ul>
          </div>
        </div>
        <div
          class="modal-footer flex flex-shrink-0 items-center justify-center p-4 rounded-b-md padding"
        ></div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, watch } from '@vue/runtime-core';
import { useStore } from 'vuex';

const store = useStore();
const actionGuidelineList = ref('');
const fileKey = ref('action_guideline');


watch(() => store.state.diagnosisManagement.guideLineList, function(newVal, oldVal){
   actionGuidelineList.value = (newVal) ? store.state.diagnosisManagement.guideLineList : "";
})

const downLoadPdf = (name)=> store.dispatch('diagnosisManagement/downLoadFiles', {fileName : name, key : fileKey.value})


</script>


<style lang="scss">

</style>