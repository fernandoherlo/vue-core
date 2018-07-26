<script>
// CORE COMPONENT
import CoreComponentEdit from '@/components/Edit'
// LOCAL CONFIG
import localConfig from '../config/component'
// Form
import Form from './Form'

// Extend
export default {
  extends: CoreComponentEdit,
  // components: {
  //   'comments-form': Form
  // },
  data () {
    return {
      Form: Form,
      config: localConfig,
    }
  },
  methods: {
    __created () {
    }
  }
}
</script>
