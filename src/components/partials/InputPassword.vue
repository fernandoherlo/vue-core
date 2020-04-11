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
  <div class="form-group password" :class="classCss">
    <label>{{ field.label }}</label>
    <template v-if="field.firstFocusForm">
      <input v-validate="field.validate" :name="field.label" :class="{'has-error': errors.has('formDefaultValidate.' + field.label)}" class="form-control" type="password" v-model="item[field.field]" ref="firstFocusForm" :disabled="disabledCondition" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="off">
    </template>
    <template v-else>
      <input v-validate="field.validate" :name="field.label" :class="{'has-error': errors.has('formDefaultValidate.' + field.label)}" class="form-control" type="password" v-model="item[field.field]" :disabled="disabledCondition" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="off">
    </template>
    <small class="form-text text-muted"><template v-if="field.help">{{ field.help }}</template></small>
    <span class="error" v-show="errors.has('formDefaultValidate.' + field.label)">{{ errors.first('formDefaultValidate.' + field.label) }}</span>
  </div>
</template>

<style lang="sass" scoped>
</style>
