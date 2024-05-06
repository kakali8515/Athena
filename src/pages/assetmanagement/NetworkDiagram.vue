<template>
    <div class="info_protection">
        <Breadcrumb
      link="dashboard"
      text1="Home"
      text2="자산관리"
    />
       <div class="heading flex justify-between align-end">
           <h4>네크워크 구성도</h4>
       </div>
       <div class="policy_setting_wrap">
             <div class="datatable_wrap shadow-none no-padding">
               <ul class="nav nav-tabs flex flex-col md:flex-row flex-wrap list-none border-b-0 pl-0 mb-4" id="tabs-tab"
                    role="tablist">
                    <li class="nav-item" role="presentation" v-for="(items,index) in networkDiagramList" :key="index">
                        <a href="#tabs-one" class="
                        nav-link
                        block
                        font-medium
                        text-xs
                        leading-tight
                        uppercase
                        border-x-0 border-t-0 border-b-2 border-transparent
                        px-6
                        py-3
                        my-2
                        hover:border-transparent hover:bg-gray-100
                        focus:border-transparent
                        " 
                        :class="activeTabId === index ? 'active' : ''"
                        @click="activeTabId = index,selectedId=items.id,ontabchange()"
                        id="`tabs-one-tab`" data-bs-toggle="pill" data-bs-target="#tab1s-one" role="tab" aria-controls="tabs-one"
                        aria-selected="true">{{items.diagram_name}}</a>
                    </li>
                    <button type="button" class="blue_adition" @click="addImage"><img src="@/assets/icon/blue_add.svg"></button>
                </ul>
                <div class="tab-content" id="tabs-tabContent">
                    <div v-for="(items,index) in networkDiagramList" :key="index" class="tab-pane fade show active" id="tabs-one" role="tabpanel" aria-labelledby="tabs-one-tab">
                     <div class="image_thamb overflow-hidden" v-if="activeTabId===index" >
                         <img :src="$store.state.imgBaseURL + items.diagram" :class="class1">
                     </div>
                    </div>
                </div>
            </div>
       </div>
      
        <div class="button_wrap fixed-button-wrap flex justify-between triple_button">
            <div class="buttons flex justify-start">
                <button type="button" class="gray" @click="isImageEditingModal=true">이름변경</button>
            </div>
            <div class="buttons flex justify-cener">
                <button type="button" class="gray" @click="zoomOut()">-취소</button>
                <button type="button" class="gray" @click="zoomIn()">+ 확대</button>
            </div>
            <div class="buttons flex justify-end">
                <button type="button" @click="isDeleteSchematicModal=true" >삭제</button>
            </div>
        </div>
    </div>
    <ImageAdditionModal v-if="isImageAdditionModal" @close="closeImageModal" @getNetworkDiagramDetail="getNetworkDiagramDetail" @openUnableToUploadModal="isUnableToUploadModal= true" @openCheckAttachmentModal = "isCheckAttachmentModal=true"/>
    <UnableToUpload v-if="isUnableToUploadModal" @openUnableToUploadModal="isUnableToUploadModal=false"/>
    <CheckAttachment v-if="isCheckAttachmentModal" @closeCheckAttechmentModal="isCheckAttachmentModal=false" />
    <DeleteTheSchematics v-show="isDeleteSchematicModal" @closeDeleteSchematicsModal="isDeleteSchematicModal= false" @deleteDiagramNetworkData="deleteDiagramNetworkData"/>
    <DeleteCompleted v-if="isDeleteCompleteModal" @conifrmModel="isDeleteCompleteModal=false"/>
    <ImageEditingModal v-if="isImageEditingModal" :selectedId="selectedId" :networkDiagramList="networkDiagramList[activeTabId]" @closeImageEditingModal="isImageEditingModal=false" @getNetworkDiagramDetail="getNetworkDiagramDetail"  @openUnableToUploadModal="isUnableToUploadModal= true"/>
</template>


<script>
import ImageAdditionModal from "@/components/modals/ImageAdditionModal.vue"
import CheckAttachment from '@/components/modals/CheckAttachment.vue'
import DeleteTheSchematics from "@/components/modals/DeleteTheSchematics.vue"
import UnableToUpload from '@/components/modals/UnableToUpload.vue'
import NetworkDiagramService from '@/services/NetworkDiagramService'
import DeleteCompleted from '@/components/modals/DeleteCompleted.vue'
import ImageEditingModal from "@/components/modals/ImageEditingModal.vue"
import Breadcrumb from "@/components/Breadcrumb.vue";
export default {
  name: 'NetworkDiagram',
  components: {
    ImageAdditionModal,
    DeleteTheSchematics,
    UnableToUpload,
    DeleteCompleted,
    CheckAttachment,
    ImageEditingModal,
    Breadcrumb
  },

  data: function () {
    return {
        isImageAdditionModal: false,
        isCheckAttachmentModal: false,
        isDeleteSchematicModal: false,
        isDeleteCompleteModal: false,
        isUnableToUploadModal: false,
        isImageEditingModal: false,
        networkDiagramList: [],
        activeTabId: 0,
        selectedId: 1,
        class1: '',
        zoomValue: 100
    };
  },

  created() {
    this.NetworkDiagramService = new NetworkDiagramService()
  },

  async mounted() {
    await this.getNetworkDiagramDetail()
  },
 watch: {
    "$store.state.header.certificate": function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.getNetworkDiagramDetail()
      }
    },
  },
  methods: {
    addImage() {
        this.isImageAdditionModal = true
    },
    closeImageModal() {
        this.isImageAdditionModal = false
    },
    async getNetworkDiagramDetail() {
        const res = await this.NetworkDiagramService.networkDiagramDetails(this.$store.state.header.certificate)
        if (res.status === 200) {
            this.networkDiagramList = res.data.assets_network_diagram_ist
            this.activeTabId = this.networkDiagramList.length-1
            this.selectedId = res.data.assets_network_diagram_ist[this.activeTabId].id
        }
    },

    async deleteDiagramNetworkData() {
        this.isDeleteSchematicModal = false
        console.log(this.activeTabId)
        const res = await this.NetworkDiagramService.deleteNetworkDiagram(this.selectedId)
        if(res) {
            this.isDeleteCompleteModal = true
            await this.getNetworkDiagramDetail()
        }
        
    },
    ontabchange() {
        this.zoomValue = 100
        this.class1 = "zoom-" + this.zoomValue
    },
    zoomIn() {
        if(this.zoomValue < 200) {
            this.zoomValue = this.zoomValue + 25
            this.class1 = "zoom-" + this.zoomValue
        }
    },

    zoomOut() {
        if(this.zoomValue > 25) {
            this.zoomValue = this.zoomValue - 25
            this.class1 = "zoom-" + this.zoomValue
        }
    }
  },
}
</script>


<style lang="scss">
    $value : (25,50,75,100,125,150,175,200);

    @each $size in $value {
    .zoom-#{$size} {
        transform: scale(#{$size + '%'});
    }
    .triple_button{
        .buttons {
            width:auto !important;
        }
    }
}
</style>