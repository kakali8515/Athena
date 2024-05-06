<template>
    <div class="info_protection">
         <div class="breadcrumb">
           <p><a href="#">Home </a><span>></span> diagnosis management<span>></span> technical diagnosis</p>
       </div>
            <div class="heading flex justify-between align-end">
                <h4>Detailed technical diagnosis result (server system)</h4>
                <div class="history_wrap ">
                    <div class="">
                        <button type="button">Evaluation Standard</button> 
                    </div>                                                                                                     
                                 
                </div>
            </div>
             <div class="managmenttable">
                <DataTable
                :HeadersColumn="colData"
                :BodyData="bullietinPostList"
                :rowClickable="true"
                @clickEvent="ShowDetails($event)"
                :Page="page"
                :records="totalItems"
                :options="chunkPage"
                :perPage="limit"
                @clickPaginate="myCallback($event)"
                clickCellIndex="1"
            />
            </div>
            <div class="button_wrap fixed-button-wrap flex justify-between">
                <div class="buttons flex justify-start">
                    <button type="button" class="gray">Upload result report</button>
                    
                </div>
                
            </div>
    </div>

    
</template>


<script>
import DataTable from "@/components/DataTable.vue";
import { diagnosisSettingCol } from "@/config/TableColData";
export default {
  name: "ThreatAnalysisSelection",
  components: { 
    DataTable,
  },
     data() {
    return {
      InquiryList: [],
      page: 1,
      limit: 50,
      chunkPage: { chunk: 5 },
      totalItems: 0,
      colData: [
        {
          name: "Threat code",
          id: "no",
          isSortable: true,
          type: "text",
        },
        {
          name: "Main Category",
          id: "inquiry_title",
          isSortable: true,
          type: "text",
        },
        {
          name: "Middle Class",
          id: "writer_name",
          isSortable: true,
          type: "text",
        },
        {
          name: "Threats",
          id: "created_date",
          isSortable: true,
          type: "text",
        },
        {
          name: "Confidentiality",
          id: "answer_or_not",
          isSortable: true,
          type: "text",
        },
        {
          name: "Integrity",
          id: "reply_date",
          isSortable: true,
          type: "text",
        },
        {
          name: "Availability",
          id: "reply_date",
          isSortable: true,
          type: "text",
        },
        {
          name: "Threat rating",
          id: "reply_date",
          isSortable: true,
          type: "text",
        },
        
      ],
    };
  },

};
</script>


<style lang="scss">
    
</style>