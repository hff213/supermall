import BackTop from 'components/content/backTop/BackTop'
export const backTop11={
  components:{
    BackTop
  },

  data(){
    return {
      isShowBackTop:false
    }
  },
  methods:{
    backClick(){
      this.$refs.scroll.scrollTo(0,0,500)
    }
  }
}