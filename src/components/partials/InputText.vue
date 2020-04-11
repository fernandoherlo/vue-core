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
    },
    autocomplete: {
      type: String,
      required: false,
      default: 'on'
    },
    autocorrect: {
      type: String,
      required: false,
      default: 'on'
    },
    autocapitalize: {
      type: String,
      required: false,
      default: 'sentences'
    },
    spellcheck: {
      type: String,
      required: false,
      default: 'on'
    }
  },
  watch: {
    item_value: function (val) {
      if (this.autocapitalize === 'sentences') {
        val = val.charAt(0).toUpperCase() + val.slice(1)
      }
      if (this.autocapitalize === 'characters') {
        val = val.toUpperCase()
      }
      this.$set(this.item, this.field.field, val)
    }
  },
  computed: {
    item_value () {
      return this.item[this.field.field]
    }
  },
}
</script>

<template>
  <div class="form-group text" :class="[{ 'form-control-hidden-print': valueForPrint }, classCss]">
    <label>{{ field.label }}</label>
    <template v-if="field.firstFocusForm">
      <input v-validate="field.validate" :name="field.label" :class="{'has-error': errors.has('formDefaultValidate.' + field.label)}" class="form-control" type="text" v-model="item[field.field]" ref="firstFocusForm" :disabled="disabledCondition" :autocomplete="autocomplete" :autocorrect="autocorrect" :autocapitalize="autocapitalize" :spellcheck="spellcheck">
    </template>
    <template v-else>
      <input v-validate="field.validate" :name="field.label" :class="{'has-error': errors.has('formDefaultValidate.' + field.label)}" class="form-control" type="text" v-model="item[field.field]" :disabled="disabledCondition" :autocomplete="autocomplete" :autocorrect="autocorrect" :autocapitalize="autocapitalize" :spellcheck="spellcheck">
    </template>
    <template v-if="valueForPrint">
      <div class="form-control-print">
        {{ item[field.field] }}
      </div>
    </template>
    <small class="form-text text-muted"><template v-if="field.help">{{ field.help }}</template></small>
    <span class="error" v-show="errors.has('formDefaultValidate.' + field.label)">{{ errors.first('formDefaultValidate.' + field.label) }}</span>
  </div>
</template>

<style lang="sass" scoped>
</style>
