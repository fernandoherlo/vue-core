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
  <div class="form-group textarea" :class="classCss">
    <label>{{ field.label }}</label>
    <template v-if="field.firstFocusForm">
      <textarea v-validate="field.validate" :name="field.label" :class="{'has-error': errors.has('formDefaultValidate.' + field.label)}" class="form-control" v-model="item[field.field]" ref="firstFocusForm" :disabled="disabledCondition"></textarea>
    </template>
    <template v-else>
      <textarea v-validate="field.validate" :name="field.label" :class="{'has-error': errors.has('formDefaultValidate.' + field.label)}" class="form-control" v-model="item[field.field]" :disabled="disabledCondition"></textarea>
    </template>
    <span class="error" v-show="errors.has('formDefaultValidate.' + field.label)">{{ errors.first('formDefaultValidate.' + field.label) }}</span>
  </div>
</template>

<style lang="sass" scoped>
</style>
