<script>
/*
|--------------------------------------------------------------------------
| Core.vue
|--------------------------------------------------------------------------
|
*/
import Form from '@/components/Form'
import InputText from '@/components/partials/InputText'

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
    'input-text': InputText
  },
  data () {
    return {
      config: localConfig
    }
  }
}
</script>

<template>
  <form v-if="item" v-on:submit.prevent="__send">
    <!-- Name -->
    <input-text :field="config.fields[0]" :item="item"></input-text>
  </form>
</template>
