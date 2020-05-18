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
      // Degub
      this.$log.debug('EVENT', event)

      var files = event.target.files || event.dataTransfer.files
      var file = new FormData()
      file.append('file', files[0])
      // Degub
      this.$log.debug('EVENT', file)
      
      this.item[this.field.field] = file

      // var files = event.target.files || event.dataTransfer.files
      // var file = new FormData()
      // file.append('file', files[0])
      // this.item.upload = file
      // this.item.file = files[0].name
      // this.item.name = files[0].name
      // this.item.upload.append('public_photo', this.item.public_photo)
      // $('.custom-file-control').attr('data-before', files[0].name)
    }
  }
}
</script>

<template>

  <div class="custom-file" :class="[{ 'form-control-hidden-print': valueForPrint }, classCss]">
    <input type="file" class="custom-file-input" :name="field.label" :class="{'has-error': errors.has('formDefaultValidate.' + field.label)}" :id="field.label" v-validate="field.validate" :disabled="disabledCondition" v-on:change="onFileChange">
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
