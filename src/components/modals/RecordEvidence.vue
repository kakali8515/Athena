<template>
    <div class="modal-overlap waitingcompanyapproval z-10">
  <div class="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
    <div class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
      <div class="modal-header flex flex-shrink-0 items-center justify-between p-4 rounded-t-md">
        <h5 class="text-xl font-medium leading-normal text-gray-800">
          증적 기록
        </h5>
        <button type="button"
          class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
           aria-label="Close" @click="$emit('closeModal', false)"></button>
      </div>
      <div class="modal-body relative">
        <div class="bulletin_modal">
        <p class="head">통제 항목 {{itemNumber}}</p>
            <div class="user_list">
                <div class="flex flex-col">
                    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div class="inline-block min-w-full sm:px-6 lg:px-8">
                        <div class="overflow-hidden border-table">
                            <table class="min-w-full text-center">
                            <thead class="bg-gray-50">
                                <tr>
                                
                                <th scope="col" class="justify-center text-sm font-medium text-gray-900 px-6 py-4">
                                  증적코드
                                </th>
                                <th scope="col" class="justify-center text-sm font-medium text-gray-900 px-6 py-4">
                                  증적명
                                </th>
                               <th scope="col" class="justify-center text-sm font-medium text-gray-900 px-6 py-4">
                                최근업로드
                                </th>
                                
                                </tr>
                            </thead>
                            <tbody>
                                <template v-if="recordList.length > 0">
                                <tr class="bg-white border-b" v-for="(item,index) in recordList" :key="index">
                                
                                <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                   {{item.evidence_code}}
                                </td>
                                <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                   {{item.evidence}}
                                </td>
                                <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                   {{dateformat(item.recent_upload)}}
                                </td>
                                </tr>
                                </template>
                                <template v-else>
                                    <tr>
                                        <td colspan="3" class="text-sm text-gray-900 font-light px-6 py-4 ">
                                   No item
                                </td>
                                    </tr>
                                </template>
                               
                                
                                
                            </tbody>
                            </table>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       </div>
      
    </div>
  </div>
</div>
</template>


<script>
import EvidenceManagement from "@/services/EvidenceManagement";
import moment from "moment";
export default {
  name: 'RecordEvidence', 
  data() {
    return {
        recordList:[],
        documents:[],
        certification:this.$store.state.header.certificate
    }
  },
  props: {
    itemNumber: String,
  },
  created() {
    this.EvidenceManagement = new EvidenceManagement();
  },
  mounted() {
    this.evidenceRecordList();
    this.dateformat();
  },
  methods: {
    close() {
      this.$emit("close");
    },
    evidenceRecordList() {
      this.EvidenceManagement.recordEvidence(
        this.itemNumber,
        this.$store.state.header.certificate,
        this.documents
      )
        .then((res) => {
          if (res.status == 200) {
            this.recordList=res.data.data;
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
  }
}
</script>

<style lang="scss">
       
</style>