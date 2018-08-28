<script>
/*
|--------------------------------------------------------------------------
| Date Picker
|--------------------------------------------------------------------------
|
*/
import Datepicker from 'vuejs-datepicker';

export default {
  components: {
    Datepicker
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
    <datepicker v-model="item[field.field]"></datepicker>
  </div>
</template>

<style lang="sass" scoped>
</style>
