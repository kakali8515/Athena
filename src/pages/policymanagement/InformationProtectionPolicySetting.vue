<template>
    <div class="info_protection">
         <div class="breadcrumb">
           <p>Home <span>></span><a href="#"> Policy management </a><span>></span> Information Protection Policy</p>
       </div>
       <div class="heading flex justify-between align-end">
           <h4>Information Protection Policy Settings</h4>
       </div>
       <div class="policy_setting_wrap">
           <div class="left_wrap">
               <div class="select_group flex justify-start">
                   <select v-model="groupId" @change="evidenceChange">
                       <option value="" disabled>Please select a policy group</option>
                       <option :value="item.id" v-for="(item,index) in groupList" :key="index">{{item.group_name}}</option>
                   </select>
                   <button @click="deletePolicyGroup" type="button">Delete</button>
               </div>
               <span class="error-msg">{{error.groupId}}</span>
               <div class="flex flex-col">
                    <div class="overflow-x-auto protection_table border-0">
                        <div class="inline-block min-w-full">
                        <div class="overflow-hidden">
                            <table class="min-w-full text-center">
                            <thead class="bg-gray-50">
                                <tr>
                                  <th scope="col" class="
                                  justify-center
                                  text-sm
                                  font-medium
                                  text-gray-900
                                  px-6
                                  py-4
                                ">
                                <div class="flex items-center">
                                  <input id="default-checkbox" type="checkbox" value="" class="
                                      w-4
                                      h-4
                                      text-blue-600
                                      bg-gray-100
                                      rounded
                                      border-gray-300
                                      focus:ring-blue-500
                                      dark:focus:ring-blue-600
                                      dark:ring-offset-gray-800
                                      focus:ring-2
                                      dark:bg-gray-700 dark:border-gray-600
                                    " @click="selectAll" v-model="allSelected" />
                                </div>
                              </th>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
                                    No
                                </th>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
                                    Area Division
                                </th>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
                                    Proof
                                </th>
                                
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item,index) in evidenceList" :key="index" class="bg-white border-b">
                                <td class="
                                  text-sm text-gray-900
                                  font-light
                                  px-6
                                  py-4
                                ">
                                <div class="flex items-center">
                                  <input id="default-checkbox" type="checkbox" class="
                                      w-4
                                      h-4
                                      text-blue-600
                                      bg-gray-100
                                      rounded
                                      border-gray-300
                                      focus:ring-blue-500
                                      dark:focus:ring-blue-600
                                      dark:ring-offset-gray-800
                                      focus:ring-2
                                      dark:bg-gray-700 dark:border-gray-600
                                    " v-model="selectedItem" @click="selectSingle" :value="item.evidence_id" />
                                </div>
                              </td>
                                <td class="px-6 py-4  text-sm font-medium text-gray-900">{{index+1}}</td>
                                <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                  {{item.evidence_code}}
                                </td>
                                <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                   {{item.evidence}} 
                                </td> 
                                </tr>
                            </tbody>
                            </table>
                        </div>
                        </div>
                    </div>
                </div>
           </div>
           <div class="arrow_btn_wrap">
               <div class="up_button">
                   <button :disabled="groupId==''" type="button"><img src="@/assets/icon/right_single.svg"></button>
                   <!-- <button type="button"><img src="@/assets/icon/right_single.svg"></button> -->
               </div>
               <div class="down_button">
                   <!-- <button type="button"><img src="@/assets/icon/left_single.svg"></button> -->
                   <button :disabled="groupId==''" type="button"><img src="@/assets/icon/left_single.svg"></button>
               </div>
           </div>
            <div class="left_wrap">
               <div class="select_group flex justify-end">
                   <span>Create policy group</span>
                    <input v-model="group_name" type="text" placeholder="그룹명 입력">
                   <button type="button"  @click="addGroup" class="add">Add</button>
               </div>
               <p class="error-msg">{{error.gname}}</p>
               <div class="flex flex-col">
                    <div class="overflow-x-auto protection_table border-0">
                        <div class="inline-block min-w-full">
                        <div class="overflow-hidden">
                            <table class="min-w-full text-center">
                            <thead class="bg-gray-50">
                                <tr>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
                                    No.
                                </th>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
                                    Area Division
                                </th>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
                                    Proof
                                </th>
                                
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item,index) in policyList" :key="index" class="bg-white border-b">
                                <td class="px-6 py-4  text-sm font-medium text-gray-900">14</td>
                                <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                   Establishment and operation of management system
                                </td>
                                <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                    ISMS operation management status
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
       <div class="save_button_wrap fixed-button-wrap">
           <button :class="{ no_cursor: groupId=='' }" type="button">Save</button>
       </div>
    </div>
</template>


<script>
import PolicyManagementService from "@/services/PolicyManagementService";
export default {
  name: 'InformationProtectionPolicySetting',
  data() {
    return {
        group_name:'',
        error: {},
        groupList:[],
        groupId:'',
        certification:'',
        evidenceList:[],
        policyList:[]
    }
  },
  created() {
    this.PolicyManagementService = new PolicyManagementService();
  },
  mounted() {
    this.policyGroupList();
    this.policyEvidenceList();
  },
  methods : {
    addGroup() {
        if(this.group_name=="") {
            this.error.gname="그룹명 입력";
        }
        else {
            this.PolicyManagementService
        .addPolicyGroup(this.group_name)
        .then((res) => {
          if (res.status == 200) {
            this.$router.push(`/InformationProtectionPolicySettingWithContent/${res.data.group_id}`);
          }
          else {
            this.error.gname=res.response.data.error;
          }
        })
        .catch((err) => {
          return;
        });
        }
    },
    policyGroupList() {
        this.PolicyManagementService
        .policyGroupList()
        .then((res) => {
          if (res.status == 200) {
             this.groupList=res.data.policy_group_list;
          }
        })
        .catch((err) => {
          return;
        });
    },
    deletePolicyGroup() {
        if(this.groupId=="") {
            this.error.groupId="Please select a policy group";
        }
        else {
        this.PolicyManagementService
        .deletePolicyGroup(this.groupId)
        .then((res) => {
          if (res.status == 200) {
              this.policyGroupList();
              this.error.groupId="";
              this.groupId="";
              this.$router.push('/InformationProtectionPolicySetting')
          }
        })
        .catch((err) => {
          return;
        });
        }
    },
    policyEvidenceList() {
        this.PolicyManagementService
        .policyEvidenceList(this.certification,this.groupId)
        .then((res) => {
          if (res.status == 200) {
             this.evidenceList=res.data.policy_evidence_list;
          }
        })
        .catch((err) => {
          return;
        });
    },
    groupPolicyList() {
        this.PolicyManagementService
        .groupPolicyList(this.certification,this.groupId)
        .then((res) => {
          if (res.status == 200) {
             this.policyList=res.data.group_policy_list;
          }
        })
        .catch((err) => {
          return;
        });
    },
    evidenceChange(e) {
       this.$router.push(`/InformationProtectionPolicySettingWithContent/${e.target.value}`);
    }
  }
}
</script>