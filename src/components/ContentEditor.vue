<template>
  <div id="content_editor_rte"></div>
</template>

<script>
import { toRefs, ref, onMounted, watch } from "vue";
export default {
  props: {
    get: { type: String, default: "", require: false },
    set: { type: String, default: "", require: false },
  },
  setup(props, { emit }) {
    const editorData = ref();
    const { set } = toRefs(props);
    const editor = ref();

    onMounted(() => {
      // eslint-disable-next-line no-undef
      editor.value = new RichTextEditor("#content_editor_rte");
      editor.value.setHTMLCode(set.value);
      editor.value.attachEvent("change", function () {
        editorData.value = editor.value.getHTMLCode();
      });
    });

    watch(set, (first, second) => {
      if (first !== second) {
        editor.value.setHTMLCode(set.value);
      }
    });

    watch(editorData, (currentValue, oldValue) => {
      if (currentValue !== oldValue) {
        emit("update:get", currentValue);
      }
    });
  },
};
</script>