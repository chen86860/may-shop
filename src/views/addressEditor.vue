<template>
  <div class="addressEditor p-size">
    <div class="header">
      <div class="nav">
        <span class="nav-left iconfont icon-houtui"
              @click="back"></span>
        <div class="header-title">{{$route.query.title}}</div>
        <span class="nav-right nav-address"
              @click="complete">完成</span>
      </div>
    </div>
    <div class="adsEditor-content">
      <div class="adsEditor-dv p-flex">
        <div><span>联系人</span></div>
        <div>
          <input type="text"
                 placeholder="请输入联系人">
        </div>
      </div>
      <div class="adsEditor-dv p-flex">
        <div><span>手机号</span></div>
        <div>
          <input type="text"
                 placeholder="请输入手机号">
        </div>
      </div>
      <div class="p-flex">
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
                 placeholder="请输入详细地址">
        </div>
      </div>
    </div>
  
    <div class=" adsEditor-btn">
      <button class="btn p-border p-line p-ads-btn"
              v-if="$route.query.del"
              @click='dele'>删除</button>
    </div>
  
    <city v-if='show'></city>
  
  </div>
</template>
<script>
import city from '../components/city.vue'
export default {
  components: {
    city
  },
  data () {
    return {
      value: '',
      show: false
    }
  },
  methods: {
    evet () {
      this.show = true
    },
    complete () {
      setTimeout(() => {
        alert('保存成功')
      }, 500)
    },
    dele () {
      alert('删除成功')
    },
    back () {
      this.$router.back()
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
  padding: 0 .2rem;
  width: 6.4rem;
  border-bottom: 1px solid #dfdfdf;
  border-top: 1px solid #dfdfdf;
}

.adsEditor-content>div {
  width: 100%;
  height: .9rem;
  line-height: .9rem;
  border-bottom: 1px solid #dfdfdf;
      background-color: #fff;
    padding-left: 10px;
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
</style>
