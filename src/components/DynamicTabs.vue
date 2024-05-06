<template>
    <div class="tab-content" v-show="title == selectedTitle">
        <slot />
    </div>
</template> 

<script>
import { inject } from 'vue'

export default {
   name: 'DynamicTabs',
   props: ['title'],
   setup(props){
       const selectedTitle = inject('selectedTitle')
    //    console.log("title", props.title)
       return{
           selectedTitle
       }
   }
}
</script>




