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
    values: {
      type: Array,
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
    valueCustom: {
      type: Function,
      required: false
    },
    valueForPrint: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    textValue () {
      var valueSelect = this.values.filter(value => value.id === this.item[this.field.field])[0]
      if (typeof this.valueCustom === 'function') {
        return this.valueCustom(valueSelect)
      } else {
        return valueSelect.name
      }
    },
  }
}
</script>

<template>
  <div class="form-group select" :class="[{ 'form-control-hidden-print': valueForPrint }, classCss]">
    <label>{{ field.label }}</label>
    <template v-if="field.firstFocusForm">
      <select v-validate="field.validate" data-vv-validate-on="change" :name="field.label" :class="{'has-error': errors.has('formDefaultValidate.' + field.label)}" class="custom-select" v-model="item[field.field]" ref="firstFocusForm" :disabled="disabledCondition">
        <option disabled>{{ field.labelDefault }}</option>
        <option v-for="val in values" v-bind:value="val.id" v-bind:key="val.id">
          <template v-if="typeof valueCustom === 'function'">
            {{ valueCustom(val) }}
          </template>
          <template v-else>
            {{ val.name }}
          </template>
        </option>
      </select>
    </template>
    <template v-else>
      <select v-validate="field.validate" data-vv-validate-on="change" :name="field.label" :class="{'has-error': errors.has('formDefaultValidate.' + field.label)}" class="custom-select" v-model="item[field.field]" :disabled="disabledCondition">
        <option disabled>{{ field.labelDefault }}</option>
        <option v-for="(val, index) in values" v-bind:value="val.id" v-bind:key="val.id" :selected="index === 0">
          <template v-if="typeof valueCustom === 'function'">
            {{ valueCustom(val) }}
          </template>
          <template v-else>
            {{ val.name }}
          </template>
        </option>
      </select>
    </template>
    <template v-if="valueForPrint">
      <div class="form-control-print">
        {{ textValue }}
      </div>
    </template>
    <small class="form-text text-muted"><template v-if="field.help">{{ field.help }}</template></small>
    <span class="error" v-show="errors.has('formDefaultValidate.' + field.label)">{{ errors.first('formDefaultValidate.' + field.label) }}</span>
  </div>
</template>

<style lang="sass" scoped>
</style>
