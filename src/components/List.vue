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
  },
  methods: {
    __newItem () {
      this.$router.push({name: this.config.coreExtendScope + '-new'})
    },
    __edit (id) {
      this.$router.push({name: this.config.coreExtendScope, params: { id: id }})
    },
    __delete (id) {
      this.$store.dispatch('get' + this.config.coreExtendVuex, id).then(() => {
        this.$store.dispatch('delete' + this.config.coreExtendVuex, this.$store.getters[this.config.coreExtendVuex])
      })
    }
  }
}
</script>

<template>
  <div>
    LIST CORE
    <a @click="__newItem()">New</a>
    <ul>
      <li v-for="item in itemsVuex" v-bind:key="item.id">
        {{ item.name }} <a @click="__delete(item.id)">[X]</a> <a @click="__edit(item.id)">[==]</a>
      </li>
    </ul>
  </div>
</template>


<style lang="sass">
</style>
