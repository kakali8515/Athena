<template>
  <div class="info_protection">
    <div class="breadcrumb">
      <Breadcrumb link="dashboard" text1="Home" text2="자산관리" text3="자산목록" text4="공유하기" link2="/assetListSelection"
        text2link="/assetListSelection" />
      <!-- <p>
        <a href="#">Home </a> <span>></span> Asset management
        <span>></span> Asset list
      </p> -->
    </div>
    <div class="heading flex justify-between align-end">
      <h4>자산 공유 이력</h4>
    </div>
    <div class="policy_setting_wrap no-padding">
      <p>
        * 공유자산은 다른 기업과 자산을 공동으로 사용 할 경우 공유 할 수 있는 기능으로 공유하기 시 해당 자산은 양 기업간의 동기화가 이루어집니다.
      </p>
      <div class="datatable_wrap ppadding50">
        <div class="policy_setting_wrap_inner">
          <div class="flex flex-col">
            <div class="box-shadow">
              <div class="overflow-x-auto protection_table">
                <div class="inline-block min-w-full">

                  <div class="overflow-hidden">
                    <table class="min-w-full text-center">
                      <thead class="bg-gray-50">
                        <tr>
                          <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
                            공유기업명
                          </th>
                          <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
                            공유자
                          </th>
                          <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
                            공유시간
                          </th>
                          <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
                            수락 기업명
                          </th>
                          <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
                            수락자
                          </th>
                          <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
                            수락시간
                          </th>
                          <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
                            자산목록 상세보기
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr class="bg-white border-b" v-for="(item,index) in assetSharingHistory" :key="index">
                          <!-- <td class="px-6 py-4 text-sm font-medium text-gray-900">
                            {{item.sharedTo}}
                          </td> -->
                          <td class="px-6 py-4 text-sm font-medium text-gray-900">
                            {{item.sharer_company_name}}
                          </td>
                          <td class="text-sm text-gray-900 font-light px-6 py-4">
                            {{item.sharer}}
                          </td>
                          <td class="text-sm text-gray-900 font-light px-6 py-4">
                            {{item.sharing_time}}
                          </td>
                          <td class="text-sm text-gray-900 font-light px-6 py-4">
                            {{item.sharedTo}}
                          </td>
                          <td class="text-sm text-gray-900 font-light px-6 py-4">
                            {{item.accepterName}}
                          </td>
                          <td class="text-sm text-gray-900 font-light px-6 py-4">
                            {{item.acceptance_time}}
                          </td>
                          <td class="text-sm text-gray-900 font-light px-6 py-4">
                            <div class="btn_wrap" v-if="item.sharer_company_id == company_id">
                              <button type="button" v-if="item.share_status!=='cancelled'"
                                @click="shareRequestChange(item.id,'cancelled')">공유취소</button>
                              <button type="button" v-if="item.share_status==='cancelled'" disabled="true">공유취소</button>
                              <button type="button" v-if="item.share_status==='shared'" disabled="true">승인</button>
                              <button type="button" v-if="item.share_status==='rejected'" disabled="true">거절</button>
                              <button type="button" class="gray_border"
                                @click="item.share_status==='shared' ? $router.push(`/AssetSharingHistorytwo/${item.id}/${item.sharedTo}/${item.accepterName}`) : $router.push(`/AssetSharingHistorythree/${item.id}/${item.sharer_company_id}/${item.sharedTo}/${item.accepterName}`)">
                                상세보기
                              </button>
                              <!-- <button :style="item.share_status==='rejected' ? 'display:none' : ''" type="button" v-else class="gray_border" @click="$router.push(`/AssetSharingHistorythree/${item.id}/${item.sharedTo}/${item.accepterName}`)">
                              View Details
                            </button> -->
                            </div>
                            <div class="btn_wrap" v-if="item.sharer_company_id != company_id">
                              <button type="button" v-if="item.share_status==='requested'"
                                @click="shareRequestChange(item.id,'shared')">수락</button>
                              <button type="button" v-if="item.share_status==='requested'"
                                @click="shareRequestChange(item.id,'rejected')" class="red_border">거절</button>
                              <button type="button" v-if="item.share_status==='cancelled'" disabled="true">공유
                                취소</button>
                              <button type="button" v-if="item.share_status==='shared'" disabled="true">승인</button>
                              <button type="button" v-if="item.share_status==='rejected'" disabled="true"
                                class="red_border">거절</button>
                              <button type="button"
                                v-if="item.share_status === 'requested' || item.share_status === 'shared'"
                                class="gray_border"
                                @click="item.share_status==='shared' ? $router.push(`/AssetSharingHistorytwo/${item.id}/${item.sharedTo}/${item.accepterName}`) : $router.push(`/AssetSharingHistorythree/${item.id}/${item.sharer_company_id}/${item.sharedTo}/${item.accepterName}`)">
                                상세보기
                              </button>
                              <!-- <button :style="item.share_status==='rejected' ? 'display:none' : ''" type="button" v-else class="gray_border" @click="$router.push(`/AssetSharingHistorythree/${item.id}/${item.sharedTo}/${item.accepterName}`)">
                              View Details
                            </button> -->
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AssetManagementService from "@/services/AssetManagementService";
import Breadcrumb from "@/components/Breadcrumb.vue";
export default {
  name: "AssetSharingHistory",
  components: {
    Breadcrumb,
  },

  data() {
    return {
      company_id: localStorage.getItem('compid'),
      assetSharingHistory: [],
    };
  },
  created() {
    this.AssetManagementService = new AssetManagementService();
  },
  mounted() {
    this.assetSharingHistoryList()
  },

  methods: {
    assetSharingHistoryList() {
      this.assetSharingHistory = this.AssetManagementService.assetSharingHistory().then((res) => {
        if (res.status == 200) {
          this.assetSharingHistory = res.data.sharing_history;
        }
      })
    },
    shareRequestChange(id, status) {
      this.AssetManagementService.shareHistoryStatusChange(id, status).then((res) => {
        if (res.status == 200) {
          this.assetSharingHistoryList()
        }
      })
    }
  },
};
</script>


<style lang="scss">

</style>