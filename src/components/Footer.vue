<template>
  <footer>
    <div class="f-menu">
      <ul>
        <li><a @click="$router.push('/terms-of-use')">이용약관</a></li>
        <li>
          <a @click="$router.push('/privacy-policy')">개인정보처리방침</a>
        </li>
      </ul>
    </div>
    <div class="f-address">
      <div class="wrap">
        <p>사업자등록번호: 472-81-00257</p>
        <p>E-mail : captain@aegisecu.com I Tell : 1855-1535</p>
        <p>주소 : 경기도 성남시 대왕판교로 815 4층 (KISA 정보보호클러스터)</p>
      </div>
      <div class="wrap">
        <p>© Copyright 2020, Aegisecu Corp. All Rights Reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script>
// import { inject } from "vue";
// import SideBarVue from "./SideBar.vue";
// import CommonService from "@/services/CommonService";
// import moment from "moment";
// import vClickOutside from 'click-outside-vue3'
// import Toast from "@/alert/alert.js";

export default {
  name: "Footer",
};
</script>

<style lang="scss">
.f-menu ul li a {
  cursor: pointer;
}
</style>


