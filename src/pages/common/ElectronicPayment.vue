<template>
    <div class="payment_main_wrap">
        <Breadcrumb link="/dashboard" text1="사용자" text2="전자결재" text2link="/electronicPayment" />
        <div class="heading">
            <h4>전자결재</h4>
        </div>
        <!-- <div class="status_wrap">
            <ul>
                <li v-for="(item, index) of tabData" :key="index" :id="index" @click="getFilteItem(item, index)">
                    <button type="button">{{ item.title }}</button>
                </li>
            </ul>
        </div> -->
        <!-- <div class="payment_table">
            <div class="flex flex-col">
                <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="inline-block min-w-full sm:px-6 lg:px-8">
                        <div class="overflow-hidden">
                            <table class="min-w-full text-center">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
                                            Download
                                        </th>
                                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
                                            proof number
                                        </th>
                                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
                                            proof
                                        </th>
                                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
                                            drafter
                                        </th>
                                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
                                            draft time
                                        </th>
                                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
                                            Due date
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="bg-white border-b" v-for="(item, index) of eceData" :key="index">
                                        <td class="px-6 py-4  text-sm font-medium text-gray-900">{{ item.user_status }}
                                        </td>
                                        <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                            {{ item.evidence_code }}
                                        </td>
                                        <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                            {{ item.evidence }}
                                        </td>
                                        <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                            {{ item.user_name }}
                                        </td>
                                        <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                            {{ item.created_date }}
                                        </td>
                                        <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                            {{ item.due_date }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div> -->
        <div class="tab-style-two m-30" v-if="tabData.length > 0">
            <DynamicTabWrapper @getResponseTitle="changeTab">
                <DynamicTabs v-for="(data, index) in tabData" :key="index" :title="data.title">
                    <div class="payment_table">
                        <div class="flex flex-col">
                            <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div class="inline-block min-w-full sm:px-6 lg:px-8">
                                    <div class="overflow-hidden">
                                        <table class="min-w-full text-center">
                                            <thead class=" bg-gray-50">
                                                <tr>
                                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
                                                        다운로드
                                                    </th>
                                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
                                                        증적번호
                                                    </th>
                                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
                                                       증적명
                                                    </th>
                                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
                                                        기안자
                                                    </th>
                                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
                                                        기안시간
                                                    </th>
                                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
                                                        완료일
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr class="bg-white border-b" v-for="(item, index) of eceData"
                                                    :key="index" @click="evidenceDetails(item)">
                                                    <td class="px-6 py-4  text-sm font-medium text-gray-900 download_row">{{
                                                            item.display_user_status
                                                    }}
                                                    </td>
                                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                        {{ item.evidence_code }}
                                                    </td>
                                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                        {{ item.evidence }}
                                                    </td>
                                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                        {{ item.user_name }}
                                                    </td>
                                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                        {{ dateformat(item.created_date) }}
                                                    </td>
                                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                        {{ dateformat(item.due_date) }}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </DynamicTabs>
            </DynamicTabWrapper>
        </div>
        <div class="pagination">
            <pagination v-model="page" :records="totalRecords" :per-page="limit" @paginate="myCallback"
                v-if="totalRecords > limit" />
        </div>
    </div>
</template>


<script>
import CommonService from "@/services/CommonService";
import DynamicTabWrapper from "@/components/DynamicTabWrapper.vue";
import DynamicTabs from "@/components/DynamicTabs.vue";
import moment from "moment";
import Breadcrumb from "@/components/Breadcrumb.vue";

export default {
    name: 'ElectronicPayment',
    components: {
        DynamicTabWrapper,
        DynamicTabs,
        Breadcrumb
    },
    data() {
        return {
            page: 1,
            limit: 50,
            totalRecords: '',
            type: '',
            // certification: localStorage.getItem('certificationName'),
            tabData: [
                { title: '전체', value: '' },
                { title: '대기', value: 'pending' },
                { title: '반려', value: 'refuse' },
                { title: '완료', value: 'complete' },
                { title: '참조', value: 'cc' },
                { title: '저장', value: 'save' }
            ],
            eceData: [],
        }
    },
    created() {
        this.commonService = new CommonService();
    },
    mounted() {
        this.getEcepayment();
        this.dateformat();
    },
    watch: {
        '$store.state.header.certificate': function (newVal, oldVal) {
            if (newVal != oldVal && newVal) {
                this.getEcepayment();
            }
        }
    },
    methods: {
        changeTab(tabName) {
            console.log(tabName);
            let selectedTab = this.tabData.find(function (item) {
                return item.title == tabName;
            });
            this.type = selectedTab.value;
            this.getEcepayment();
        },

        // get electronic data
        getEcepayment() {
            this.commonService.ecePayment(this.page, this.limit, this.type, this.$store.state.header.certificate)
                .then((res) => {
                    this.eceData = res.data.transaction_list
                    this.totalRecords = this.eceData.length;
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        evidenceDetails(item) {
            console.log(item)
            let e_id = item.evidence_id
            let t_id = item.id

            this.$router.push(
                `/EvidencePayment/${e_id}/${t_id}`
            );
        },
        // pagination
        myCallback(ClickPage) {
            this.page = ClickPage;
            this.getEcepayment();
        },
        // date formate fn
        dateformat(value) {
            if (value) {
                return moment(String(value)).format("YYYY-MM-DD hh:mm");
            }
        },
    }
}
</script>

<style lang="scss">
.download_row{
    &:hover{
        cursor: pointer;
    }
}
</style>