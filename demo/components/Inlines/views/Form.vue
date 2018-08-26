<script>
/*
|--------------------------------------------------------------------------
| Core.vue
|--------------------------------------------------------------------------
|
*/
import Form from '@/components/Form'
import InputText from '@/components/partials/InputText'
import InputHidden from '@/components/partials/InputHidden'

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
    'input-text': InputText,
    'input-hidden': InputHidden
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
    <!-- Id_parent -->
    <input-hidden :field="config.fields[1]" :item="item"></input-hidden>
  </form>
</template>
