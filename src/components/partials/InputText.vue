<script>

export default {
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
    classCss: {
      type: String,
      required: false
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
  <div class="form-group text" :class="classCss">
    <label>{{ field.label }}</label>
    <template v-if="field.firstFocusForm">
      <input v-validate="field.validate" :name="field.label" :class="{'has-error': errors.has('formDefaultValidate.' + field.label)}" class="form-control" type="text" v-model="item[field.field]" ref="firstFocusForm" :disabled="disabledCondition">
    </template>
    <template v-else>
      <input v-validate="field.validate" :name="field.label" :class="{'has-error': errors.has('formDefaultValidate.' + field.label)}" class="form-control" type="text" v-model="item[field.field]" :disabled="disabledCondition">
    </template>
    <template v-if="valueForPrint">
      <div class="form-control-print">
        {{ item[field.field] }}
      </div>
    </template>
    <span class="error" v-show="errors.has('formDefaultValidate.' + field.label)">{{ errors.first('formDefaultValidate.' + field.label) }}</span>
  </div>
</template>

<style lang="sass" scoped>
</style>
