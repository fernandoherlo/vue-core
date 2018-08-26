<script>
/*
|--------------------------------------------------------------------------
| Core.vue
|--------------------------------------------------------------------------
|
*/
import Form from '@/components/Form'
import InputHidden from '@/components/partials/InputHidden'
import Select from '@/components/partials/Select'

/*
|--------------------------------------------------------------------------
| Config
|--------------------------------------------------------------------------
|
*/
import localConfig from '../config/component'

/*
|--------------------------------------------------------------------------
| Form
|--------------------------------------------------------------------------
|
*/
export default {
  extends: Form,
  components: {
    'input-hidden': InputHidden,
    'custom-select': Select
  },
  data () {
    return {
      config: localConfig
    }
  },
  computed: {
    itemsGet1 () {
      return this.$store.getters['all' + this.config.coreExtendVuexGet1]
    }
  },
}
</script>

<template>
  <form v-if="item" v-on:submit.prevent="__send">
    <!-- Id_relation -->
    <custom-select :field="config.fields[0]" :item="item" :values="itemsGet1"></custom-select>
    <!-- Id_parent -->
    <input-hidden :field="config.fields[1]" :item="item"></input-hidden>
  </form>
</template>
