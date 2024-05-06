<template>
  <div>

    <h1>Static tab</h1>
    <TabWrapper>
      <Tabs title="tab 1">
        <p>sdvwevwdbveb</p>
      </Tabs>
      <Tabs title="tab 2">
        <p>svsdv</p>
      </Tabs>
      <Tabs title="tab 3">
        <p>sdvnjyjkwevwdbveb</p>
      </Tabs>
    </TabWrapper>

    <h1>Dynamic tab</h1>
    <DynamicTabWrapper>
      <DynamicTabs v-for="(tab, i) of tabs" :title="tab.title" :key="i">
        <p>{{ tab.content }}</p>
      </DynamicTabs>
    </DynamicTabWrapper>

  </div>
</template>

<script>
// import { reactive, toRefs } from 'vue';
import TabWrapper from './TabWrapper.vue';
import Tabs from './Tabs.vue';
import DynamicTabs from './DynamicTabs.vue';
import DynamicTabWrapper from './DynamicTabWrapper.vue';

export default {
  name: 'DynamicTab',
  components: {
    TabWrapper,
    DynamicTabWrapper,
    Tabs,
    DynamicTabs
  },
  data() {
    return {
      tabs: [
        { title: 'Title 1', content: 'Content 1' },
        { title: 'Title 2', content: 'Content 2' },
        { title: 'Title 3', content: 'Content 3' },
        { title: 'Title 4', content: 'vsvsdv' },
        { title: 'Title 5', content: 'sfdvsdfv 3' },
        { title: 'Title 6', content: 'vsdfvdsfv 3' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
</style>