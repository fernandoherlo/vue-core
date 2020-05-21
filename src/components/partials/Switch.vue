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
    }
  }
}
</script>

<template>
  <div class="custom-control custom-switch" :class="classCss">
    <template v-if="field.firstFocusForm">
      <input v-validate="field.validate" :name="field.label" type="checkbox" :class="{'has-error': errors.has('formDefaultValidate.' + field.label)}" class="custom-control-input" v-model="item[field.field]" :id="field.label" ref="firstFocusForm" :disabled="disabledCondition">
    </template>
    <template v-else>
      <input v-validate="field.validate" :name="field.label" type="checkbox" :class="{'has-error': errors.has('formDefaultValidate.' + field.label)}" class="custom-control-input" v-model="item[field.field]" :id="field.label" :disabled="disabledCondition">
    </template>
    <label class="custom-control-label" :for="field.label">{{ field.label }}</label>
    <small class="form-text text-muted"><template v-if="field.help">{{ field.help }}</template></small>
    <span class="error" v-show="errors.has('formDefaultValidate.' + field.label)">{{ errors.first('formDefaultValidate.' + field.label) }}</span>
  </div>
</template>

<style lang="sass" scoped>
</style>
