<template>
    <div class="info_protection">
         <div class="breadcrumb">
           <p><a href="#">Home </a><span>></span> Manager</p>
       </div>
       <div class="heading flex justify-between align-end">
           <h4>Technical diagnosis setting</h4>
            <div class="history_wrap">
              
               <select>
                   <option>Default template</option>
                   <option>Additional Templates</option>
                   <option>[+] Technical diagnosis template add</option>
               </select>
               
           </div>
       </div>
       
       <div class="managmenttable">
           <div class="setting_wrap">  
                <div class="leftbar">
                  <UserAdminSidebar/>
                </div>
                <div class="rightbar">
                    <div class="form_wrap">
                    <div class="wrap">
                            <div class="type">
                                <h4>asset classification:</h4>
                                <p>Item code</p>
                            </div>
                            <div class="type">
                                <h4>asset:</h4>
                                <p>Windows</p>
                            </div>
                        </div>
                        <div class="wrap">
                            <div class="form">
                                <p>Item code</p>
                                <input type="text" placeholder="UNX-201">
                            </div>
                            <div class="form">
                                <p>Item Name</p>
                                <input type="text" placeholder="Item root home, path directory permissions and path settings">
                            </div>
                        </div>
                        <div class="wrap ">
                            <div class="form select_wrap">
                                <p>Standard</p>
                                <textarea placeholder="Enter text here"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>     
        </div>
        <div class="button_wrap fixed-button-wrap flex justify-between">
            <div class="buttons flex justify-start">
                
                
            </div>
            <div class="buttons flex justify-end">
                
                <button type="button">Save</button>
                
            </div>
        </div>
    </div>
</template>

<script>
import UserAdminSidebar from '@/components/UserAdminSidebar.vue';
export default {
  name: 'TechnicalDiagnosisAdd',
   components: {
        UserAdminSidebar,
    },
    
}
</script>


<style lang="scss">
   
</style>