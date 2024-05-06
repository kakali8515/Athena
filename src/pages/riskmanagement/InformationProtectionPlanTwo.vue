<template>
  <div class="info_protection">
    <div class="breadcrumb">
      <Breadcrumb link="dashboard" text1="Home" text2="Risk Management" text3="Information Protection Plan" />
    </div>
    <div class="heading flex justify-between align-end">
      <h4>Information Protection Plan</h4>
        <div class="history_wrap">
            <div class="flex items-center mb-4">
                <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                <label for="default-checkbox" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">View Status</label>
            </div>
        </div>
    </div>

    <div class="managmenttable">
        <div class="managmenttable-wrap">
            <div class="managment_main_wrap">
                <div class="select_wrap">
                <span>Asset Classification</span>
                <select>
                    <option>All</option>
                    <option>All</option>
                    <option>All</option>
                    <option>All</option>
                </select>
                </div>
                <div class="select_wrap">
                <span>Asset Classification</span>
                <select>
                    <option>All</option>
                    <option>All</option>
                    <option>All</option>
                    <option>All</option>
                </select>
                <button type="button">Lookup</button>
                </div>
            </div>
            <div class="button">
                <button type="button">Calculation Criteria</button>
            </div>
        </div>
      <div class="tab-style-two">
        <TabWrapper>
            <Tabs title="Implementation diagnosis (initial diagnosis completed -> transition diagnosis)"> 
               
            Tab content 2
            </Tabs>
            <Tabs title="Implementation re-diagnosis (fulfillment diagnosis completed -> implementation diagnosis)"> 
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
        <button type="button" class="gray">Download results</button>
        <button type="button" class="gray">Change at once</button>
      </div>
      <div class="buttons flex justify-end">
        <button type="button">Save</button>
        
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
  name: "InformationProtectionPlanTwo",
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
          name: "분야(Class)",
          id: "no",
          isSortable: true,
          type: "text",
        },
        {
          name: "세부항목번호(Code)",
          id: "inquiry_title",
          isSortable: false,
          type: "text",
        },
        {
          name: "Risk",
          id: "writer_name",
          isSortable: false,
          type: "text",
        },
        {
          name: "Risk value",
          id: "created_date",
          isSortable: true,
          type: "text",
        },
        {
          name: "Protection",
          id: "answer_or_not",
          isSortable: false,
          type: "text",
        },
        {
          name: "Urgency",
          id: "reply_date",
          isSortable: false,
          type: "text",
        },
        {
          name: "Implementation cost",
          id: "reply_date",
          isSortable: true,
          type: "text",
        },
        {
          name: "Implementation difficulty",
          id: "reply_date",
          isSortable: true,
          type: "text",
        },
        {
          name: "Priority Ranking",
          id: "reply_date",
          isSortable: true,
          type: "text",
        },
        {
          name: "Progress result",
          id: "reply_date",
          isSortable: true,
          type: "text",
        },
        {
          name: "Action schedule",
          id: "reply_date",
          isSortable: true,
          type: "text",
        },
        {
          name: "Note",
          id: "reply_date",
          isSortable: true,
          type: "text",
        },
        {
          name: "Manager",
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