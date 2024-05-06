<template>
  <div class="info_protection">
    <div class="breadcrumb">
      <p><a href="#">Home </a><span>></span> Manager</p>
    </div>
    <div class="heading flex justify-between align-end">
      <h4>Management diagnosis setting</h4>
    </div>

    <div class="managmenttable">
      <div class="tab-style-two">
        <TabWrapper>
          <Tabs title="Diagnosis Management Settings"> Tab 1 Cont </Tabs>
          <Tabs title="Technical Diagnosis Settings">
            <DataTable
              :HeadersColumn="technicaldata"
              :BodyData="rowData"
              :rowClickable="false"
              :Page="1"
              :records="10"
              :options="chunkPage"
              :perPage="10"
              @clickPaginate="myCallback($event)"
              clickCellIndex="2"
            />
          </Tabs>
          <Tabs title="Threat Analysis Settings"> Tab 3 Cont</Tabs>
        </TabWrapper>
      </div>
    </div>
    <div class="button_wrap fixed-button-wrap flex justify-between">
      <div class="buttons flex justify-start">
        <button type="button" class="gray">delete selection</button>
      </div>
      <div class="buttons flex justify-end">
        <!-- <button type="button">My Revision History</button> -->
        <button type="button" class="gray">To save</button>
      </div>
    </div>
  </div>
</template>

<script>
import TabWrapper from "@/components/TabWrapper.vue";
import Tabs from "@/components/Tabs.vue";
import DataTable from "@/components/DataTable.vue";

export default {
  name: "TechnicalDiagnosisSettingsList",
  components: {
    Tabs,
    TabWrapper,
    DataTable,
  },
  data() {
    return {
      chunkPage: { chunk: 5 },
      technicaldata: [
        {
          name: "idx",
          id: "",
          isSortable: false,
          type: "number",
        },
        {
          name: "Category",
          id: "",
          isSortable: false,
          type: "text",
        },
        {
          name: "Class",
          id: "",
          isSortable: false,
          type: "text",
        },
        {
          name: "Code",
          id: "",
          isSortable: false,
          type: "Number",
        },
        {
          name: "Item",
          id: "",
          isSortable: false,
          type: "text",
        },
        {
          name: "Grade",
          id: "",
          isSortable: false,
          type: "text",
        },
        {
          name: "Explain",
          id: "",
          isSortable: false,
          type: "text",
        },
        {
          name: "Risk",
          id: "",
          isSortable: false,
          type: "text",
        },
        {
          name: "Protection",
          id: "",
          isSortable: false,
          type: "text",
        },
        {
          name: "Threat",
          id: "",
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