<script>
/*
|--------------------------------------------------------------------------
| Core.vue
|--------------------------------------------------------------------------
|
*/
import Form from '@/components/Form'
import InputText from '@/components/partials/InputText'
import Select from '@/components/partials/Select'
import InputPassword from '@/components/partials/InputPassword'
import ListRelation from '../../Relations/views/ListRelation'

/*
|--------------------------------------------------------------------------
| Config
|--------------------------------------------------------------------------
|
*/
import localConfig from '../config/component'

/*
|--------------------------------------------------------------------------
| Form
|--------------------------------------------------------------------------
|
*/
export default {
  extends: Form,
  components: {
    'input-text': InputText,
    'custom-select': Select,
    'input-password': InputPassword,
    'list-relation': ListRelation
  },
  data () {
    return {
      config: localConfig,
      roles: [
        {id: 'admin', name: 'Admin'},
        {id: 'director', name: 'Director'},
        {id: 'manager', name: 'Manager'},
        {id: 'administration', name: 'Administration'},
        {id: 'operator', name: 'Operator'},
        {id: 'commercial', name: 'Commercial'},
        {id: 'managertasks', name: 'Manager tasks'},
        {id: 'user', name: 'User'},
      ]
    }
  }
}
</script>

<template>
  <form v-if="item" v-on:submit.prevent="__send">
    <!-- Email -->
    <input-text :field="config.fields[0]" :item="item" :disabledCondition="!isNew"></input-text>
    <!-- Role -->
    <custom-select :field="config.fields[2]" :item="item" :values="roles"></custom-select>
    <!-- Password -->
    <input-password :field="config.fields[1]" :item="item"></input-password>
    <!-- Relations -->
    <list-relation v-if="!isNew"></list-relation>
  </form>
</template>
