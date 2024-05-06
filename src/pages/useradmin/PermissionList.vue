<template>
  <div class="info_protection UserAdmin">

    <div class="heading flex justify-between align-end">
      <h4>Permission classification management</h4>
      <div class="history_wrap">
        <span>Authority Name</span>
        <div class="input-field">
          <input type="text" class="form-control" placeholder="Enter authority name" v-model="authority_name" />
        </div>

      </div>
    </div>
    <div class="policy_setting_wrap">
      <div class="datatable_head flex justify-between">

      </div>
    </div>



    <!-- ========== -->
    <div class="tab-style-two">
      <TabWrapper>
        <Tabs title="ISMS">
          <div class="list-main-wrap">
            <div class="list-warp">
              <div class="left">
                <p>Policy management</p>
              </div>
              <div class="right">
                <div class="first_list">
                  <ul>
                    <li>Information Protection Policy</li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="list-warp">
              <div class="left">
                <p>Asset management</p>
              </div>
              <div class="right">
                <div class="first_list">
                  <ul>
                    <li>asset list</li>
                    <li><a href="#">Correction</a></li>
                    <li><button type="button">Download</button></li>
                  </ul>
                </div>
                <div class="first_list">
                  <ul>
                    <li>Network diagram</li>
                    <li><a href="#">Correction</a></li>
                    <li><button type="button">Download</button></li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="list-warp">
              <div class="left">
                <p>Manager</p>
              </div>
              <div class="right">
                <div class="first_list">
                  <ul>
                    <li>asset list</li>
                    <li><a href="#">Correction</a></li>
                    <li><button type="button">Download</button></li>
                  </ul>
                </div>
                <div class="first_list">
                  <ul>
                    <li>asset list</li>
                    <li class="active">Correction</li>
                    <li class="in_active">Download</li>
                  </ul>
                </div>
                <div class="first_list">
                  <ul>
                    <li>asset list</li>
                    <li>Correction</li>
                    <li>Download</li>
                  </ul>
                </div>
                <div class="first_list">
                  <ul>
                    <li>Network diagram</li>
                    <li><a href="#">Correction</a></li>
                    <li><button type="button">Download</button></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Tabs>
        <Tabs title="ISO27001"> Tab 2 Cont</Tabs>
      </TabWrapper>
    </div>


  </div>

</template>


<script>
import TabWrapper from "@/components/TabWrapper.vue";
import AuthorityName from "./Modal/AuthorityName.vue";
import Tabs from "@/components/Tabs.vue";
import PermissionClassificationService from "@/services/PermissionClassificationService";
export default {
  name: "PermissionList",
  components: {
    Tabs,
    TabWrapper,
    AuthorityName,
  },


};
</script>


<style lang="scss">
</style>