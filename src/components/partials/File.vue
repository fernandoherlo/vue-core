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
  },
  methods: {
    onFileChange (event) {
      // Item
      var files = event.target.files || event.dataTransfer.files
      
      // Multiple
      if (this.field.multiple) {

        this.item[this.field.field] = files

      } else {

        this.item[this.field.field] = files[0]

        var file_name = files[0].name
        // Related value
        if (this.field.relatedSetValue) {
          this.item[this.field.relatedSetValue] = file_name
        }
        // dom value
        this.$el.getElementsByTagName('label')[0].innerHTML = file_name
      }
    }
  }
}
</script>

<template>

  <div class="custom-file" :class="[{ 'form-control-hidden-print': valueForPrint }, classCss]">
    <input type="file" class="custom-file-input" :name="field.label" :class="{'has-error': errors.has('formDefaultValidate.' + field.label)}" :id="field.label" v-validate="field.validate" :disabled="disabledCondition" v-on:change="onFileChange" :multiple="field.multiple">
    <label class="custom-file-label" :for="field.label">{{ field.label }}</label>
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
