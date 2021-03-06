/**
 * @name VueJS VueCore (vue-core)
 * @description Library for Vue.js 2.0
 */
// Views
import Callback from '@/views/Callback'

// Core
import Core from '@/components/views/Core'
import Edit from '@/components/views/Edit'
import Form from '@/components/views/Form'
import List from '@/components/views/List'
import ListInline from '@/components/views/ListInline'
import ListDrag from '@/components/views/ListDrag'
import New from '@/components/views/New'

import { createPlugin } from '@/components/create'
import { globalTableConfig } from '@/config/table'

// Partials
import InputText from '@/components/partials/InputText'
import InputHidden from '@/components/partials/InputHidden'
import InputPassword from '@/components/partials/InputPassword'
import InputCheck from '@/components/partials/InputCheck'
import Switch from '@/components/partials/Switch'
import Select from '@/components/partials/Select'
import Textarea from '@/components/partials/Textarea'
import DatePicker from '@/components/partials/DatePicker'
import Dropbox from '@/components/partials/Dropbox'
import File from '@/components/partials/File'
import MultiSelect from '@/components/partials/MultiSelect'

export {
  Callback,
  Core,
  Edit,
  Form,
  List,
  ListInline,
  ListDrag,
  New,
  InputText,
  InputHidden,
  InputPassword,
  InputCheck,
  Switch,
  Select,
  Textarea,
  DatePicker,
  Dropbox,
  File,
  createPlugin,
  globalTableConfig,
  MultiSelect
}
