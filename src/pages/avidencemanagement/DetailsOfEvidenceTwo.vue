<template>
  <div class="info_protection">
    <div class="breadcrumb">
      <Breadcrumb
        link="dashboard"
        text1="Home"
        text2="Evidence management"
        text3="Evidence List"
      />
    </div>
    <div class="heading flex justify-between align-end">
      <h4>View the Details of the Evidence</h4>
      <div class="history_wrap">
        <button type="button">Delete</button>
      </div>
    </div>

    <div class="managmenttable">
      <div class="delete_wrap">
        <p>* in the evidence list Applicable evidence delete.</p>
      </div>
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
    <div class="explenation">
      <div class="details">
        <div class="left">
          <p>Explanation</p>
        </div>
        <div class="right">
          <p>
            Exposure of explanatory text Scroll exposure when out of the
            relevant area
          </p>
        </div>
      </div>
      <div class="details">
        <table
          class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
        >
          <thead
            class="
              text-xs text-gray-700
              uppercase
              bg-gray-50
              dark:bg-gray-700 dark:text-gray-400
            "
          >
            <tr>
              <th scope="col" class="px-6 py-3">Area</th>
              <th scope="col" class="px-6 py-3">Control items</th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td class="px-6 py-4">Management system</td>
              <td class="px-6 py-4">1.1.1</td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td class="px-6 py-4">Management system</td>
              <td class="px-6 py-4">1.1.2</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="extra_wrap">
        <div class="details shortdiv">
          <div class="left">
            <p>Manager</p>
          </div>
          <div class="right">
            <p>Hong Gil Dong, Gilja Kim</p>
          </div>
        </div>
        <div class="select">
          <span>Recent upload history</span>
          <select>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
        </div>
      </div>
    </div>
    <div class="evidence_wrap">
      <div class="spacebar">
        <h4>Preview Exposure</h4>
      </div>
    </div>

    <div class="button_wrap fixed-button-wrap flex justify-between">
      <div class="buttons flex justify-start">
        <button type="button" class="gray">Evidence Download</button>
        <button type="button" class="gray">Evidence Delete History</button>
        <button type="button" class="gray">Evidence File Upload</button>
      </div>

      <div class="buttons flex justify-end">
        <!-- <button type="button">My Revision History</button> -->
        <button type="button">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
import DataTable from "@/components/DataTable.vue";
import { diagnosisSettingCol } from "@/config/TableColData";
import Breadcrumb from "@/components/Breadcrumb.vue";

export default {
  name: "DetailsOfEvidencetwo",
  components: {
    // Tabs,
    // TabWrapper,
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
          name: "Control Area",
          id: "no",
          isSortable: false,
          type: "text",
        },
        {
          name: "Evidence Code ",
          id: "inquiry_title",
          isSortable: false,
          type: "text",
        },
        {
          name: "Evidence Number of People",
          id: "writer_name",
          isSortable: false,
          type: "text",
        },
        {
          name: "Due Diligence",
          id: "created_date",
          isSortable: false,
          type: "text",
        },
        {
          name: "Cycle",
          id: "answer_or_not",
          isSortable: false,
          type: "text",
        },
        {
          name: "Approval",
          id: "reply_date",
          isSortable: false,
          type: "text",
        },
      ],
    };
  },
};
</script>


<style lang="scss">
</style>