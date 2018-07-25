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
      itemID: 0,
      extrasForm: {},
      isNew: false,
      config: componentConfig
    }
  },
  created() {
    this.itemID = parseInt(this.$route.params.id)
    this.$store.dispatch('get' + this.config.coreExtendVuex, this.itemID)
  },
  computed: {
    itemsVuex () {
      return this.$store.getters['all' + this.config.coreExtendVuexPl]
    },
    itemVuex () {
      return this.$store.getters['clone' + this.config.coreExtendVuex]
    }
  },
  watch: {
    itemsVuex: function () {
      this.$store.dispatch('get' + this.config.coreExtendVuex, this.itemID)
    }
  }
}
</script>

<template>
  <div>
    <div v-if="itemsVuex && itemVuex">
      <h5>EOO: {{ itemVuex.name }}</h5>
    </div>
  </div>
</template>

<style lang="sass">
</style>
