<template>
  <div class="breadcrumb">
    <p>
      <a @click="link1(link)" v-if="text1">{{ text1 }} </a>
      <span>></span>
      <a @click="$router.push(text2link)" v-if="text2">{{ text2 }} </a>
      <span v-if="text3">> </span>
      <a @click="$router.push(link2)" v-if="text3">{{ text3 }} </a>
      <span v-if="text4">> </span>
      {{ text4 }}
    </p>
  </div>
</template>

<script>
export default {
  name: "Breadcrumb",
  props: {
    link: String,
    text1: String,
    text2: String,
    text3: String,
    text4: String,
    link2: String,
    text2link: String
  },
  //   props: ["link", "text1", "text2"],
  data() {
    return {};
  },
  methods: {
    link1(link) {
      this.$router.push(link);
    },
  },
};
</script>