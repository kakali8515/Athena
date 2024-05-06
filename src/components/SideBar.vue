<template>
  <div class="sidbar">
    <div class="sidebaraccordion" id="accordionExample">
      <div
        :class="
          item.sub_menu
            ? 'accordion-item bg-white border border-gray-200'
            : 'accordion-item bg-white border border-gray-200 no-arrow'
        "
        v-for="(item, index) of sideData"
        :key="index"
      >
        <h2 class="accordion-header mb-0" id="headingOne">
          <button
            :class="
              item.sub_menu
                ? 'accordion-button relative flex items-center w-full text-basetext-left bg-white border-0 rounded-none transition focus:outline-none collapsed'
                : 'accordion-button relative flex items-center w-full text-basetext-left bg-white border-0 rounded-none transition focus:outline-none collapsed hide_arrow'
            "
            type="button"
            data-bs-toggle="collapse"
            :data-bs-target="'#collapseOne' + index"
            aria-expanded="true"
            aria-controls="collapseOne"
            @click="goTo(item.name)"
          >
            {{ item.label_ko }}
          </button>
        </h2>
        <div
          :id="'collapseOne' + index"
          class="accordion-collapse collapse"
          aria-labelledby="headingOne"
          data-bs-parent="#accordionExample"
        >
          <div class="accordion-body">
            <ul>
              <template v-for="(submenu, index) of item.sub_menu" :key="index">
                <li>
                  <router-link
                    :to="{
                      name: submenu.name,
                      params: { ul: `${submenu.label}` },
                    }"
                  >
                    {{ submenu.label_ko }}
                  </router-link>
                </li>
              </template>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div
      class="license_wrap"
      @click="$router.push({ name: 'LicenseManagement' })"
      v-if="isLisense || this.$store.state.signin.is_user_admin == 'y'"
    >
      <p>
        라이선스 만료 D-{{ lisence_expires_remaining_days }}<br />
        <a href="#">{{ end_date }}</a>
      </p>
    </div>
  </div>
</template>

<script>
import SideBarService from "@/services/SideBarService";
import UserAdminLicenseService from "@/services/UserAdminLicenseService";
export default {
  name: "SideBar",
  // props: {
  //   is_Show: Boolean,
  // },
  data() {
    return {
      sideData: [],
      menuData: [],
      isLisense: true,
      lisence_expires_remaining_days: "",
      end_date: "",
      menuList: [],
    };
  },
  created() {
    this.sideBarService = new SideBarService();
    this.userAdminLicenseService = new UserAdminLicenseService();
  },
  computed: {
    permission2() {
      return this.$store.state.sideBar.permission.license;
    },
    permission() {
      return this.$store.state.sideBar.permission.user_management;
    },
  },
  mounted() {
    setTimeout(() => {
      this.getPermission();
      this.getSidebar();
    }, 1000);
    setTimeout(() => {
      this.noArrow();
    }, 1500);

    if (this.$store.state.signin.is_user_admin == "y") {
      this.getCurrentLicenseDetails();
    }
  },
  watch: {
    "$store.state.header.certificate": function (newVal, oldVal) {
      if (newVal && newVal != oldVal) {
        setTimeout(() => {
          this.getPermission();
          this.getSidebar();
        }, 1000);
      }
    },
    "$store.state.signin.user_id": function (newVal, oldVal) {
      if (newVal && newVal != oldVal) {
        setTimeout(() => {
          this.getPermission();
          this.getSidebar();
        }, 1000);
      }
    },
    "$store.state.signin.company_id": function (newVal, oldVal) {
      if (newVal != oldVal && newVal) {
        setTimeout(() => {
          this.getPermission();
          this.getSidebar();
        }, 1000);
      }
    },
    "$store.state.sideBar.permission.license": function (newVal, oldVal) {
      if (newVal != oldVal && newVal) {
        if (newVal !== "none" || this.$store.state.signin.is_user_admin == "y")
          this.getCurrentLicenseDetails();
      }
    },
    "$store.state.addMenu": function (newVal, oldVal) {
      if (newVal != oldVal && newVal) {
        setTimeout(() => {
          this.getPermission();
          this.getSidebar();
        }, 1000);
      }
    },
  },
  methods: {
    goTo(name) {
      if (name) {
        this.$router.push({ name: name });
        // if (
        //   this.permission !== "none" ||
        //   this.$store.state.signin.is_user_admin == "y"
        // ) {
        //   this.$router.push({ name: name });
        // }
      }
    },

    getPermission() {
      if (
        this.$store.state.header.certificate &&
        localStorage.getItem("uid") &&
        this.$store.state.signin.company_id &&
        this.$store.state.signin.is_user_admin != "y"
      ) {
        this.sideBarService
          .permission(
            this.$store.state.header.certificate,
            localStorage.getItem("uid"),
            this.$store.state.signin.company_id
          )
          .then((res) => {
            let establishAccess = "none";
            if (res.status == 200) {
              this.menuData = res.data.permissions; // api response
              // global permission shared start
              this.$store.dispatch(
                "sideBar/getPermissionList",
                res.data.permissions
              );

              this.menuData.map((u, index) => {
                if (
                  u.menu == "schedule_management" ||
                  u.menu == "bulletin_board"
                ) {
                  this.$store.state.sideBar.permission[u.menu] = u.access_type;
                }
                u.sections.map((access) => {
                  this.$store.state.sideBar.permission[access.section] =
                    access.access_type;
                });
                // global permission shared end
                if (u.menu_label == "Diagnosis management" && u.sections) {
                  u.sections.forEach((estb) => {
                    if (estb.section_label == "Technical Diagnosis") {
                      establishAccess = estb.access_type;
                    }
                  });
                }
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

    noArrow() {
      // setTimeout(() => {
      var ele = document.querySelectorAll(".accordion-item");
      var ele2 = [];
      ele.forEach((item) => {
        if (item.classList.contains("no-arrow")) {
          ele2.push(item);
        }
      });
      ele2.forEach((nItem, i) => {
        if (i == 0) {
          nItem.classList.add("it-border-top");
        } else if (i == ele2.length - 1) {
          nItem.classList.add("it-border-bottom");
        }
      });
      // }, 1000)
    },

    // API Function for current license
    getCurrentLicenseDetails() {
      this.userAdminLicenseService.currentLicenseDetails().then((res) => {
        if (res.status == 200) {
          this.end_date = res.data.end_date;
          this.lisence_expires_remaining_days =
            res.data.lisence_expires_remaining_days;
        }
      });
    },

    // sidebar API
    getSidebar() {
      if (
        this.$store.state.header.certificate &&
        localStorage.getItem("uid") &&
        this.$store.state.signin.company_id
      ) {
        this.sideBarService
          .sideBar(
            this.$store.state.header.certificate,
            localStorage.getItem("uid"),
            this.$store.state.signin.company_id
          )
          .then((res) => {
            this.sideData = res.data.results;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.inner-submenu {
  padding-left: 10px;
}
</style>
