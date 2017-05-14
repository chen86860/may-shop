<template>
  <div class="addressEditor p-size container-wrap">
    <div class="header">
      <div class="nav">
        <span class="nav-left iconfont icon-houtui"
              @click="back"></span>
        <div class="header-title">{{$route.query.title}}</div>
      </div>
    </div>
    <div class="adsEditor-content">
      <div class="adsEditor-dv p-flex">
        <div><span>联系人</span></div>
        <div>
          <input type="text"
          v-model="address.name"
                 placeholder="请输入联系人">
        </div>
      </div>
      <div class="adsEditor-dv p-flex">
        <div><span>手机号</span></div>
        <div>
          <input type="text"
          v-model="address.mobile"
                 placeholder="请输入手机号">
        </div>
      </div>
      <div class="adsEditor-dv p-flex">
        <div><span>地址</span></div>
        <div>
          <input class="adsDditor-input-btn p-line"
                 type="text"
                 readonly
                 v-model='value'
                 @click='evet'
                 placeholder="请选择">
        </div>
      </div>
      <div class="adsEditor-dv edt-content-last p-flex">
        <div><span>详细地址</span></div>
        <div>
          <input type="text"
          v-model="address.detailAds"
                 placeholder="请输入详细地址">
        </div>
      </div>
    </div>
  
    <div class=" adsEditor-btn">
              <button class="btn p-border p-line p-ads-btn"
              @click='save'>{{$route.query.save?'保存并使用':'保存'}}</button>
      <button class="btn p-border p-line p-ads-btn p-del"
              v-if="$route.query.del"
              @click='dele'>删除</button>
    </div>
  
    <city v-if='show'></city>
  
  </div>
</template>
<script>
import city from '../components/city.vue'
import { Toast, MessageBox } from 'mint-ui'
export default {
  components: {
    city
  },
  data () {
    return {
      value: '',
      address: {
        id: '',
        name: '',
        mobile: '',
        ads: '',
        detailAds: ''
      },
      show: false
    }
  },
  methods: {
    evet () {
      this.show = true
    },
    dele () {
      MessageBox.confirm('确定删除此地址?').then(_ => {
        this.$store.dispatch('delAds', {
          userId: this.$store.state.page.userinfo.id,
          id: this.address.id
        })
        this.$router.back()
        Toast({
          message: '删除地址成功！',
          position: 'bottom'
        })
      })
    },
    back () {
      this.$router.back()
    },
    save () {
      if (this.address.name === '') {
        Toast({
          message: '请输入联系人',
          position: 'bottom'
        })
        return
      }
      if (!this.$route.query.del) {
        this.$store.dispatch('addAds', {
          userId: this.$store.state.page.userinfo.id,
          address: {
            name: this.address.name,
            mobile: this.address.mobile,
            ads: this.value,
            detailAds: this.address.detailAds
          }
        }).then((res) => {
          if (res.code === 0) {
            Toast({
              message: '地址保存成功！',
              position: 'bottom'
            })
            if (this.$route.query.save) {
              let defaultAds = {
                name: this.name,
                mobile: this.mobile,
                ads: this.value,
                detailAds: this.detailAds
              }
              this.$store.commit('saveDefaultAds', defaultAds)
            }
            this.$router.back()
          }
        }).catch(_ => {
          Toast({
            message: 'something was wrong....',
            position: 'bottom'
          })
        })
      } else {
        this.$store.dispatch('updateAds', {
          userId: this.$store.state.page.userinfo.id,
          address: {
            id: this.address.id,
            name: this.address.name,
            mobile: this.address.mobile,
            ads: this.value,
            detailAds: this.address.detailAds
          }
        }).then((res) => {
          if (res.code === 0) {
            Toast({
              message: '地址保存成功！',
              position: 'bottom'
            })
            if (this.$route.query.save) {
              let defaultAds = {
                name: this.name,
                mobile: this.mobile,
                ads: this.value,
                detailAds: this.detailAds
              }
              this.$store.commit('saveDefaultAds', defaultAds)
            }
            this.$router.back()
          }
        }).catch(_ => {
          Toast({
            message: 'something was wrong....',
            position: 'bottom'
          })
        })
      }
    }
  },
  mounted () {
    if (this.$route.query.update) {
      this.address = this.$store.state.page.tem.address || {}
      this.value = this.$store.state.page.tem.address.ads || ''
    }
  }
}
</script>
<style scoped>
.adsDditor-p-btn {
  font-size: .28rem;
  line-height: .3rem;
  margin-top: .3rem;
  width: 4.2rem;
  height: .3rem;
}

.addressEditor {
  color: #3c3c3c;
}

.adsEditor-content {
     margin: .2rem 0 .48rem;
    width: 100%;
    border-bottom: 1px solid #dfdfdf;
    display: flex;
    flex-wrap: wrap
}

.adsEditor-content>div {
  width: 100%;

  height: .9rem;
  line-height: .9rem;
  border-bottom: 1px solid #dfdfdf;
      background-color: #fff;
    font-size: 0.2rem;
}

.adsEditor-content .edt-content-last {
  border-bottom: 0;
}

.adsEditor-content span {
  height: .45rem;
  width: 1.2rem;
}

.adsEditor-content input {
  width: 4.2rem;
}

.adsEditor-btn .btn {
  margin: 0 .2rem;
}
.adsEditor-dv input[type="text"]{
       padding: .1rem .1rem;
    border: 1px solid #d4d4d4;
    border-radius: 2px;
    font-size: .18rem;
    outline: none;
}
.adsEditor-dv>div:first-child{
  text-align: right;
  margin-right: 16px;
}
.p-del{
     margin-top: 30px !important;
    background-color: #fff;
    color: #F44336;
    box-sizing: border-box;
}
</style>
