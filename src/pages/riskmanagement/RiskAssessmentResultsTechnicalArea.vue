<template>
  <div class="info_protection">
    <div class="breadcrumb">
      <Breadcrumb link="dashboard" text1="Home" text2="Risk Management" />
    </div>
    <div class="heading flex justify-between align-end">
      <h4>Risk Assessment Results</h4>
        <div class="history_wrap">
            <button type="button">Calculation Standard</button>
        </div>
    </div>

    <div class="managmenttable">
      <div class="tab-style-two">
        <TabWrapper>
            <Tabs title="Management Area (ISMS)"> 
                Tab content 1
            </Tabs>
            <Tabs title="Technical Area">
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
            </Tabs>
        </TabWrapper>
      </div>
    </div>
    <div class="button_wrap fixed-button-wrap flex justify-between">
      <div class="buttons flex justify-start">
        <button type="button" class="gray">Download Analysis Result</button>
      </div>
      <div class="buttons flex justify-end">
        <!-- <button type="button">My Revision History</button> -->
        
      </div>
    </div>
  </div>
</template>

<script>
import TabWrapper from "@/components/TabWrapper.vue";
import Tabs from "@/components/Tabs.vue";
import DataTable from "@/components/DataTable.vue";
import { diagnosisSettingCol } from "@/config/TableColData";
import Breadcrumb from "@/components/Breadcrumb.vue";


export default {
  name: "RiskAssessmentResultsTechnicalArea",
  components: {
    Tabs,
    TabWrapper,
    DataTable,
    Breadcrumb,
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
          name: "분야(Clss)",
          id: "no",
          isSortable: true,
          type: "text",
        },
        {
          name: "State",
          id: "inquiry_title",
          isSortable: false,
          type: "text",
        },
        {
          name: "세부항목번호(code)",
          id: "writer_name",
          isSortable: false,
          type: "text",
        },
        {
          name: "주요확인사항(Item)",
          id: "created_date",
          isSortable: true,
          type: "text",
        },
        {
          name: "Vulnerability Ranking",
          id: "answer_or_not",
          isSortable: false,
          type: "text",
        },
        {
          name: "Threats",
          id: "reply_date",
          isSortable: false,
          type: "text",
        },
        {
          name: "Threat Rating",
          id: "reply_date",
          isSortable: true,
          type: "text",
        },
        {
          name: "Risk",
          id: "reply_date",
          isSortable: true,
          type: "text",
        },
        {
          name: "Risk value",
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