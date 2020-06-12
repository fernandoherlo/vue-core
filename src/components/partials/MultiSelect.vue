<script>
import Multiselect from 'vue-multiselect'

export default {
  components: {
    Multiselect
  },
  data () {
    return {
      value: '',
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
    },
    labelValue: {
      type: String,
      required: false,
      default: 'name'
    },
    trackBy: {
      type: String,
      required: false,
      default: 'id'
    },
    multiple: {
      type: Boolean,
      required: false,
      default: false
    },
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
  },
  methods: {
    onChange (value) {
      if (value) {
        if (this.multiple && Array.isArray(value)) {
          let tmpArray = []
          value.forEach(element => {
            tmpArray.push(element[this.trackBy])
          })
          this.item[this.field.field] = tmpArray
        } else {
          this.item[this.field.field] = value[this.trackBy]
        }
      }
      this.$validator.validate()
    }
  }
}
</script>

<template>
  <div class="form-group select" :class="[{ 'form-control-hidden-print': valueForPrint }, classCss]">
    <multiselect v-validate="field.validate" :name="field.label" :multiple="multiple" :class="{'has-error': errors.has('formDefaultValidate.' + field.label)}" v-model="value" @input="onChange" :label="labelValue" :track-by="trackBy" :showLabels="false" :placeholder="field.labelDefault" :disabled="disabledCondition" :options="values">
      <template slot="option" slot-scope="props">
        <div class="option__desc">
          <span class="option__title">
            <template v-if="typeof valueCustom === 'function'">
              {{ valueCustom(props.option) }}
            </template>
            <template v-else>
              {{ props.option.name }}
            </template>
          </span>
        </div>
      </template>
    </multiselect>
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
