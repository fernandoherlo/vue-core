<script>
/*
|--------------------------------------------------------------------------
| Date Picker
|--------------------------------------------------------------------------
|
*/
import Datepicker from 'vuejs-datepicker'
import {en, es} from 'vuejs-datepicker/dist/locale'
import utils from 'vuejs-datepicker/src/utils/DateUtils'

export default {
  components: {
    Datepicker
  },
  data () {
    return {
      en: en,
      es: es,
      utils: utils
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
    },
    valueForPrint: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<template>
  <div class="form-group datepicker" :class="[{ 'form-control-hidden-print': valueForPrint }]">
    <label>{{ field.label }}</label>
    <datepicker v-validate="field.validate" :name="field.label" :input-class="{'has-error': errors.has('formDefaultValidate.' + field.label)}" v-model="item[field.field]" :format="field.dateInputFormat" :bootstrap-styling="field.bootstrapStyling" :monday-first="true" :language="es"></datepicker>
    <template v-if="valueForPrint">
      <div class="form-control-print">
        {{ utils.formatDate(new Date(item[field.field]),field.dateInputFormat,es) }}
      </div>
    </template>
    <small class="form-text text-muted"><template v-if="field.help">{{ field.help }}</template></small>
    <span class="error" v-show="errors.has('formDefaultValidate.' + field.label)">{{ errors.first('formDefaultValidate.' + field.label) }}</span>
  </div>
</template>

<style lang="sass" scoped>
</style>
