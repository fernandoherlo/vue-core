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
    <datepicker v-validate="field.validate" :name="field.label" :input-class="{'is-danger': errors.has(field.label)}" v-model="item[field.field]" :format="field.dateInputFormat" :bootstrap-styling="field.bootstrapStyling" :monday-first="true" :language="es"></datepicker>
    <span class="error" v-show="errors.has(field.label)">{{ errors.first(field.label) }}</span>
  </div>
</template>

<style lang="sass" scoped>
</style>
