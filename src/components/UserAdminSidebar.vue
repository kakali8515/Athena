<template>
  <div class="sidbar useradminsidebar">
    <div class="sidebaraccordion" id="accordionExample">
      <div
        class="accordion-item bg-white border border-gray-200"
        v-for="(menu, index) in menuList"
        :key="index"
      >
        <h2 class="accordion-header mb-0" id="headingOne">
          <button
            class="
              accordion-button
              relative
              flex
              items-center
              w-full
              text-basetext-left
              bg-white
              border-0
              rounded-none
              transition
              focus:outline-none
              collapsed
            "
            type="button"
            data-bs-toggle="collapse"
            :data-bs-target="'#collapseOne' + index"
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            {{ menu.menu }}
          </button>
        </h2>
        <div
          :id="'collapseOne' + index"
          class="accordion-collapse collapse"
          aria-labelledby="headingOne"
          data-bs-parent="#accordionExample"
        >
          <div class="accordion-body" v-if="menu.sub_menus">
            <ul>
              <li v-for="(subMenu, i) in menu.sub_menus" :key="i">
                <div class="sidebaraccordion" id="accordionExample2">
                  <div class="accordion-item bg-white border border-gray-200">
                    <h2 class="accordion-header mb-0" id="headingOneunder">
                      <button
                        class="
                          accordion-button accordion-button-under
                          relative
                          flex
                          items-center
                          w-full
                          text-basetext-left
                          bg-white
                          border-0
                          rounded-none
                          transition
                          focus:outline-none
                          collapsed
                        "
                        type="button"
                        data-bs-toggle="collapse"
                        :data-bs-target="'#collapseOneunder' + i"
                        aria-expanded="true"
                        aria-controls="collapseOneunder"
                      >
                        {{ subMenu.sub_menu }}
                      </button>
                    </h2>
                    <div
                      :id="'collapseOneunder' + i"
                      class="accordion-collapse collapse"
                      aria-labelledby="headingOneunder"
                      data-bs-parent="#accordionExample2"
                    >
                      <div class="accordion-body accordion-body-under">
                        <ul>
                          <li
                            class="right_arrow"
                            v-for="(item, index) in subMenu.items"
                            :key="index"
                          >
                            <div
                              v-if="
                                this.$route.name == 'TechnicalDiagnosisTemplateAdd'
                              "
                            >
                              <div class="flex items-center mb-4">
                                <input
                                  id="default-checkbox"
                                  @click="addItemId"
                                  :checked="itemList.indexOf(item.id) >= 0"
                                  type="checkbox"
                                  :value="item.id"
                                  class="
                                    w-4
                                    m-r-5
                                    h-4
                                    text-blue-600
                                    bg-gray-100
                                    rounded
                                    border-gray-300
                                    dark:ring-offset-gray-800
                                    dark:bg-gray-700 dark:border-gray-600
                                  "
                                />
                                <label
                                  for="default-checkbox"
                                  class="
                                    
                                    text-sm
                                    font-medium
                                    text-gray-900
                                    dark:text-gray-300
                                  "
                                  >{{ item.item_code }}</label
                                >
                              </div>
                              <p>{{ item.item_name }}</p>
                            </div>
                            <div
                              class="cursor-pointer"
                              v-else
                              @click="viewItemDetails(item.id)"
                            >
                              <div class="flex items-center mb-4">
                                <label
                                  for="default-checkbox"
                                  class="
                                    
                                    text-sm
                                    font-medium
                                    text-gray-900
                                    dark:text-gray-300
                                  "
                                  >{{ item.item_code }}</label
                                >
                              </div>
                              <p>{{ item.item_name }}</p>
                            </div>
                            <div
                              v-if="
                                this.$route.path !==
                                '/TechnicalDiagnosisTemplateAdd'
                              "
                              @click="viewItemDetails(item.id)"
                              class="arrow cursor-pointer"
                            >
                              <img src="@/assets/icon/arrow-right.svg" />
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <!-- <li>
                Linux
              </li> -->
            </ul>
          </div>
          <div class="accordion-body" v-if="menu.items">
            <ul>
              <li
                class="right_arrow"
                v-for="(item, index) in menu.items"
                :key="index"
              >
                <div
                  v-if="this.$route.name == 'TechnicalDiagnosisTemplateAdd'"
                >
                  <div class="flex items-center mb-4">
                    <input
                      id="default-checkbox"
                      @click="addItemId"
                      :checked="itemList.indexOf(item.id) >= 0"
                      type="checkbox"
                      :value="item.id"
                      class="
                        w-4
                        m-r-5
                        h-4
                        text-blue-600
                        bg-gray-100
                        rounded
                        border-gray-300
                        dark:ring-offset-gray-800
                        dark:bg-gray-700 dark:border-gray-600
                      "
                    />
                    <label
                      for="default-checkbox"
                      class="
                        
                        text-sm
                        font-medium
                        text-gray-900
                        dark:text-gray-300
                      "
                      >{{ item.item_code }}</label
                    >
                  </div>
                  <p>{{ item.item_name }}</p>
                </div>
                <div
                  class="cursor-pointer"
                  v-else
                  @click="viewItemDetails(item.id)"
                >
                  <div class="flex items-center mb-4">
                    <label
                      for="default-checkbox"
                      class="
                        text-sm
                        font-medium
                        text-gray-900
                        dark:text-gray-300
                      "
                      >{{ item.item_code }}</label
                    >
                  </div>
                  <p>{{ item.item_name }}</p>
                </div>
                <div
                  v-if="this.$route.path !== '/TechnicalDiagnosisTemplateAdd'"
                  @click="viewItemDetails(item.id)"
                  class="arrow cursor-pointer"
                >
                  <img src="@/assets/icon/arrow-right.svg" />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import userAdmin from "@/services/userAdmin";
export default {
  name: "UserAdminSidebar",
  props: ["itemList"],
  data() {
    return {
      menuList: "",
    };
  },

  created() {
    this.userAdmin = new userAdmin();
  },
  mounted() {
    this.technicalDiagnosisMenuList();
  },
  methods: {
    technicalDiagnosisMenuList() {
      this.userAdmin
        .technicalDiagnosisMenuList()
        .then((res) => {
          if (res.status == 200) {
            // console.log(res.data.asset_list)
            this.menuList = res.data.asset_list;
          }
        })
        .catch((err) => {
          return;
        });
    },
    addItemId(event) {
      if (event.target.checked) {
        this.$emit("getItem", event.target.value);
      } else {
        this.$emit("popItem", event.target.value);
      }
    },
    viewItemDetails(id) {
      this.$emit("getItemId", id);
      //  this.$router.push(`/TechnicalDiagnosisEditItemGroup/${id}`)
    },
  },
};
</script>
