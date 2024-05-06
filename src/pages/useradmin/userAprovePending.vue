<template>
  <div class="info_protection UserAdmin">
    <Breadcrumb
      link="../dashboard"
      text1="Home"
      text2="관리자"
      text3="사용자관리"
    />
    <div class="heading flex justify-between align-end">
      <h4 class="border-bottom">사용자 승인</h4>
    </div>
    <div>
      <form class="form_wrap">
        <div class="grid grid-rows-1 grid-cols-2 grid-gap">
          <div class="input-field">
            <p>이메일</p>
            <input
              class="form-control"
              type="text"
              placeholder="이메일"
              readonly
              v-model="email"
            />
          </div>
          <div class="input-field">
            <p>이름</p>
            <input
              class="form-control"
              type="text"
              placeholder="이름"
              readonly
              v-model="name"
            />
          </div>
        </div>
        <div class="grid grid-rows-1 grid-cols-2 grid-gap">
          <div class="input-field">
            <p>전화번호</p>
            <input
              class="form-control"
              type="text"
              placeholder="전화번호"
              readonly
              v-model="mobile"
            />
          </div>
          <div class="input-field">
            <p>부서</p>
            <input
              class="form-control"
              type="text"
              placeholder="부서"
              v-model="department"
            />
            <span class="error-msg">{{ error.department }}</span>
          </div>
        </div>
        <div class="grid grid-rows-1 grid-cols-2 grid-gap">
          <div class="input-field">
            <p>직급</p>
            <input
              class="form-control"
              type="text"
              placeholder="직급"
              v-model="rank"
            />
            <span class="error-msg">{{ error.rank }}</span>
          </div>
          <div class="input-field">
            <p>권한분류</p>
            <div class="input-group">
              <select
                v-model="authority_id"
                class="form-control"
                :disabled="authority_id2"
              >
                <option value="null" disabled>Select</option>
                <option
                  :value="auth.id"
                  v-for="(auth, index) in authList"
                  :key="index"
                >
                  {{ auth.authority_name }}
                </option>
              </select>
              <div>
                <button
                  v-if="authority_id2"
                  @click="deletePermission"
                  type="button"
                  class="input-group-button"
                >
                  제거
                </button>
                <button
                  v-else
                  type="button"
                  class="input-group-button"
                  @click="
                    authority_id == null
                      ? $router.push(`/permission-classification-management`)
                      : $router.push(
                          `/permission-classification-management/${authority_id}`
                        )
                  "
                >
                  권한수정
                </button>
              </div>
            </div>
            <span class="error-msg">{{ error.authority }}</span>
          </div>
        </div>
        <div class="grid grid-cols-2 grid-gap">
          <div class="input-field">
            <p class="IP-access-control">IP 접근통제</p>
            <div class="radio-group">
              <input
                type="radio"
                id="IP-access-control-1"
                v-model="IP_Access_Radio"
                value="full_ip"
              />
              <label for="IP-access-control-1">전체 IP</label>
            </div>
            <div class="radio-group">
              <input
                type="radio"
                id="IP-access-control-2"
                v-model="IP_Access_Radio"
                value="specific_ip"
              />
              <label for="IP-access-control-2">특정 IP</label>
            </div>
            <p class="error-msg">{{ error.IP_Access_Radio }}</p>
            <h6>
              Connection IP:
              {{ last_logged_in_ip == "" ? "0.0.0.0" : last_logged_in_ip }}
            </h6>
            <div class="input-group" v-if="IP_Access_Radio == 'specific_ip'">
              <input
                class="form-control"
                type="text"
                placeholder="Enter IP address"
                v-model="IP_Address"
                @keypress="isNumber($event)"
              />
              <div>
                <button
                  type="button"
                  class="input-group-button"
                  @click="Add_IP_Address"
                >
                  추가
                </button>
              </div>
            </div>
            <div class="mt-2.5" v-if="IP_Access_Radio == 'specific_ip'">
              <div class="input-group">
                <div class="IP-choosen">
                  <p
                    :class="`${IP_Remove === e ? 'selected' : ''}`"
                    v-for="(i, e) in IP_Address_choosen"
                    :key="e"
                    @click="choose_IP_Remove(e)"
                  >
                    {{ i }}
                  </p>
                </div>
                <div>
                  <button
                    type="button"
                    class="input-group-button"
                    @click="Remove_IP"
                    :disabled="this.IP_Remove == null"
                    :class="this.IP_Remove == null ? 'no_cursor' : ''"
                  >
                    제거
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="grid grid-rows-1 grid-cols-2 grid-gap">
          <div class="input-field">
            <div class="field-group">
              <h5 class="field-label">자산그룹</h5>
              <div class="field-container">
                <div class="input-field m-b-0">
                  <div class="radio-group">
                    <input
                      type="radio"
                      id="asset-option-1"
                      value="whole_asset_group"
                      v-model="asset_type"
                    />
                    <label for="asset-option-1">전체 자산그룹</label>
                  </div>
                  <div class="radio-group">
                    <input
                      type="radio"
                      id="asset-option-2"
                      value="specific_asset_group"
                      v-model="asset_type"
                    />
                    <label for="asset-option-2">특정 자산그룹</label>
                  </div>
                  <p class="error-msg">{{ error.asset_type }}</p>
                  <p>자산 그룹</p>
                  <VueMultiselect
                    :disabled="asset_type == 'whole_asset_group'"
                    v-model="Assets"
                    label="group_name"
                    track-by="id"
                    :options="assetList"
                    :multiple="true"
                    :searchable="searchable"
                    :close-on-select="true"
                  ></VueMultiselect>
                </div>
              </div>
            </div>
          </div>
          <div class="input-field">
            <div class="field-group">
              <h5 class="field-label">증적그룹</h5>
              <div class="field-container">
                <div class="input-field m-b-0">
                  <div class="radio-group">
                    <input
                      type="radio"
                      id="Evidence-option-1"
                      v-model="Evidence_type"
                      value="whole_evidence_group"
                    />
                    <label for="Evidence-option-1">전체 증적그룹</label>
                  </div>
                  <div class="radio-group">
                    <input
                      type="radio"
                      id="Evidence-option-2"
                      v-model="Evidence_type"
                      value="specific_evidence_group"
                    />
                    <label for="Evidence-option-2">특정 증적그룹</label>
                  </div>
                  <p class="error-msg">{{ error.Evidence_type }}</p>
                  <p>증적 그룹</p>
                  <!-- <multiselect
                    v-model="Assets"
                    :options="options"
                    :multiple="true"
                    :close-on-select="false"
                    :clear-on-select="false"
                    :preserve-search="true"
                    placeholder="Pick some"
                    label="name"
                    track-by="name"
                    :preselect-first="true"
                  >
                    <template
                      slot="selection"
                      slot-scope="{ values, search, isOpen }"
                      ><span
                        class="multiselect__single"
                        v-if="values.length &amp;&amp; !isOpen"
                        >{{ values.length }} options selected</span
                      ></template
                    >
                  </multiselect> -->

                  <VueMultiselect
                    :disabled="Evidence_type == 'whole_evidence_group'"
                    v-model="Evidence"
                    :multiple="true"
                    :searchable="searchable"
                    :close-on-select="true"
                    :options="evidenceList"
                    label="group_name"
                    track-by="id"
                    locale="ko"
                  >
                  </VueMultiselect>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="grid grid-rows-1 grid-cols-1 grid-gap">
          <div class="account-setting">
            <h5 class="heading-tag">계정 설정</h5>
            <div class="grid grid-rows-1 grid-cols-2 grid-gap">
              <div class="settings-group">
                <p>상태: {{ showStatus }}</p>
                <button
                  :disabled="status == 'blocked'"
                  v-if="
                    this.$route.params.id !==
                      this.$store.state.signin.user_id &&
                    this.is_user_admin != 'y'
                  "
                  type="button"
                  class="primary-btn btn-grey-outline"
                  @click="updateStatus"
                >
                  {{ status == "active" ? "비활성화" : "활성화" }}
                </button>
              </div>
              <div class="settings-group">
                <p>비밀번호 만료일: D-{{ password_expiration_Date }}</p>
                <button
                  v-if="password_expiration_Date > 0"
                  type="button"
                  class="primary-btn btn-grey-outline"
                  @click="passwordExpirationReset"
                >
                  초기화
                </button>
              </div>
            </div>
            <div class="grid grid-rows-1 grid-cols-2 grid-gap">
              <div class="settings-group">
                <p>로그인 실패 횟수: {{ no_login_fails }}</p>
                <button
                  v-if="status == 'blocked'"
                  @click="updateStatus"
                  type="button"
                  class="primary-btn btn-grey-outline"
                >
                  해제
                </button>
              </div>
              <div class="settings-group">
                <p>
                  OTP 설정:
                  {{ is_authenticator_enable == "n" ? "미사용" : "사용" }}
                </p>
                <div>
                  <button
                    type="button"
                    class="primary-btn mr-2.5"
                    :class="
                      is_authenticator_enable == 'y'
                        ? 'btn-blue-outline'
                        : 'btn-grey-outline'
                    "
                    @click="setOTP('y')"
                  >
                    사용
                  </button>
                  <button
                    type="button"
                    class="primary-btn"
                    :class="
                      is_authenticator_enable == 'n'
                        ? 'btn-blue-outline'
                        : 'btn-grey-outline'
                    "
                    @click="setOTP('n')"
                  >
                    미사용
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="grid grid-rows-1 grid-cols-1 grid-gap">
          <div class="input-field">
            <p>승인 거부시 거부 사유를 작성해주세요</p>
            <textarea
              class="form-control"
              rows="7"
              placeholder="승인 거절 사유를 입력해주세요"
              v-model="note"
            ></textarea>
            <span class="error-msg">{{ error.note }}</span>
          </div>
        </div>
        <div class="grid grid-rows-1 grid-cols-2 grid-gap">
          <div>
            <button
              type="button"
              class="primary-btn btn-grey-outline btn-lg btn-100"
              @click="checkMember('rejected')"
            >
              거부
            </button>
          </div>
          <div>
            <button
              type="button"
              class="primary-btn btn-blue-outline btn-lg btn-100"
              @click="checkMember('approved')"
            >
              승인하기
            </button>
          </div>
        </div>
        <!-- <div class="form">
          <div class="flex justify-start">
            <div>
              <div class="form-check">
                <input
                  class="
                    form-check-input
                    appearance-none
                    h-4
                    w-4
                    border border-gray-300
                    rounded-sm
                    bg-white
                    checked:bg-blue-600 checked:border-blue-600
                    focus:outline-none
                    transition
                    duration-200
                    align-top
                    bg-no-repeat bg-center bg-contain
                    float-left
                    cursor-pointer
                  "
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                <label
                  class="form-check-label inline-block text-gray-800"
                  for="flexCheckDefault"
                >
                  Save ID
                </label>
              </div>
            </div>
          </div>
        </div> -->
      </form>
    </div>
  </div>
</template>


<script>
import VueMultiselect from "vue-multiselect";
import userAdmin from "@/services/userAdmin";
import Breadcrumb from "@/components/Breadcrumb.vue";
import PermissionClassificationService from "@/services/PermissionClassificationService";
import Toast from "@/alert/alert.js";
export default {
  name: "ThreatAnalysisSelection",
  components: { VueMultiselect, Breadcrumb },
  data() {
    return {
      IP_Access_Radio: '',
      asset_type: "specific_asset_group",
      Evidence_type: "specific_evidence_group",
      IP_Address: null,
      IP_Address_choosen: [],
      IP_Remove: null,
      Assets: [],
      Evidence: [],
      options: ["list", "of", "options"],
      // member detail
      member_id: this.$route.params.id,
      name: "",
      email: "",
      mobile: "",
      department: "",
      rank: "",
      is_authenticator_enable: "",
      no_login_fails: "",
      status: "",
      password_expiration_Date: "",
      setStatus: "",
      note: "",
      error: {},
      approval_status: "",
      showStatus: "",
      last_logged_in_ip: "",
      authList: [],
      authority_id: "",
      authority_id2: "",
      assetList: [],
      evidenceList: [],
      isActiveInactive: false,
      is_user_admin: "",
    };
  },
  created() {
    this.userAdmin = new userAdmin();
    this.PermissionClassificationService =
      new PermissionClassificationService();
  },
  methods: {
    isNumber: function (evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    Add_IP_Address() {
      if (this.IP_Address) {
        this.IP_Address_choosen.push(this.IP_Address);
        this.IP_Address = null;
      }
    },
    choose_IP_Remove(e) {
      this.IP_Remove = e;
    },
    Remove_IP() {
      this.IP_Address_choosen.splice(this.IP_Remove, 1);
      this.IP_Remove = null;
    },
    asyncFind(query) {
      this.options = findService(query);
    },

    authorityList() {
      this.PermissionClassificationService.authorityList()
        .then((res) => {
          if (res.status == 200) {
            // console.log(res)
            this.authList = res.data.authorityList;
          }
        })
        .catch((err) => {
          return;
        });
    },

    //asset group list
    assetGroupList() {
      this.userAdmin
        .assetGroupList()
        .then((res) => {
          if (res.status == 200) {
            // console.log(res)
            this.assetList = res.data.assets_group_list;
          }
        })
        .catch((err) => {
          return;
        });
    },

    //evidence group list
    evidenceGroupList() {
      this.userAdmin
        .evidenceGroupList()
        .then((res) => {
          if (res.status == 200) {
            // console.log(res)
            this.evidenceList = res.data.evidence_group_list;
          }
        })
        .catch((err) => {
          return;
        });
    },

    //remove permission

    deletePermission() {
      this.PermissionClassificationService.deletePermission(this.member_id)
        .then((res) => {
          if (res.status == 200) {
            this.authority_id = null;
            this.authority_id2 = null;
          }
        })
        .catch((err) => {
          return;
        });
    },

    //member detail

    memberDetails() {
      this.userAdmin
        .getMemberDetail(this.member_id)
        .then((res) => {
          if (res.status == 200) {
             console.log('res.data', res.data);
            this.name = res.data.name;
            this.email = res.data.email;
            this.mobile = res.data.mobile;
            this.department = res.data.department ? res.data.department : "";
            this.rank = res.data.rank ? res.data.rank : "";
            this.is_authenticator_enable = res.data.is_authenticator_enable;
            this.no_login_fails = res.data.no_login_fails;
            this.status = res.data.status;
            this.password_expiration_Date = res.data.password_expired_days;
            this.IP_Access_Radio = res.data.ip_access_type ? res.data.ip_access_type : 'full_ip';
            this.last_logged_in_ip = res.data.last_logged_in_ip;
            this.authority_id = res.data.authority_id;
            this.authority_id2 = res.data.authority_id;
            this.Evidence_type = res.data.allowed_evidence_group_type ? res.data.allowed_evidence_group_type : 'whole_evidence_group';
            this.asset_type = res.data.allowed_asset_group_type ? res.data.allowed_asset_group_type : 'whole_asset_group';
            // this.Assets=res.data.selected_assets_group_list;
            this.is_user_admin = res.data.is_user_admin;

            for (
              let i = 0;
              i < res.data.selected_assets_group_list.length;
              i++
            ) {
              const obj = this.assetList.find(
                (x) => x.id == res.data.selected_assets_group_list[i]
              );
              if (obj) {
                this.Assets.push(obj);
              }
            }

            for (
              let i = 0;
              i < res.data.selected_evidence_group_list.length;
              i++
            ) {
              const obj = this.evidenceList.find(
                (x) => x.id == res.data.selected_evidence_group_list[i]
              );
              if (obj) {
                this.Evidence.push(obj);
              }
            }

            for (let i = 0; i < res.data.accessible_ips.length; i++) {
              this.IP_Address_choosen.push(res.data.accessible_ips[i].ip);
            }

            if (this.status == "active") {
              this.setStatus = "inactive";
              this.showStatus = "활성화";
            }
            if (this.status == "inactive") {
              this.setStatus = "active";
              this.showStatus = "비활성화";
            }
            if (this.status == "blocked") {
              this.setStatus = "active";
              this.showStatus = "Blocked";
            }
          }
        })
        .catch((err) => {
          return;
        });
    },

    setOTP(value) {
      this.userAdmin
        .loginOTPEnable(this.member_id, value)
        .then((res) => {
          if (res.status == 200) {
            // this.memberDetails();
            if (value == "y") {
              this.is_authenticator_enable = "y";
            } else {
              this.is_authenticator_enable = "n";
            }
            Toast.fire({ title: res.data.message });
          }
        })
        .catch((err) => {
          return;
        });
    },

    passwordExpirationReset() {
      this.userAdmin
        .passwordExpirationReset(this.member_id)
        .then((res) => {
          if (res.status == 200) {
            // this.memberDetails();
            this.password_expiration_Date = 0;
            Toast.fire({ title: res.data.message });
          }
        })
        .catch((err) => {
          return;
        });
    },

    updateStatus() {
      this.userAdmin
        .memberUpdateStatus(this.member_id, this.setStatus)
        .then((res) => {
          if (res.status == 200) {
            if (this.showStatus == "Blocked") {
              this.no_login_fails = 0;
            }
            if (this.setStatus == "active") {
              this.setStatus = "inactive";
              this.status = "active";
              this.showStatus = "활성화";
            } else {
              this.setStatus = "active";
              this.status = "inactive";
              this.showStatus = "비활성화";
            }
            Toast.fire({ title: res.data.message });
          }
        })
        .catch((err) => {
          return;
        });
    },

    checkMember(check_approval_status) {
      this.approval_status = check_approval_status;

      if (check_approval_status == "rejected") {
        if (this.note == "") {
          this.error.note = "거절사유를 입력해주세요";
        } else {
          let Assetresult = this.Assets.map((alist) => alist.id);
          let Evidenceresult = this.Evidence.map((elist) => elist.id);

          this.userAdmin
            .memberUpdate(
              this.member_id,
              "",
              this.department,
              this.rank,
              this.asset_type,
              Assetresult,
              this.Evidence_type,
              Evidenceresult,
              this.approval_status,
              this.note,
              "",
              this.IP_Address_choosen
            )
            .then((res) => {
              if (res.status == 200) {
                this.$router.push(`/user-admin`);
                Toast.fire({ title: res.data.message });
              }
            })
            .catch((err) => {
              return false;
            });
        }
      } else {
        this.note = " ";
        this.updateMemberDetails();
      }
    },

    updateMemberDetails() {
      // if (this.department == "") {
      //   this.error.department = "부서명을 입력해 주세요";
      // }
      // if (this.rank == "") {
      //   this.error.rank = "직급을 입력해 주세요";
      // }
      if (this.IP_Access_Radio == null) {
        this.error.IP_Access_Radio = "IP접근통제를 선택해주세요";
      }

      if (this.authority_id == "" || this.authority_id == null) {
        this.error.authority = "권한분류를 선택해주세요";
      }
      if (this.asset_type == "" || this.asset_type == null) {
        this.error.asset_type = "자산그룹을 선택해주세요";
      }
      if (this.Evidence_type == "" || this.Evidence_type == null) {
        this.error.Evidence_type = "증적그룹을 선택해주세요";
      } else {
        let Assetresult = this.Assets.map((alist) => alist.id);
        let Evidenceresult = this.Evidence.map((elist) => elist.id);

        this.userAdmin
          .memberUpdate(
            this.member_id,
            this.authority_id,
            this.department,
            this.rank,
            this.asset_type,
            Assetresult,
            this.Evidence_type,
            Evidenceresult,
            this.approval_status,
            this.note,
            this.IP_Access_Radio,
            this.IP_Address_choosen
          )
          .then((res) => {
            if (res.status == 200) {
              this.$router.push(`/user-admin`);
              Toast.fire({ title: res.data.message });
            }
          })
          .catch((err) => {
            return false;
          });
      }
    },
  },

  addTag(newTag) {
    // console.log(newTag);
    // const tag = {
    //   name: newTag,
    //   code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
    // }
    // this.options.push(tag)
    // this.value.push(tag)
  },

  // watch: {
  //   IP_Access_Radio: function (val) {
  //     console.log(val);
  //   },
  // },

  mounted() {
    this.authorityList();
    this.assetGroupList();
    this.evidenceGroupList();
    this.memberDetails();
  },
};
</script>


<!-- <style src="vue-multiselect/dist/vue-multiselect.css"></style> -->