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
      // 500 ms and VALIDATE!
      setTimeout(() => {
        // Validate
        this.$nextTick(() => {
          this.$refs.formdefault.$children.forEach(vm => {
            vm.$validator.validate()
          })
          this.$refs.formdefault.$validator.validate()
        })
      }, 500)
    }
  }
}
</script>
