<script>
/*
|--------------------------------------------------------------------------
| CORE component & config
|--------------------------------------------------------------------------
|
*/
import CoreComponentEdit from '@/components/Edit'
import componentConfig from '@/components/component'

/*
|--------------------------------------------------------------------------
| Extend
|--------------------------------------------------------------------------
|
*/
export default {
  extends: CoreComponentEdit,
  data () {
    return {
      config: componentConfig,
      isNew: true
    }
  },
  methods: {
    __construct () {
      // Validate
      this.$nextTick(() => {
        this.$refs.formdefault.$children.forEach(vm => {
          vm.$validator.validate()
        })
        this.$refs.formdefault.$validator.validate()
      })
    }
  }
}
</script>
