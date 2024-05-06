<template>
  <div class="sidbar">
    <div class="sidebaraccordion" id="accordionExample">
      <div :class="
        item.subMenu
          ? 'accordion-item bg-white border border-gray-200'
          : 'accordion-item bg-white border border-gray-200 no-arrow'
      " v-for="(item, index) of sideData" :key="index">
        <h2 class="accordion-header mb-0" id="headingOne"
          v-if="item.access_type == 'read' || item.access_type == 'edit'">
          <button :class="
            item.subMenu
              ? 'accordion-button relative flex items-center w-full text-basetext-left bg-white border-0 rounded-none transition focus:outline-none collapsed'
              : 'accordion-button relative flex items-center w-full text-basetext-left bg-white border-0 rounded-none transition focus:outline-none collapsed hide_arrow'
          " type="button" data-bs-toggle="collapse" :data-bs-target="'#collapseOne' + index" aria-expanded="true"
            aria-controls="collapseOne" @click="goTo(item.name)">
            {{ item.label_ko }}
          </button>
        </h2>
        <div :id="'collapseOne' + index" class="accordion-collapse collapse" aria-labelledby="headingOne"
          data-bs-parent="#accordionExample">
          <div class="accordion-body">
            <ul>
              <template v-for="(submenu, index) of item.subMenu" :key="index">
                <li v-if="
                  submenu.access_type == 'read' ||
                  submenu.access_type == 'edit'
                ">

                  <router-link :to="{ name: submenu.name, params: { ul: `${submenu.menu}` } }">
                    {{ submenu.label_ko }}
                    <!-- <template
                      v-if="submenu.label == 'Diagnosis management' && (submenu.access_type == 'edit' || submenu.access_type == 'read') && menuList.length">
                      <ul v-for="(sub, i) of menuList" :key="i" class="inner-submenu">
                        <li>
                          <router-link to="">
                            {{ sub.menu }}
                          </router-link>
                        </li>
                      </ul>
                    </template> -->
                  </router-link>

                </li>
              </template>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="license_wrap" @click="$router.push({ name: 'LicenseManagement' })"
      v-if="isLisense || this.$store.state.signin.is_user_admin == 'y'">
      <p>
        라이선스 만료 D-{{ lisence_expires_remaining_days }}<br />
        <a href="#">{{ end_date }}</a>
      </p>
    </div>
  </div>
</template>

<script>
import {
  sideBarDataTop,
  sideBarDataMiddle,
  sideBarDataLast,
} from "../config/SideBarData";
import SideBarService from "@/services/SideBarService";
import UserAdminLicenseService from "@/services/UserAdminLicenseService";
export default {
  name: "SideBar",
  // props: {
  //   is_Show: Boolean,
  // },
  data() {
    return {
      sideData: sideBarDataTop,
      menuData: [],
      isLisense: true,
      lisence_expires_remaining_days: '',
      end_date: '',
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
      this.getSideBar();
    }, 2000)
    // this.getSideBar();
    this.getDiagnosisMenu();
    this.noArrow();
    if (this.$store.state.signin.is_user_admin == 'y') {
      this.getCurrentLicenseDetails();
    }
  },
  watch: {
    "$store.state.header.certificate": function (newVal, oldVal) {
      if (newVal && newVal != oldVal) {
        console.log("certificate name", newVal);
        this.getDiagnosisMenu();
        setTimeout(() => {
          this.getSideBar();
        }, 2000)
        // this.getSideBar();
      }
    },
    "$store.state.signin.company_id": function (newVal, oldVal) {
      if (newVal != oldVal && newVal) {
        this.getDiagnosisMenu();
        setTimeout(() => {
          this.getSideBar();
        }, 2000)
        // this.getSideBar();
      }
    },
    "$store.state.sideBar.permission.license": function (newVal, oldVal) {
      if (newVal != oldVal && newVal) {
        if (newVal !== 'none' || this.$store.state.signin.is_user_admin == 'y')
          this.getCurrentLicenseDetails();
      }
    },
    "$store.state.addMenu": function (newVal, oldVal) {
      if (newVal != oldVal && newVal) {
        this.getDiagnosisMenu();
        setTimeout(() => {
          this.getSideBar();
        }, 2000)
      }
    },
  },
  methods: {
    goTo(name) {
      if (name) {
        if (this.permission !== 'none' || this.$store.state.signin.is_user_admin == 'y') {
          this.$router.push({ name: name });
        }
      }
    },

    // get menulist from dropdown api
    getDiagnosisMenu() {
      // console.log("menu api call")
      this.sideBarService
        .diagnosisMenu(this.$store.state.header.certificate)
        .then((res) => {
          this.menuList = res.data.menu_list
          // console.log('this.menuList', this.menuList)
          if (this.menuList.length) {
            this.menuList.forEach((ele) => {
              Object.assign(ele, { label: ele.menu }, { label_ko: ele.menu }, { name: 'EstablishmentOperationManagementSystem' }, { access_type: 'none' })
            })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },

    getSideBar() {
      console.log(this.$store.state.signin.is_user_admin)
      if (this.$store.state.signin.is_user_admin == "y") {
        this.sideData.forEach((item, index) => {
          // external menu add start
          // console.log('this.menuList', item)
          if (item.label == 'Diagnosis management' && this.menuList.length > 0) {
            this.menuList.forEach((menuItem) => {
              // console.log('menuItem--', menuItem);
              const subLvl = this.sideData[index].subMenu.map((e) => e.label)
              if (!subLvl.includes(menuItem.label)) {
                menuItem.access_type = 'edit';
                this.sideData[index].subMenu.unshift(menuItem)
              }
            })
          }
          // external menu add start
          item.access_type = "edit"
          if ((item, item.subMenu)) {
            item.subMenu.forEach((ele) => {
              ele.access_type = "edit";
            });
          }
        });
      }
      else {
        if (
          this.$store.state.header.certificate &&
          localStorage.getItem("uid") &&
          this.$store.state.signin.company_id
        ) {
          this.sideBarService
            .sideBarData(
              this.$store.state.header.certificate,
              localStorage.getItem("uid"),
              this.$store.state.signin.company_id
            )
            .then((res) => {
              let establishAccess = 'none';
              if (res.status == 200) {
                this.menuData = res.data.permissions; // api response
                this.$store.dispatch(
                  "sideBar/getPermissionList",
                  res.data.permissions
                );
                this.menuData.map((u, index) => {
                  // console.log('u------------------------------->', u)
                  if (
                    u.menu == "schedule_management" ||
                    u.menu == "bulletin_board"
                  ) {
                    this.$store.state.sideBar.permission[u.menu] =
                      u.access_type;
                  }
                  u.sections.map((access) => {
                    this.$store.state.sideBar.permission[access.section] =
                      access.access_type;
                  });
                  if (u.menu_label == 'Diagnosis management' && u.sections) {
                    u.sections.forEach((estb) => {
                      if (estb.section_label == 'Technical Diagnosis') {
                        establishAccess = estb.access_type;
                      }
                    })
                  }
                });

                // let newSideData = [...this.sideData];
                let newSideData = this.sideData;

                newSideData.forEach((elem, index) => {
                  // external menu add start
                  if (elem.label == 'Diagnosis management' && this.menuList.length > 0) {
                    this.menuList.forEach((menuItem) => {
                      const subLvl = newSideData[index].subMenu.map((e) => e.label)
                      if (!subLvl.includes(menuItem.label)) {
                        menuItem.access_type = establishAccess;
                        newSideData[index].subMenu.unshift(menuItem)
                      }
                    })
                  }
                  // external menu add end

                  let find = this.menuData.find(
                    (x) => x.menu_label == elem.label
                  );
                  if (find && find.sections && elem.subMenu) {
                    elem.subMenu.forEach((sub, subIndex) => {
                      let findSubMenu = find.sections.find((i) => {
                        return i.section_label == sub.label;
                      });
                      if (
                        findSubMenu &&
                        findSubMenu.access_type != sub.access_type
                      ) {
                        newSideData[index].subMenu[subIndex].access_type =
                          findSubMenu.access_type;
                      }
                    });
                  } else if (find) {
                    if (find.access_type != elem.access_type) {
                      newSideData[index].access_type = find.access_type;
                    }
                  }
                  let activesubMenu = [];
                  if (newSideData[index].subMenu) {
                    activesubMenu = newSideData[index].subMenu.filter(
                      (x) => x.access_type == "read" || x.access_type == "edit"
                    );
                    // console.log(elem.label, activesubMenu);
                    // if (newSideData[index].label != 'User Admin' && activesubMenu.length == 0) {
                    if (activesubMenu.length == 0) {
                      newSideData[index].access_type = "none";
                    }
                  }

                  this.menuData.forEach((citem, index) => {
                    if (citem.menu_label == "Notice") {
                      // newSideData.forEach((oitem) => {
                      if (elem.subMenu) {
                        elem.subMenu.forEach((litem) => {
                          if (litem.label == "Notice") {
                            litem.access_type = citem.access_type;
                          }
                        });
                      }
                      // });
                    }
                    citem.sections.forEach((litem, lindex) => {
                      if (litem.section_label == "License") {
                        if (litem.access_type == "none") {
                          this.isLisense = false;
                        } else {
                          this.isLisense = true;
                        }
                      }
                    });
                  });
                });
                this.sideData = newSideData;
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    },

    noArrow() {
      // console.log('1')
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
      // }, 2000)
    },

    // API Function for current license
    getCurrentLicenseDetails() {
      this.userAdminLicenseService.currentLicenseDetails().then((res) => {
        if (res.status == 200) {
          this.end_date = res.data.end_date;
          this.lisence_expires_remaining_days = res.data.lisence_expires_remaining_days;
        }
      })
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
