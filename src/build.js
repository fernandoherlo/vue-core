/**
 * @name VueJS VueCore (vue-core)
 * @description Library for Vue.js 2.0
 */
 // Services
import auth from '@/services/auth'
import http from '@/services/http'
import api from '@/services/api'
import acl from '@/services/acl'
import helper from '@/services/helper'
import { EventBus } from '@/services/event-bus.js';
// Vuex
import VuexLoad from '@/vuex/modules/load'
import VuexGetters from '@/vuex/getters'
import VuexActions from '@/vuex/actions'
import VuexMutations from '@/vuex/mutations'
// Mixins
import Events from '@/mixins/events'
// Views
import Callback from '@/views/Callback'
// Core
import Core from '@/components/Core'
import Edit from '@/components/Edit'
import Form from '@/components/Form'
import List from '@/components/List'
import ListInline from '@/components/ListInline'
import New from '@/components/New'
import install from '@/components/install'
// Partials
import InputText from '@/components/partials/InputText'
import InputHidden from '@/components/partials/InputHidden'
import InputPassword from '@/components/partials/InputPassword'
import InputCheck from '@/components/partials/InputCheck'
import Select from '@/components/partials/Select'
import Textarea from '@/components/partials/Textarea'
import DatePicker from '@/components/partials/DatePicker'
import Dropbox from '@/components/partials/Dropbox'
// Config
import { buttonsName } from '@/config/button'
import { globalTableConfig } from '@/config/table'
import { baseTableColumns } from '@/config/table'
import { baseComponentFunction } from '@/config/component'


export {
  auth,
  http,
  api,
  acl,
  helper,
  EventBus,
  VuexLoad,
  VuexGetters,
  VuexActions,
  VuexMutations,
  Events,
  Callback,
  Core,
  Edit,
  Form,
  List,
  ListInline,
  New,
  InputText,
  InputHidden,
  InputPassword,
  InputCheck,
  Select,
  Textarea,
  DatePicker,
  Dropbox,
  buttonsName,
  globalTableConfig,
  baseTableColumns,
  baseComponentFunction,
  install
}
