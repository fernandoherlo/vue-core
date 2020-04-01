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
    }
  },
  data () {
    return {
      loading: false,
      filesUploadCount: 0,
      files: [],
      confirm: false
    }
  },
  computed: {
    urlFiles () {
      return this.field.urlFiles + '/' + this.item.id
    },
    deleteFiles () {
      return this.field.deleteFiles + '/' + this.item.id
    },
    urlUpload () {
      return this.field.urlUpload + '/' + this.item.id
    }
  },
  created () {
    this.getFilesDropbox()
  },
  methods: {
    getFilesDropbox: function () {
      var options = {
        url: this.urlFiles,
        method: 'GET'
      }
      this.$http.axios(options).then((dropboxFiles) => {
        this.loading = true
        this.files = dropboxFiles.data
      })
    },
    deleteFilesDropbox: function () {
      this.confirm = true
    },
    cancelDeleteFilesDropbox: function () {
      this.confirm = false
    },
    confirmDeleteFilesDropbox: function () {
      // RESET
      this.resetDropboxElements()
      var options = {
        url: this.deleteFiles,
        method: 'GET'
      }
      this.$http.axios(options).then(() => {
        this.getFilesDropbox()
        // Notify
        if (this.$notify){
          this.$notify({
            group: 'global',
            type: 'success',
            title: 'Delete',
            text: 'Delete element successfull!'
          })
        }
      })
    },
    previewFiles: function () {
      let files = this.$refs.file.files
      if (files) {
        this.filesUploadCount = files.length
        this.$refs.fileSelect.innerText = files.length + this.field.selectText
      } else {
        this.filesUploadCount = 0
        this.$refs.fileSelect.innerText = this.field.addText
      }
    },
    uploadFilesDropbox: function () {
      // Get
      let formData = new FormData()
      let files = this.$refs.file.files
      for (var i = 0; i < files.length; i++) {
        formData.append('file', files[i])
      }
      // RESET
      this.$refs.fileSelect.innerText = this.field.upUpText
      this.resetDropboxElements()
      var options = {
        url: this.urlUpload,
        method: 'POST',
        data: formData
      }
      this.$http.axios(options).then(() => {
        this.getFilesDropbox()
        this.$refs.fileSelect.innerText = this.field.addText
        // Notify
        if (this.$notify){
          this.$notify({
            group: 'global',
            type: 'success',
            title: 'Save',
            text: 'Save element successfull!'
          })
        }
      }, (/*response*/) => {
        this.getFilesDropbox()
        this.$refs.fileSelect.innerText = this.field.addText
      })
    },
    resetDropboxElements: function () {
      this.files = []
      this.filesUploadCount = 0
      this.$refs.file.type = 'text'
      this.$refs.file.type = 'file'
      this.loading = false
      this.confirm = false
    }
  }
}
</script>

<template>
  <div class="dropbox">
    <h3>{{ field.label }}</h3>
    <div class="form-group w100">
      <div class="photos-btns">
        <label class="btn file">
          <span ref="fileSelect">{{ field.addText }}</span> <input type="file" ref="file" multiple hidden @change="previewFiles">
        </label>
        <button type="button" class="btn upload" @click="uploadFilesDropbox()" tabindex="0" :disabled="!filesUploadCount">{{ field.upText }}</button>
        <button v-if="!confirm" type="button" class="btn delete" @click="deleteFilesDropbox()" tabindex="0" :disabled="!files.length">{{ field.deleteText }}</button>
        <button v-if="confirm" type="button" class="btn delete ask" @click="confirmDeleteFilesDropbox()" tabindex="0" :disabled="!files.length">{{ field.confirmDeleteText }}</button>
        <button v-if="confirm" type="button" class="btn cancel" @click="cancelDeleteFilesDropbox()" tabindex="0" :disabled="!files.length">{{ field.cancelDeleteText }}</button>
      </div>
      <template v-if="loading">
        <ul class="photos-list" v-if="files">
          <li v-for="(file, index) in files" v-bind:key="file.metadata.id">
            <a :href="file.link" target="_blank"><small>{{index+1}}</small><img :src="file.link"></a>
          </li>
        </ul>
      </template>
      <template v-else>
        <div class="loading inline">
          <icon name="sync" scale="2" spin></icon>
        </div>
      </template>
    </div>
  </div>
</template>
