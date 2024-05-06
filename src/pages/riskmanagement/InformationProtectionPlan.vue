<template>
  <div class="info_protection">
    <div class="breadcrumb">
      <Breadcrumb
        link="dashboard"
        text1="Home"
        text2="위험관리"
        text3="정보보호계획"
      />
    </div>
    <div class="heading flex justify-between item-center">
      <h4>정보보호계획</h4>
      <div class="history_wrap">
        <div class="flex items-center">
          <input
            id="default-checkbox"
            type="checkbox"
            value=""
            checked
            @click="hideStatus"
            class="
              w-4
              h-4
              text-blue-600
              bg-gray-100
              rounded
              border-gray-300
              dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600
            "
          />
          <label
            for="default-checkbox"
            class="
              ml-2
              text-sm
              font-medium
              text-gray-900
              dark:text-gray-300
              checkbox-element
            "
            >현황 보기</label
          >
        </div>
      </div>
    </div>

    <div class="managmenttable">
      <div class="managmenttable-wrap">
        <div class="managment_main_wrap">
          <div class="select_wrap">
            <span>자산분류</span>
            <select v-model="asset_class">
              <option value="">전체</option>
              <option v-for="(list, i) in classList" :key="i">
                {{ list }}
              </option>
            </select>
          </div>
          <div class="select_wrap">
            <span>조치현황</span>
            <select v-model="action_status">
              <option value="">전체</option>
              <option value="risk_acceptance">위험수용</option>
              <option value="action_to_be_taken">조치예정</option>
              <option value="completed">조치완료</option>
            </select>
            <button @click="searchData" type="button">조회</button>
          </div>
        </div>
        <div class="button">
          <button type="button" @click="openCalculationModal">선정기준</button>
        </div>
      </div>
      <div class="tab-style-two">
        <TabWrapper @getResponseTitle="getTitle($event)">
          <Tabs title="관리영역 ISMS)">
            <SortingDropdown
              :obj="riskInfoManagementAreaFilterData"
              @selectedCol="selectedCol"
              @selectedOrd="selectedOrd"
            />
            <div class="datatable_wrap_new protection_table">
              <div class="tab-content" id="tabs-tabContent">
                <div
                  class="tab-pane fade show active"
                  id="tabs-one"
                  role="tabpanel"
                  aria-labelledby="tabs-one-tab"
                >
                  <div class="flex flex-col">
                    <div class="overflow-x-auto protection_table">
                      <div class="inline-block min-w-full">
                        <div class="overflow-hidden">
                          <table class="min-w-full text-center">
                            <thead class="bg-gray-50">
                              <tr>
                                <th
                                  scope="col"
                                  class="
                                    justify-center
                                    text-sm
                                    font-medium
                                    text-gray-900
                                    px-6
                                    py-4
                                  "
                                >
                                  <div class="flex items-center justify-center">
                                    <input
                                      id="default-checkbox"
                                      type="checkbox"
                                      value=""
                                      class="
                                        w-4
                                        h-4
                                        text-blue-600
                                        bg-gray-100
                                        rounded
                                        border-gray-300
                                        dark:ring-offset-gray-800
                                        dark:bg-gray-700
                                        dark:border-gray-600
                                      "
                                      @click="selectAll"
                                      v-model="allSelected"
                                      :checked="
                                        selectedManagement.length ==
                                        managementAreaList.length
                                      "
                                    />
                                  </div>
                                </th>
                                <template
                                  v-for="(item, index) in colData"
                                  :key="index"
                                >
                                  <template v-if="index == 2">
                                    <th
                                      v-show="isHideStatus"
                                      scope="col"
                                      class="
                                        text-sm
                                        font-medium
                                        text-gray-900
                                        px-6
                                        py-4
                                      "
                                    >
                                      <div
                                        :class="`${
                                          item.isSortable ? 'sortable-cell' : ''
                                        }`"
                                      >
                                        {{ item.name }}
                                        <img
                                          src="@/assets/icon/DownSquare.svg"
                                          v-if="item.isSortable"
                                        />
                                      </div>
                                    </th>
                                  </template>
                                  <template v-else>
                                    <th
                                      scope="col"
                                      class="
                                        text-sm
                                        font-medium
                                        text-gray-900
                                        px-6
                                        py-4
                                      "
                                    >
                                      <div
                                        :class="`${
                                          item.isSortable ? 'sortable-cell' : ''
                                        }`"
                                      >
                                        {{ item.name }}
                                        <img
                                          src="@/assets/icon/DownSquare.svg"
                                          v-if="item.isSortable"
                                        />
                                      </div>
                                    </th>
                                  </template>
                                </template>
                              </tr>
                            </thead>
                            <tbody>
                              <tr
                                v-for="(item, e) in managementAreaList"
                                :key="e"
                              >
                                <td
                                  class="
                                    text-sm text-gray-900
                                    font-light
                                    px-6
                                    py-4
                                  "
                                >
                                  <div class="flex items-center">
                                    <input
                                      id="default-checkbox"
                                      type="checkbox"
                                      class="
                                        w-4
                                        h-4
                                        text-blue-600
                                        bg-gray-100
                                        rounded
                                        border-gray-300
                                        dark:ring-offset-gray-800
                                        dark:bg-gray-700
                                        dark:border-gray-600
                                      "
                                      v-model="selectedItem"
                                      @change="selectSingle"
                                      :value="item.evaluation_id"
                                    />
                                  </div>
                                </td>
                                <td
                                  class="
                                    px-6
                                    py-4
                                    text-sm
                                    font-medium
                                    text-gray-900
                                  "
                                >
                                  {{ item.control_area }}
                                </td>
                                <td
                                  class="
                                    px-6
                                    py-4
                                    text-sm
                                    font-medium
                                    text-gray-900
                                  "
                                >
                                  {{ item.inspection_item }}
                                </td>
                                <td
                                  v-if="isHideStatus"
                                  class="
                                    px-6
                                    py-4
                                    text-sm
                                    font-medium
                                    text-gray-900
                                  "
                                >
                                  {{ item.explain }}
                                </td>
                                <td
                                  class="
                                    px-6
                                    py-4
                                    text-sm
                                    font-medium
                                    text-gray-900
                                  "
                                >
                                  {{ item.dangerous_content }}
                                </td>
                                <td
                                  class="
                                    px-6
                                    py-4
                                    text-sm
                                    font-medium
                                    text-gray-900
                                  "
                                >
                                  {{ item.risk }}
                                </td>
                                <td
                                  class="
                                    px-6
                                    py-4
                                    text-sm
                                    font-medium
                                    text-gray-900
                                  "
                                >
                                  {{ item.protection_measures }}
                                </td>
                                <td
                                  class="
                                    px-6
                                    py-4
                                    text-sm
                                    font-medium
                                    text-gray-900
                                  "
                                >
                                  {{ item.urgency }}
                                </td>
                                <td
                                  class="
                                    px-6
                                    py-4
                                    text-sm
                                    font-medium
                                    text-gray-900
                                  "
                                >
                                  <select
                                    @change="
                                      getUpdateManagementData(
                                        $event,
                                        'implementation_cost',
                                        item.evaluation_id
                                      )
                                    "
                                  >
                                    <option
                                      v-for="(cost, index) in costList"
                                      :key="index"
                                      :selected="
                                        cost.id == item.implementation_cost
                                      "
                                      :value="cost.id"
                                    >
                                      {{ cost.value }}
                                    </option>
                                  </select>
                                </td>
                                <td
                                  class="
                                    px-6
                                    py-4
                                    text-sm
                                    font-medium
                                    text-gray-900
                                  "
                                >
                                  <select
                                    @change="
                                      getUpdateManagementData(
                                        $event,
                                        'implementation_difficulty',
                                        item.evaluation_id
                                      )
                                    "
                                  >
                                    <option
                                      v-for="(
                                        difficult, index
                                      ) in difficultyList"
                                      :key="index"
                                      :selected="
                                        difficult.id ==
                                        item.implementation_difficulty
                                      "
                                      :value="difficult.id"
                                    >
                                      {{ difficult.value }}
                                    </option>
                                  </select>
                                </td>
                                <td
                                  class="
                                    px-6
                                    py-4
                                    text-sm
                                    font-medium
                                    text-gray-900
                                  "
                                >
                                  {{ item.priorityRankingText }}
                                </td>
                                <td
                                  class="
                                    px-6
                                    py-4
                                    text-sm
                                    font-medium
                                    text-gray-900
                                  "
                                >
                                  <select
                                    @change="
                                      getUpdateManagementData(
                                        $event,
                                        'progressResult',
                                        item.evaluation_id
                                      )
                                    "
                                    :class="
                                      item.progressResult ==
                                      'action_to_be_taken'
                                        ? 'action-taken'
                                        : item.progressResult ==
                                          'risk_acceptance'
                                        ? 'risk-acceptance'
                                        : item.progressResult == 'completed'
                                        ? 'action-completed'
                                        : ''
                                    "
                                    :id="'progressResult' + item.evaluation_id"
                                  >
                                    <option
                                      value="null"
                                      disabled
                                      :selected="item.progressResult == null"
                                    ></option>
                                    <option
                                      :selected="
                                        item.progressResult == 'risk_acceptance'
                                      "
                                      value="risk_acceptance"
                                    >
                                      위험수용
                                    </option>
                                    <option
                                      :selected="
                                        item.progressResult ==
                                        'action_to_be_taken'
                                      "
                                      value="action_to_be_taken"
                                    >
                                      조치예정
                                    </option>
                                    <option
                                      :selected="
                                        item.progressResult == 'completed'
                                      "
                                      value="completed"
                                    >
                                      조치완료
                                    </option>
                                  </select>
                                </td>
                                <td
                                  class="
                                    px-6
                                    py-4
                                    text-sm
                                    font-medium
                                    text-gray-900
                                  "
                                >
                                  <!-- <Datepicker
                                  @update:modelValue="handleDate"
                                    type="date"
                                    :value="dateformat(item.actionSchedule)"
                                    :enableTimePicker="false"
                                    placeholder="선택"
                                    format="yyyy-MM-dd"
                                    :minDate="new Date()"
                                    locale="ko"
                                    cancelText="취소"
                                    selectText="선택"
                                  /> -->
                                  <input
                                    @change="
                                      getUpdateManagementData(
                                        $event,
                                        'actionSchedule',
                                        item.evaluation_id
                                      )
                                    "
                                    type="date"
                                    :data-date="
                                      item.actionSchedule
                                        ? dateformat(item.actionSchedule)
                                        : 'YYYY-MM-DD'
                                    "
                                    data-date-format="YYYY MM DD"
                                    :value="dateformat(item.actionSchedule)"
                                  />
                                </td>
                                <td
                                  class="
                                    px-6
                                    py-4
                                    text-sm
                                    font-medium
                                    text-gray-900
                                  "
                                >
                                  <input
                                    :value="item.note"
                                    type="text"
                                    @change="
                                      getUpdateManagementData(
                                        $event,
                                        'note',
                                        item.evaluation_id
                                      )
                                    "
                                  />
                                </td>
                                <td
                                  class="
                                    px-6
                                    py-4
                                    text-sm
                                    font-medium
                                    text-gray-900
                                  "
                                >
                                  <p v-if="item.manager">
                                    <span
                                      v-for="(manager, index) in item.manager
                                        .list"
                                      :key="index"
                                      >{{ manager.name
                                      }}<span
                                        v-if="
                                          index + 1 < item.manager.list.length
                                        "
                                        >,
                                      </span></span
                                    >
                                  </p>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- <Pagination /> -->
                  <template v-if="managementAreaList.length > 0">
                    <pagination
                      v-model="page2"
                      :records="managrecords"
                      :per-page="limit2"
                      @paginate="myCallback2"
                    />
                  </template>
                </div>
              </div>
            </div>
          </Tabs>
          <Tabs title="기술영역">
            <SortingDropdown
              :obj="riskInfoTechnicalAreaFilterData"
              @selectedCol="selectedTechCol"
              @selectedOrd="selectedTechOrd"
            />
            <div class="datatable_wrap_new protection_table">
              <div class="tab-content" id="tabs-tabContent">
                <div
                  class="tab-pane fade show active"
                  id="tabs-one"
                  role="tabpanel"
                  aria-labelledby="tabs-one-tab"
                >
                  <div class="flex flex-col">
                    <div class="overflow-x-auto protection_table">
                      <div class="inline-block min-w-full">
                        <div class="overflow-hidden">
                          <table class="min-w-full text-center">
                            <thead class="bg-gray-50">
                              <tr>
                                <th
                                  scope="col"
                                  class="
                                    justify-center
                                    text-sm
                                    font-medium
                                    text-gray-900
                                    px-6
                                    py-4
                                  "
                                >
                                  <div class="flex items-center">
                                    <input
                                      id="default-checkbox"
                                      type="checkbox"
                                      value=""
                                      class="
                                        w-4
                                        h-4
                                        text-blue-600
                                        bg-gray-100
                                        rounded
                                        border-gray-300
                                        dark:ring-offset-gray-800
                                        dark:bg-gray-700
                                        dark:border-gray-600
                                      "
                                      @click="selectTechnicalAll"
                                      v-model="allTechnicalSelected"
                                      :checked="
                                        selectedTechnical.length ==
                                        technicalAreaList.length
                                      "
                                    />
                                  </div>
                                </th>
                                <template
                                  v-for="(item, index) in techColData"
                                  :key="index"
                                >
                                  <template v-if="index == 2">
                                    <th
                                      v-show="isHideStatus"
                                      scope="col"
                                      class="
                                        text-sm
                                        font-medium
                                        text-gray-900
                                        px-6
                                        py-4
                                      "
                                    >
                                      <div
                                        :class="`${
                                          item.isSortable ? 'sortable-cell' : ''
                                        }`"
                                      >
                                        {{ item.name }}
                                        <img
                                          src="@/assets/icon/DownSquare.svg"
                                          v-if="item.isSortable"
                                        />
                                      </div>
                                    </th>
                                  </template>
                                  <template v-else>
                                    <th
                                      scope="col"
                                      class="
                                        text-sm
                                        font-medium
                                        text-gray-900
                                        px-6
                                        py-4
                                      "
                                    >
                                      <div
                                        :class="`${
                                          item.isSortable ? 'sortable-cell' : ''
                                        }`"
                                      >
                                        {{ item.name }}
                                        <img
                                          src="@/assets/icon/DownSquare.svg"
                                          v-if="item.isSortable"
                                        />
                                      </div>
                                    </th>
                                  </template>
                                </template>
                              </tr>
                            </thead>
                            <tbody>
                              <tr
                                v-for="(item2, e) in technicalAreaList"
                                :key="e"
                              >
                                <td
                                  class="
                                    text-sm text-gray-900
                                    font-light
                                    px-6
                                    py-4
                                  "
                                >
                                  <div class="flex items-center justify-center">
                                    <input
                                      id="default-checkbox"
                                      type="checkbox"
                                      class="
                                        w-4
                                        h-4
                                        text-blue-600
                                        bg-gray-100
                                        rounded
                                        border-gray-300
                                        dark:ring-offset-gray-800
                                        dark:bg-gray-700
                                        dark:border-gray-600
                                      "
                                      v-model="selectedTechnicalItem"
                                      @change="selectTechnicalSingle"
                                      :value="item2.tech_evaluation_id"
                                    />
                                  </div>
                                </td>
                                <td
                                  class="
                                    px-6
                                    py-4
                                    text-sm
                                    font-medium
                                    text-gray-900
                                  "
                                >
                                  {{ item2.control_area }}
                                </td>
                                <td
                                  class="
                                    px-6
                                    py-4
                                    text-sm
                                    font-medium
                                    text-gray-900
                                  "
                                >
                                  {{ item2.inspection_item }}
                                </td>
                                <td
                                  v-if="isHideStatus"
                                  class="
                                    px-6
                                    py-4
                                    text-sm
                                    font-medium
                                    text-gray-900
                                  "
                                >
                                  {{ item2.explian }}
                                </td>
                                <td
                                  class="
                                    px-6
                                    py-4
                                    text-sm
                                    font-medium
                                    text-gray-900
                                  "
                                >
                                  {{ item2.dangerous_content }}
                                </td>
                                <td
                                  class="
                                    px-6
                                    py-4
                                    text-sm
                                    font-medium
                                    text-gray-900
                                  "
                                >
                                  {{ item2.risk }}
                                </td>
                                <td
                                  class="
                                    px-6
                                    py-4
                                    text-sm
                                    font-medium
                                    text-gray-900
                                  "
                                >
                                  {{ item2.protection_measures }}
                                </td>
                                <td
                                  class="
                                    px-6
                                    py-4
                                    text-sm
                                    font-medium
                                    text-gray-900
                                  "
                                >
                                  {{ item2.urgency }}
                                </td>
                                <td
                                  class="
                                    px-6
                                    py-4
                                    text-sm
                                    font-medium
                                    text-gray-900
                                  "
                                >
                                  <select
                                    @change="
                                      getUpdateTechnicalData(
                                        $event,
                                        'implementation_cost',
                                        item2.tech_evaluation_id
                                      )
                                    "
                                  >
                                    <option
                                      v-for="(cost, index) in costList"
                                      :key="index"
                                      :selected="
                                        cost.id == item2.implementation_cost
                                      "
                                      :value="cost.id"
                                    >
                                      {{ cost.value }}
                                    </option>
                                  </select>
                                </td>
                                <td
                                  class="
                                    px-6
                                    py-4
                                    text-sm
                                    font-medium
                                    text-gray-900
                                  "
                                >
                                  <select
                                    @change="
                                      getUpdateTechnicalData(
                                        $event,
                                        'implementation_difficulty',
                                        item2.tech_evaluation_id
                                      )
                                    "
                                  >
                                    <option
                                      v-for="(
                                        difficult, index
                                      ) in difficultyList"
                                      :key="index"
                                      :selected="
                                        difficult.id ==
                                        item2.implementation_difficulty
                                      "
                                      :value="difficult.id"
                                    >
                                      {{ difficult.value }}
                                    </option>
                                  </select>
                                </td>
                                <td
                                  class="
                                    px-6
                                    py-4
                                    text-sm
                                    font-medium
                                    text-gray-900
                                  "
                                >
                                  {{ item2.priorityRankingText }}
                                </td>
                                <td
                                  class="
                                    px-6
                                    py-4
                                    text-sm
                                    font-medium
                                    text-gray-900
                                  "
                                >
                                  <select
                                    @change="
                                      getUpdateTechnicalData(
                                        $event,
                                        'progressResult',
                                        item2.tech_evaluation_id
                                      )
                                    "
                                    :class="
                                      item2.progressResult ==
                                      'action_to_be_taken'
                                        ? 'action-taken'
                                        : item2.progressResult ==
                                          'risk_acceptance'
                                        ? 'risk-acceptance'
                                        : item2.progressResult == 'completed'
                                        ? 'action-completed'
                                        : ''
                                    "
                                    :id="
                                      'techprogressResult' +
                                      item2.tech_evaluation_id
                                    "
                                  >
                                    <option
                                      value="null"
                                      disabled
                                      :selected="item2.progressResult == null"
                                    ></option>
                                    <option
                                      :selected="
                                        item2.progressResult ==
                                        'risk_acceptance'
                                      "
                                      value="risk_acceptance"
                                    >
                                      위험수용
                                    </option>
                                    <option
                                      :selected="
                                        item2.progressResult ==
                                        'action_to_be_taken'
                                      "
                                      value="action_to_be_taken"
                                    >
                                      조치예정
                                    </option>
                                    <option
                                      :selected="
                                        item2.progressResult == 'completed'
                                      "
                                      value="completed"
                                    >
                                      조치완료
                                    </option>
                                  </select>
                                </td>
                                <td
                                  class="
                                    px-6
                                    py-4
                                    text-sm
                                    font-medium
                                    text-gray-900
                                  "
                                >
                                  <input
                                    @change="
                                      getUpdateTechnicalData(
                                        $event,
                                        'actionSchedule',
                                        item2.tech_evaluation_id
                                      )
                                    "
                                    type="date"
                                    :data-date="
                                      item2.actionSchedule
                                        ? dateformat(item2.actionSchedule)
                                        : 'YYYY-MM-DD'
                                    "
                                    data-date-format="YYYY MM DD"
                                    :value="dateformat(item2.actionSchedule)"
                                  />
                                </td>
                                <td
                                  class="
                                    px-6
                                    py-4
                                    text-sm
                                    font-medium
                                    text-gray-900
                                  "
                                >
                                  <input
                                    :value="item2.note"
                                    type="text"
                                    @change="
                                      getUpdateTechnicalData(
                                        $event,
                                        'note',
                                        item2.tech_evaluation_id
                                      )
                                    "
                                  />
                                </td>
                                <td
                                  class="
                                    px-6
                                    py-4
                                    text-sm
                                    font-medium
                                    text-gray-900
                                  "
                                >
                                  <p v-if="item2.manager">
                                    <span
                                      v-for="(manager, index) in item2.manager
                                        .list"
                                      :key="index"
                                      >{{ manager.name
                                      }}<span
                                        v-if="
                                          index + 1 < item2.manager.list.length
                                        "
                                        >,
                                      </span></span
                                    >
                                  </p>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- <Pagination /> -->
                  <template v-if="technicalAreaList.length > 0">
                    <pagination
                      v-model="page"
                      :records="records"
                      :per-page="limit"
                      @paginate="myCallback"
                    />
                  </template>
                </div>
              </div>
            </div>
          </Tabs>
        </TabWrapper>
      </div>
    </div>
    <div class="button_wrap fixed-button-wrap flex justify-between">
      <div class="buttons flex justify-start">
        <button @click="downloadResult" type="button" class="gray">
          결과 다운로드
        </button>
        <button
          v-if="
            permission == 'edit' ||
            this.$store.state.signin.is_user_admin == 'y'
          "
          @click="showModal"
          :class="{
            no_cursor:
              selectedManagement.length == 0 && selectedTechnical.length == 0,
          }"
          :disabled="
            selectedManagement.length == 0 && selectedTechnical.length == 0
          "
          type="button"
          class="gray"
        >
          선택 일괄 변경하기
        </button>
      </div>
      <div class="buttons flex justify-end">
        <button
          v-if="
            permission == 'edit' ||
            this.$store.state.signin.is_user_admin == 'y'
          "
          :class="{
            no_cursor:
              manualManageMentData.length == 0 &&
              manualTechnicalData.length == 0 &&
              implementation_cost == '',
          }"
          :disabled="
            manualManageMentData.length == 0 &&
            manualTechnicalData.length == 0 &&
            implementation_cost == ''
          "
          @click="SaveChangeData"
          type="button"
        >
          저장
        </button>
      </div>
    </div>
  </div>
  <ChangeOnce
    v-if="changeModal"
    @close="closeModal"
    :cost="costList"
    :difficulty="difficultyList"
    :manager="managerList"
    :tabType="type"
    @impCost="getCost($event)"
    @impDifficulty="getDifficulty($event)"
    @riskProgress="riskProgressResult($event)"
    @schedule="getSchedule($event)"
    @managerData="getModifiedManagerData($event)"
    @saveData="saveData"
  />
  <CalculationStandardmodal
    v-if="isCalculation"
    @close="closeCalculationStandard"
  />
</template>

<script>
import TabWrapper from "@/components/TabWrapper.vue";
import Tabs from "@/components/Tabs.vue";
import DataTable from "@/components/DataTable.vue";
import {
  InformationProtectionPlanManageColData,
  InformationProtectionPlanTechColData,
} from "@/config/TableColData";
import Breadcrumb from "@/components/Breadcrumb.vue";
import RiskMgmntService from "@/services/RiskMgmntService";
import ChangeOnce from "@/components/modals/ChangeOnce.vue";
import moment from "moment";
import Toast from "@/alert/alert.js";
import CalculationStandardmodal from "@/components/modals/CalculationCriteriamodal.vue";
import {
  riskInfoManagementAreaFilterData,
  riskInfoTechnicalAreaFilterData,
} from "@/config/SortingDropdownData";
import SortingDropdown from "@/components/SortingDropdown.vue";


export default {
  name: "InformationProtectionPlan",
  components: {
    Tabs,
    TabWrapper,
    DataTable,
    Breadcrumb,
    ChangeOnce,
    CalculationStandardmodal,
    SortingDropdown,
  },
  data() {
    return {
      technicalAreaList: [],
      managementAreaList: [],
      action_status: "",
      asset_class: "",
      page: 1,
      limit: 50,
      chunkPage: { chunk: 5 },
      records: 0,
      colData: InformationProtectionPlanManageColData,
      techColData: InformationProtectionPlanTechColData,
      managrecords: 0,
      page2: 1,
      limit2: 50,
      costList: [],
      difficultyList: [],
      classList: [],
      managerList: [],
      type: "information_plan_management",
      changeModal: false,
      allSelected: false,
      selectedItem: [],
      selectedManagement: [],
      allTechnicalSelected: false,
      selectedTechnicalItem: [],
      selectedTechnical: [],
      implementation_cost: "",
      implementation_difficulty: "",
      risk_progress_result: "",
      action_schedule: "",
      changeManagementData: [],
      changeTechnicalData: [],
      isHideStatus: true,
      managerData: [],
      isChangeData: true,
      manualManageMentData: [],
      manualTechnicalData: [],
      isCalculation: false,
      selectedProgress: "",
      riskInfoManagementAreaFilterData: riskInfoManagementAreaFilterData,
      riskInfoTechnicalAreaFilterData: riskInfoTechnicalAreaFilterData,
      sort_by: "",
      sortOrder: "",
      sort_by_tech: "",
      sortOrderTech: ""
    };
  },
  created() {
    this.riskMgmntService = new RiskMgmntService();
  },
  computed: {
    permission() {
      return this.$store.state.sideBar.permission.information_protection_plan;
    },
  },
  mounted() {
    this.getTechnicalData();
    this.getManagementData();
    this.getCostList();
    this.getDifficultyList();
    this.getClassList();
    this.getManagerList();
    this.dateformat();
  },
  watch: {
    "$store.state.header.certificate": function (newVal, oldVal) {
      if (newVal != oldVal && newVal) {
        this.getTechnicalData();
        this.getManagementData();
        this.getClassList();
      }
    },
  },
  methods: {
    hideStatus(event) {
      const click = event.target.checked;
      if (click) {
        this.isHideStatus = true;
      } else {
        this.isHideStatus = false;
      }
    },
    showModal() {
      this.changeModal = true;
    },
    closeModal() {
      this.changeModal = false;
    },
    searchData() {
      this.getTechnicalData();
      this.getManagementData();
    },

    selectedTechCol(value) {
      this.sort_by_tech = value;
      this.getTechnicalData();
    },
    selectedTechOrd(value) {
      this.sortOrderTech = value;
      this.getTechnicalData();
    },

    getTechnicalData() {
      this.riskMgmntService
        .infoProtectionTechnicalArea(
          this.page,
          this.limit,
          this.$store.state.header.certificate,
          this.asset_class,
          this.action_status,
          this.sort_by_tech,
          this.sortOrderTech
        )
        .then((res) => {
          if (res.status == 200) {
            this.technicalAreaList = res.data.technical_area_list;
            this.records = res.data.total_records;
            // console.log(res.data)
          }
        });
    },

    selectedCol(value) {
      this.sort_by = value;
      this.getManagementData();
    },
    selectedOrd(value) {
      this.sortOrder = value;
      this.getManagementData();
    },

    getManagementData() {
      this.riskMgmntService
        .infoProtectionManagementArea(
          this.page2,
          this.limit2,
          this.$store.state.header.certificate,
          this.asset_class,
          this.action_status,
          this.sort_by,
          this.sortOrder
        )
        .then((res) => {
          if (res.status == 200) {
            this.managementAreaList = res.data.management_area_list;
            // console.log("managementAreaList", this.managementAreaList);
            this.managrecords = res.data.total_records;
          }
        });
    },

    getCostList() {
      this.riskMgmntService.costList().then((res) => {
        if (res.status == 200) {
          this.costList = res.data.implementation_cost_list;
          // console.log("this.costList", this.costList);
          // this.costList.forEach((item, index)=>{
          //   if(item.is_default == 'y'){
          //     this.costList.splice(index, 1)
          //     this.costList.unshift(item)
          //   }
          // })
        }
      });
    },

    getDifficultyList() {
      this.riskMgmntService.difficultyList().then((res) => {
        if (res.status == 200) {
          this.difficultyList = res.data.implementation_difficulty_list;
        }
      });
    },

    getClassList() {
      this.riskMgmntService
        .classList(this.$store.state.header.certificate)
        .then((res) => {
          if (res.status == 200) {
            this.classList = res.data.class_list;
          }
        });
    },

    getManagerList() {
      this.riskMgmntService.managerList().then((res) => {
        if (res.status == 200) {
          this.managerList = res.data.managerlist;
        }
      });
    },

    downloadManagementResult() {
      this.riskMgmntService
        .infoProtectionManagementDownload(
          this.type,
          this.$store.state.header.certificate,
          this.sort_by,
          this.sortOrder
        )
        .then((res) => {
          if (res.status == 200) {
            const url = `${process.env.VUE_APP_API_BASE_URL}/download/file?url=${res.data.path}&type=unlink`; // later required base url to dynamic
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "ManagementDownload");
            document.body.appendChild(link);
            link.click();
          }
          else if (res.response.status == 401) {
            Toast.fire({ title: res.response.data.error });
          }
          else{
            return;
          }
        });
    },

    downloadTechnicalResult() {
      this.riskMgmntService
        .infoProtectionTechnicalDownload(
          this.type,
          this.$store.state.header.certificate,
          this.sort_by_tech,
          this.sortOrderTech
        )
        .then((res) => {
          if (res.status == 200) {
            const url = `${process.env.VUE_APP_API_BASE_URL}/download/file?url=${res.data.path}&type=unlink`; // later required base url to dynamic
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "TechnicalDownload");
            document.body.appendChild(link);
            link.click();
          }
          else if (res.response.status == 401) {
            Toast.fire({ title: res.response.data.error });
          }
          else{
            return;
          }
        });
    },

    downloadResult() {
      if (this.type == "information_plan_management") {
        this.downloadManagementResult();
      }
      if (this.type == "information_plan_technical") {
        this.downloadTechnicalResult();
      }
    },

    getTitle(e) {
      if (e == "관리영역 ISMS)") {
        this.type = "information_plan_management";
        this.selectedTechnicalItem = [];
        this.selectedTechnical = [];
      }
      if (e == "기술영역") {
        this.type = "information_plan_technical";
        this.selectedItem = [];
        this.selectedManagement = [];
      }
    },

    // all select check box
    selectAll() {
      if (!this.allSelected) {
        const selected = this.managementAreaList.map((u) => u.evaluation_id);
        this.selectedItem = selected;
        this.selectedManagement = this.managementAreaList.map((u) => {
          return u.evaluation_id;
        });
        // this.manualManageMentData=this.managementAreaList.map((u) => {
        //   return u;
        // });
      } else {
        this.selectedItem = [];
        this.selectedManagement = [];
        this.manualManageMentData = [];
      }
      // console.log(this.selectedManagement);
    },

    // checkbox select event
    selectSingle(event) {
      const id = event.target.value;
      const click = event.target.checked;
      this.allSelected = false;
      const obj = this.managementAreaList.find((x) => x.evaluation_id == id);
      if (click) {
        this.selectedManagement.push(obj.evaluation_id);
        // this.manualManageMentData.push(obj);
        // this.selectedItem.push(obj.evaluation_id);
      } else {
        this.selectedManagement.splice(
          this.selectedManagement.indexOf(Number(obj.evaluation_id)),
          1
        );
        //  this.manualManageMentData.splice(this.manualManageMentData.indexOf(obj), 1);
        //  this.selectedItem.splice(this.selectedItem.indexOf(Number(obj.evaluation_id)), 1);
      }
      // console.log(this.manualManageMentData);
    },

    selectTechnicalAll() {
      if (!this.allTechnicalSelected) {
        const selected = this.technicalAreaList.map(
          (u) => u.tech_evaluation_id
        );
        this.selectedTechnicalItem = selected;
        this.selectedTechnical = this.technicalAreaList.map((u) => {
          return u.tech_evaluation_id;
        });
        // this.manualTechnicalData = this.technicalAreaList.map((u) => {
        //   return u;
        // });
      } else {
        this.selectedTechnicalItem = [];
        this.selectedTechnical = [];
        this.manualTechnicalData = [];
      }
      // console.log(this.selectedTechnical);
    },

    selectTechnicalSingle(event) {
      const id = event.target.value;
      const click = event.target.checked;
      this.allTechnicalSelected = false;
      const obj = this.technicalAreaList.find(
        (x) => x.tech_evaluation_id == id
      );
      if (click) {
        this.selectedTechnical.push(obj.tech_evaluation_id);
        // this.manualTechnicalData.push(obj);
        // this.selectedTechnicalItem.push(obj.tech_evaluation_id);
      } else {
        this.selectedTechnical.splice(
          this.selectedTechnical.indexOf(obj.tech_evaluation_id),
          1
        );
        // this.manualTechnicalData.splice(
        //   this.manualTechnicalData.indexOf(obj),
        //   1
        // );
        //  this.selectedTechnicalItem.splice(this.selectedTechnicalItem.indexOf(Number(obj.tech_evaluation_id)), 1);
      }
      // console.log(this.manualTechnicalData);
    },

    getCost(e) {
      this.implementation_cost = e;
      this.isChangeData = false;
    },
    getDifficulty(e) {
      this.implementation_difficulty = e;
      this.isChangeData = false;
    },
    riskProgressResult(e) {
      this.risk_progress_result = e;
      this.isChangeData = false;
    },
    getSchedule(e) {
      this.action_schedule = e;
      this.isChangeData = false;
    },

    getModifiedManagerData(e) {
      this.managerData = e;
      this.isChangeData = false;
    },

    saveData() {
      this.SaveChangeData();
    },

    SaveChangeData() {
      if (this.type == "information_plan_management") {
        this.saveManagementData();
      }
      if (this.type == "information_plan_technical") {
        this.saveTechnicalData();
      }
    },

    getUpdateManagementData(event, filed_name, id) {
      const obj = this.managementAreaList.find((x) => x.evaluation_id == id);

      if (this.manualManageMentData.length > 0) {
        let checkId = this.manualManageMentData.find(function (item) {
          return item.evaluation_id == id;
        });
        if (checkId) {
          checkId[filed_name] = event.target.value;
        } else {
          this.manualManageMentData.push(obj);
          let checkId = this.manualManageMentData.find(function (item) {
            return item.evaluation_id == id;
          });
          if (checkId) {
            checkId[filed_name] = event.target.value;
          }
        }
      } else {
        this.manualManageMentData.push(obj);
        let checkId = this.manualManageMentData.find(function (item) {
          return item.evaluation_id == id;
        });
        if (checkId) {
          checkId[filed_name] = event.target.value;
        }
      }
      // this.manualManageMentData.forEach((item) => {
      //   console.log(item);
      //   if (item.evaluation_id == id) {
      //     this.selectedProgress = item.progressResult;
      //   }
      // });
      document.getElementById(event.target.id).className = "";
      if (event.target.value == "risk_acceptance") {
        document.getElementById(event.target.id).className = "risk-acceptance";
      }
      if (event.target.value == "completed") {
        document.getElementById(event.target.id).className = "action-completed";
      }
      if (event.target.value == "action_to_be_taken") {
        document.getElementById(event.target.id).className = "action-taken";
      }
    },

    saveManagementData() {
      if (this.isChangeData == true) {
        for (let i = 0; i < this.manualManageMentData.length; i++) {
          this.changeManagementData.push({
            evaluation_id: this.manualManageMentData[i].evaluation_id,
            implementation_cost:
              this.manualManageMentData[i].implementation_cost,
            implementation_difficulty:
              this.manualManageMentData[i].implementation_difficulty,
            risk_progress_result: this.manualManageMentData[i].progressResult,
            action_schedule: this.dateformat(
              this.manualManageMentData[i].actionSchedule
            ),
            manager: this.manualManageMentData[i].manager,
            certification: this.$store.state.header.certificate,
            note: this.manualManageMentData[i].note,
          });
        }
      } else {
        for (let i = 0; i < this.selectedManagement.length; i++) {
          this.changeManagementData.push({
            evaluation_id: this.selectedManagement[i],
            implementation_cost: this.implementation_cost,
            implementation_difficulty: this.implementation_difficulty,
            risk_progress_result: this.risk_progress_result,
            action_schedule: this.action_schedule,
            manager: { list: this.managerData },
            certification: this.$store.state.header.certificate,
          });
        }
      }
      // console.log(this.changeManagementData)
      this.riskMgmntService
        .saveManagement(this.changeManagementData)
        .then((res) => {
          if (res.status == 200) {
            this.changeManagementData = [];
            this.selectedManagement = [];
            this.selectedItem = [];
            this.manualManageMentData = [];
            this.getManagementData();
            this.isChangeData = true;
            Toast.fire({ title: res.data.message });
          }
        });
    },

    getUpdateTechnicalData(event, filed_name, id) {
      const obj = this.technicalAreaList.find(
        (x) => x.tech_evaluation_id == id
      );

      if (this.manualTechnicalData.length > 0) {
        let checkId = this.manualTechnicalData.find(function (item) {
          return item.evaluation_id == id;
        });
        if (checkId) {
          checkId[filed_name] = event.target.value;
        } else {
          this.manualTechnicalData.push(obj);
          let checkId = this.manualTechnicalData.find(function (item) {
            return item.tech_evaluation_id == id;
          });
          if (checkId) {
            checkId[filed_name] = event.target.value;
          }
        }
      } else {
        this.manualTechnicalData.push(obj);
        let checkId = this.manualTechnicalData.find(function (item) {
          return item.tech_evaluation_id == id;
        });
        if (checkId) {
          checkId[filed_name] = event.target.value;
        }
      }

      document.getElementById(event.target.id).className = "";
      if (event.target.value == "risk_acceptance") {
        document.getElementById(event.target.id).className = "risk-acceptance";
      }
      if (event.target.value == "completed") {
        document.getElementById(event.target.id).className = "action-completed";
      }
      if (event.target.value == "action_to_be_taken") {
        document.getElementById(event.target.id).className = "action-taken";
      }

      // console.log(this.manualTechnicalData);
    },

    saveTechnicalData() {
      if (this.isChangeData == true) {
        for (let i = 0; i < this.manualTechnicalData.length; i++) {
          this.changeTechnicalData.push({
            tech_evaluation_id: this.manualTechnicalData[i].tech_evaluation_id,
            implementation_cost:
              this.manualTechnicalData[i].implementation_cost,
            implementation_difficulty:
              this.manualTechnicalData[i].implementation_difficulty,
            risk_progress_result: this.manualTechnicalData[i].progressResult,
            action_schedule: this.dateformat(
              this.manualTechnicalData[i].actionSchedule
            ),
            manager: this.manualTechnicalData[i].manager,
            certification: this.$store.state.header.certificate,
            note: this.manualTechnicalData[i].note,
          });
        }
      } else {
        for (let i = 0; i < this.selectedTechnical.length; i++) {
          this.changeTechnicalData.push({
            tech_evaluation_id: this.selectedTechnical[i],
            implementation_cost: this.implementation_cost,
            implementation_difficulty: this.implementation_difficulty,
            risk_progress_result: this.risk_progress_result,
            action_schedule: this.action_schedule,
            manager: { list: this.managerData },
            certification: this.$store.state.header.certificate,
          });
        }
      }
      this.riskMgmntService
        .saveTechnical(this.changeTechnicalData)
        .then((res) => {
          if (res.status == 200) {
            this.changeTechnicalData = [];
            this.selectedTechnical = [];
            this.selectedTechnicalItem = [];
            this.manualTechnicalData = [];
            this.getTechnicalData();
            this.isChangeData = true;
            Toast.fire({ title: res.data.message });
          }
        });
    },

    dateformat(value) {
      if (value) {
        let dd = moment(String(value)).format("YYYY-MM-DD");
        // console.log("date--", dd);
        return dd;
      }
    },

    // callback pagination
    myCallback(ClickPage) {
      this.page = ClickPage;
      this.getTechnicalData();
    },

    myCallback2(ClickPage) {
      this.page2 = ClickPage;
      // console.log(this.page2);
      this.getManagementData();
    },

    openCalculationModal() {
      this.isCalculation = true;
    },

    closeCalculationStandard() {
      this.isCalculation = false;
    },
  },
};
</script>


<style lang="scss">
input[type="date"] {
  position: relative;
  width: 100px;
  height: 20px;
  color: white;
}

input[type="date"]:before {
  position: absolute;
  top: 3px;
  left: 16px;
  content: attr(data-date);
  display: inline-block;
  color: #a4a4a4;
  right: 0;
}

input[type="date"]::-webkit-datetime-edit,
input[type="date"]::-webkit-inner-spin-button,
input[type="date"]::-webkit-clear-button {
  display: none;
}

input[type="date"]::-webkit-calendar-picker-indicator {
  position: absolute;
  top: 3px;
  // right: 0;
  color: black;
  opacity: 1;
  // height: auto;
  width: 100%;
  left: 3px;
  cursor: pointer;
}
</style>