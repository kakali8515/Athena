<template>
  <h1>Home</h1>
  <div class="tab-style-one">
    <TabWrapper>
      <Tabs title="Tab 1"> Tab 1 Cont</Tabs>
      <Tabs title="Tab 2"> Tab 2 Cont</Tabs>
      <Tabs title="Tab 3"> Tab 3 Cont</Tabs>
    </TabWrapper>
  </div>
  <hr>
  <div class="tab-style-two">
    <TabWrapper>
      <Tabs title="Tab 1"> Tab 1 Cont</Tabs>
      <Tabs title="Tab 2"> Tab 2 Cont</Tabs>
      <Tabs title="Tab 3"> Tab 3 Cont</Tabs>
    </TabWrapper>
  </div>

</template>


<script>
import TabWrapper from '@/components/TabWrapper.vue';
import Tabs from '@/components/Tabs.vue';
export default {
  name: 'HomeVue',
  components: { 
    Tabs, 
    TabWrapper,
  },
}
</script>


<style lang="scss">
</style>