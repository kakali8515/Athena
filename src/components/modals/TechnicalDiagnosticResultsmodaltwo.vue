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
          >진단 프로그램</h5>
          <button
            type="button"
            class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
            aria-label="Close"
            @click="$store.dispatch('diagnosisManagement/toggleDiagnosisProgramModal', false)"
          ></button>
        </div>
        <div class="modal-body relative">
          <div class="guideline_wrap">
            <!-- <p>{{diagnosisProgramList}}</p> -->
            <ul>
              <li class="flex justify-content-between align-center">
                <p>Windows 서버</p>
                <button type="button" class="download_button" @click="downLoadZip(diagnosisProgramList.windows_server)">다운로드</button>
              </li>
              <li class="flex justify-content-between align-center">
                <p>Unix 서버</p>
                <button type="button" class="download_button" @click="downLoadZip(diagnosisProgramList.linux)">다운로드</button>
              </li>
              <li class="flex justify-content-between align-center">
                <p>Solaris 서버</p>
                <button type="button" class="download_button" @click="downLoadZip(diagnosisProgramList.solaris)">다운로드</button>
              </li>
              <li class="flex justify-content-between align-center">
                <p>Windows PC</p>
                <button type="button" class="download_button" @click="downLoadZip(diagnosisProgramList.windows_pc)">다운로드</button>
              </li>
              <li class="flex justify-content-between align-center">
                <p>MAC PC</p>
                <button type="button" class="download_button" @click="downLoadZip(diagnosisProgramList.mac_pc)">다운로드</button>
              </li>
              <li class="flex justify-content-between align-center">
                <p>취약점 조치 (Windows PC)</p>
                <button type="button" class="download_button" @click="downLoadZip(diagnosisProgramList.pc_diagnostics)">다운로드</button>
              </li>
              <li class="flex justify-content-between align-center">
                <p>개인정보 검색 </p>
                <button type="button" class="download_button" @click="downLoadZip(diagnosisProgramList.personal_information_retrieval)">다운로드</button>
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
const diagnosisProgramList = ref('');
const fileKey = ref('diagnosis_program');

watch(() => store.state.diagnosisManagement.diagnosisProgramList, function(newVal, oldVal){
   diagnosisProgramList.value = (newVal) ? store.state.diagnosisManagement.diagnosisProgramList : "";
})

const downLoadZip = (name)=> store.dispatch('diagnosisManagement/downLoadFiles', {fileName : name, key : fileKey.value})
</script>


<style lang="scss">

</style>