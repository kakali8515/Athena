<template>
  <div class="faq_rightwrap">
    <div class="faq-head">
      <div class="faq-tag">
        <p>태그</p>
      </div>
      <div class="faq-title">
        <p>제목</p>
      </div>
    </div>
    <div class="faq-body">
      <div class="faq-main-wrap">
        <div class="sidebaraccordion" id="accordionExample">
          <div
            class="accordion-item bg-white border border-gray-200"
            v-for="(item, i) of faqList"
            :key="i"
          >
            <h2 class="accordion-header mb-0" id="headingOne">
              <div
                class="accordion-button relative flex items-top w-full text-basetext-left bg-white border-0 rounded-none transition focus:outline-none collapsed"
                data-bs-toggle="collapse"
                :data-bs-target="'#tab' + i"
                aria-expanded="true"
                :aria-controls="'tab' + i"
              >
                <div class="body-tag">
                  <p>
                    <span v-for="(tag, index) in item.tags" :key="index"
                      >{{ tag.faq_category_name
                      }}<span v-if="index + 1 < item.tags.length"
                        >,
                      </span></span
                    >
                  </p>
                </div>
                <div class="body-title">
                  <p>{{ item.faq_title }}</p>
                </div>
              </div>
            </h2>
            <div
              :id="'tab' + i"
              class="accordion-collapse collapse"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body" v-html="item.faq_description"></div>
              <div class="attached_wrapper" v-if="item.file_name_download_url">
                <img
                  src="@/assets/icon/attached-icon.svg"
                  class="accordion-link"
                />
                <p
                  class="accordion-link"
                  @click="download_attachment(item.file_name_download_url)"
                >
                  {{ item.file_name }}
                </p>
              </div>
            </div>
          </div>
          <pagination
            v-model="page"
            :records="totalItems"
            :per-page="limit"
            @paginate="myCallback"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomerCenterService from "@/services/CustomerCenterService";
export default {
  name: "FaqRightside",
  props: ["tag_id"],
  data() {
    return {
      //   rightside: [
      //     {
      //       label: "Sign Up",
      //       title: "Frequently Asked Questions 1",
      //       description:
      //         '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p><p>For further inquiries <a href="#">1:1 Inquiry</a> Please use</p>',
      //     },
      //     {
      //       label: "Login",
      //       title: "Frequently Asked Questions 1",
      //       description:
      //         '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p><p>For further inquiries <a href="#">1:1 Inquiry</a> Please use</p>',
      //     },
      //     {
      //       label: "Risk management",
      //       title: "Frequently Asked Questions 1",
      //       description:
      //         '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p><p>For further inquiries <a href="#">1:1 Inquiry</a> Please use</p>',
      //     },
      //   ],
      faqList: [],
      page: 1,
      limit: 50,
      totalItems: 0,
      //   tag_id: "",
    };
  },
  computed: {
    gettagId() {
      return this.tag_id;
    },
  },

  watch: {
    gettagId(newValue) {
      this.faq();
    },
  },
  created() {
    this.CustomerCenterService = new CustomerCenterService();
  },
  mounted() {
    this.faq();
  },
  methods: {
    myCallback(ClickPage) {
      this.page = ClickPage;
      this.faq();
    },

    faq() {
      this.CustomerCenterService.faqList(this.page, this.limit, this.tag_id)
        .then((res) => {
          if (res.status == 200) {
            // console.log(res.data.faq);
            this.faqList = res.data.faq;
            this.totalItems = res.data.total_records;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    toHex(s) {
      let h = "";
      for (let i = s.length - 1; i >= 0; i--)
        h = "%" + s.charCodeAt(i).toString(16) + h;
      return h;
    },

    download_attachment(item) {
      console.log("object", item);
      const url = `${process.env.VUE_APP_API_BASE_URL}/download/file?url=${item}`; // later required base url to dynamic
      // let encodeURL = this.toHex(url);
      // console.log("encode url", encodeURL);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "download");
      document.body.appendChild(link);
      link.click();
    },
  },
};
</script>

<style scopped>
.attached_wrapper {
  display: flex;
  width: calc(100% - 195px);
  margin-left: 195px;
  cursor: pointer;
}
.accordion-link {
  text-align: left;
  /* margin-top: -20px; */
  padding-bottom: 20px;
  font-size: 14px;
  line-height: 18px;
  font-weight: 300;
  color: #181818;
}
</style>
