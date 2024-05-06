<template>
    <div class="modal-overlap waitingcompanyapproval z-10">
  <div class="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
    <div class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
      <div class="modal-header flex flex-shrink-0 items-center justify-between p-4 rounded-t-md">
        <h5 class="text-xl font-medium leading-normal text-gray-800">
          관련문서
        </h5>
        <button type="button"
          class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
          aria-label="Close"
          @click="$emit('closeModal', false)"
        ></button>
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
                            <thead class=" bg-gray-50">
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
                        <div class="show add_row">
                          <label>증적명을 입력해주세요</label>
                          <div class="form_group flex gap-4">
                    <input type="text" v-model="policy_name" />
                    </div>
                </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
       </div>
      <div
        class="modal-footer flex flex-shrink-0 items-center justify-center p-4 rounded-b-md">
        <button type="button" @click="savePolicy"
          class="bordered px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
          data-bs-dismiss="modal">
          저장
        </button>
        <button type="button"
          class="solid px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          @click="$emit('closeModal', false)"  
        >
        닫기
        </button>
      </div>
    </div>
  </div>
</div>
</template>


<script>
import EvidenceManagement from "@/services/EvidenceManagement";
import moment from "moment";
export default {
  name: 'RelatedDocument', 
  props: {
    itemNumber: String,
    documents:String,
    rowId:Number,
    current_status:String,
    operationSet:String,
    statementId:Number
  },
  data() {
    return {
        recordList:[],
        certification:this.$store.state.header.certificate,
        policy_name:''
    }
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
      let doc=[];
      if(this.documents) {
         doc = this.documents.split(",");
      }
      else {
        doc=[];
      }
      this.EvidenceManagement.recordEvidence(
       "",
        this.certification,
        doc
      )
        .then((res) => {
          if (res.status == 200) {
            // console.log(res.data.data)
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
    savePolicy() {
      let policy = "";

      if(this.policy_name=="") {
         policy = this.documents;
      }
      else 
      {
        if(this.documents) {
        policy = this.documents+','+this.policy_name
      }
      else {
        policy = this.policy_name;
      }

      }
      let data = [{
        id: this.rowId,
            operating_statement_id:this.statementId,
            operation_set: this.operationSet,
            current_status: this.current_status,
            related_documents: policy,
            item_number: this.itemNumber,
            certification_name: this.$store.state.header.certificate,

      }];
          this.EvidenceManagement
          .OperatingStatementSave({ operating_statement: data })
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              this.$emit('policyName');
              this.$emit('closeModal', false);
            }
          });
    }
  } 
}
</script>

<style scoped>
 .add_row.show {
    align-items: baseline;
}
</style>