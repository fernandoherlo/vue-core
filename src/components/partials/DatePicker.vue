<script>
/*
|--------------------------------------------------------------------------
| Date Picker
|--------------------------------------------------------------------------
|
*/
import Datepicker from 'vuejs-datepicker';
import {en, es} from 'vuejs-datepicker/dist/locale'

export default {
  components: {
    Datepicker
  },
  data () {
    return {
      en: en,
      es: es
    }
  },
  props: {
    item: {
      type: Object,
      required: false
    },
    field: {
      type: Object,
      required: false
    },
    disabledCondition: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<template>
  <div class="form-group">
    <label>{{ field.label }}</label>
    <datepicker v-model="item[field.field]" :format="field.dateInputFormat" :monday-first="true" :language="es"></datepicker>
  </div>
</template>

<style lang="sass" scoped>
</style>
