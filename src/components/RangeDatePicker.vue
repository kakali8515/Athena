<template>
  <div class="datepicker_wrap">
    <div class="datepicker_inner">
      <label>시작날짜</label>
      <Datepicker class="startInput"
        v-model="startDate"
        placeholder="선택"
        :enableTimePicker="false"
        :value="startDate"
        @update:modelValue="handleDate"
        locale="ko"
        cancelText="취소"
         selectText="선택"
      >
      </Datepicker>
    </div>
    <span class="dash">-</span>
    <div class="datepicker_inner">
      <label>마지막 날짜</label>
      <Datepicker
        v-model="endDate"
        placeholder="선택"
        :minDate="startDate"
        :enableTimePicker="false"
        :disabled="EndDisabled"
        :value="endDate"
        @update:modelValue="handleDate2"
        locale="ko"
        cancelText="취소"
         selectText="선택"
      >
      </Datepicker>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "datepicker",
  props: ["startDate", "endDate"],

  setup(props, { emit }) {
    let EndDisabled = ref(true);
    const getFormatedDate = (dt) => {
      const date = new Date(dt);
      return (
        date.getFullYear() +
        "-" +
        (date.getMonth() > 8
          ? date.getMonth() + 1
          : "0" + (date.getMonth() + 1)) +
        "-" +
        (date.getDate() > 9 ? date.getDate() : "0" + date.getDate())
      );
    };
    const handleDate = (modelData) => {
      props.startDate.value = modelData;
      emit("StartDate", getFormatedDate(modelData));
      EndDisabled.value = false;
    };
    const handleDate2 = (modelData) => {
      props.endDate.value = modelData;
      emit("EndDate", getFormatedDate(modelData));
    };
    return {
      getFormatedDate,
      handleDate,
      handleDate2,
      EndDisabled,
    };
  },
};
</script>

<style lang="scss" scoped>
.datepicker_wrap {
  display: flex;
  align-items: center;

  .datepicker_inner {
    display: flex;
    align-items: center;

    label {
      margin-right: 10px;
    }
  }

  .dash {
    display: block;
    margin: 0 25px;
  }
  .dp__main  {
      width: 100%;
  }
}
</style>
