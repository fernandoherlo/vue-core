<template>
  <div class="hello">
    <dl>
      <dt><icon name="comments" scale="2"></icon> {{ countComments }}</dt>
      <dd>comments</dd>
      <dt><icon name="file-alt" scale="2"></icon> {{ countPosts }}</dt>
      <dd>posts</dd>
      <dt><icon name="users" scale="2"></icon> {{ countUsers }}</dt>
      <dd>users</dd>
      <a href="#" @click="test()">TEST</a>
    </dl>
  </div>
</template>

<script>
export default {
  name: 'DashboardCore',
  props: ['auth', 'authenticated'],
  data () {
    return {
    }
  },
  computed: {
    countComments () {
      return this.$store.getters['allCOMMENTS'].length
    },
    countPosts () {
      return this.$store.getters['allPOSTS'].length
    },
    countUsers () {
      return this.$store.getters['allUSERS'].length
    }
  },
  methods: {
    test: function () {
      this.$acl.can('comments', 'Create').then(() => {
        console.log('TRUEEEEE')
      }).catch(() => {
        console.log('FALLSOOO')
      })
    }
  }
}
</script>

<style>
</style>
