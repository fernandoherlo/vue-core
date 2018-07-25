<script>
/*
|--------------------------------------------------------------------------
| CORE component & config
|--------------------------------------------------------------------------
|
*/
import CoreComponent from '@/components/Core'
import componentConfig from '@/components/component'


/*
|--------------------------------------------------------------------------
| Extend
|--------------------------------------------------------------------------
|
*/
export default {
  extends: CoreComponent,
  data () {
    return {
      items: [],
      config: componentConfig
    }
  },
  computed: {
    itemsVuex () {
      return this.$store.getters['all' + this.config.coreExtendVuexPl]
    }
  }
}
</script>

<template>
  <div>
    LIST CORE
    <ul>
      <li v-for="item in itemsVuex" v-bind:key="item.id">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>


<style lang="sass">
</style>
