webpackJsonp([1],{104:function(e,t,i){t=e.exports=i(32)(),t.push([e.i,".loadingmore{text-align:center;font-size:.22rem;padding:5px 0;color:#8e8e8e}.loadingmore div>span{width:.22rem;height:.22rem;border:2px solid #ff1877;border-radius:50%;-webkit-border-radius:50%;border-bottom-color:#dfdfdf;border-top-color:#dfdfdf;animation:infin .6s linear infinite;-webkit-animation:infin .6s linear infinite;margin-right:5px;position:relative;top:2px}@-webkit-keyframes infin{0%{-webkit-transform:rotate(0)}to{-webkit-transform:rotate(1turn)}}@keyframes infin{0%{-webkit-transform:rotate(0);transform:rotate(0)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}","",{version:3,sources:["F:/Workspace/may-shop/src/components/loadingmore.vue"],names:[],mappings:"AACA,aACE,kBAAmB,AACnB,iBAAkB,AAClB,cAAe,AACf,aAAe,CAChB,AACD,sBACE,aAAc,AACd,cAAe,AACf,yBAA0B,AAC1B,kBAAmB,AACnB,0BAA2B,AAC3B,4BAA6B,AAC7B,yBAA0B,AAC1B,oCAAuC,AACvC,4CAA+C,AAC/C,iBAAkB,AAClB,kBAAmB,AACnB,OAAS,CACV,AACD,yBACA,GACI,2BAA8B,CACjC,AACD,GACI,+BAAmC,CACtC,CACA,AACD,iBACA,GACI,4BAA8B,AACtB,mBAAsB,CACjC,AACD,GACI,gCAAmC,AAC3B,uBAA2B,CACtC,CACA",file:"loadingmore.vue",sourcesContent:["\n.loadingmore {\n  text-align: center;\n  font-size: .22rem;\n  padding: 5px 0;\n  color: #8E8E8E;\n}\n.loadingmore div>span {\n  width: .22rem;\n  height: .22rem;\n  border: 2px solid #ff1877;\n  border-radius: 50%;\n  -webkit-border-radius: 50%;\n  border-bottom-color: #DFDFDF;\n  border-top-color: #DFDFDF;\n  animation: infin 600ms linear infinite;\n  -webkit-animation: infin 600ms linear infinite;\n  margin-right: 5px;\n  position: relative;\n  top: 2px;\n}\n@-webkit-keyframes infin {\nfrom {\n    -webkit-transform: rotateZ(0);\n}\nto {\n    -webkit-transform: rotateZ(360deg);\n}\n}\n@keyframes infin {\nfrom {\n    -webkit-transform: rotateZ(0);\n            transform: rotateZ(0);\n}\nto {\n    -webkit-transform: rotateZ(360deg);\n            transform: rotateZ(360deg);\n}\n}\n"],sourceRoot:""}])},114:function(e,t,i){var o=i(97);"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);i(33)("b896de3a",o,!0)},121:function(e,t,i){var o=i(104);"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);i(33)("01d28c98",o,!0)},128:function(e,t,i){e.exports=i.p+"static/img/img1.2d256c9.png"},129:function(e,t,i){e.exports=i.p+"static/img/img2.64288a4.png"},131:function(e,t,i){i(121);var o=i(1)(i(71),i(148),null,null);e.exports=o.exports},139:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{directives:[{name:"infinite-scroll",rawName:"v-infinite-scroll",value:e.loadMore,expression:"loadMore"}],staticClass:"container",attrs:{"infinite-scroll-disabled":"loading","infinite-scroll-distance":"5"}},[i("div",{staticClass:"header"},[i("div",{staticClass:"header-input"},[i("router-link",{staticClass:"nav",attrs:{to:"/search"}},[i("input",{staticClass:"iconfont icon-search header-search",attrs:{type:"text",placeholder:"搜索"}})])],1),e._v(" "),i("router-link",{staticClass:"shopcar",attrs:{to:{name:"homebuycar"}}})],1),e._v(" "),i("swiper",{staticClass:"banner-swipe",attrs:{options:e.swiperbanner}},[e._l(e.banners,function(t){return i("swiper-slide",{key:t in e.banners,staticClass:"banner-swipe-item"},[i("img",{attrs:{src:t}})])}),e._v(" "),i("div",{staticClass:"swiper-pagination",slot:"pagination"})],2),e._v(" "),i("div",{staticClass:"hot-goods"},e._l(e.goods,function(t){return i("div",{key:t.id},[i("router-link",{attrs:{to:{name:"product",query:{id:t.id}}}},[i("p",[e._v(e._s(t.title))]),e._v(" "),i("p",[e._v(e._s(t.subTitle))]),e._v(" "),i("div",[i("img",{attrs:{src:t.img,alt:""}})])])],1)})),e._v(" "),i("div",{staticClass:"home-msg"},[i("swiper",{staticClass:"title-swipe",attrs:{options:e.swipertitle}},e._l(e.titles,function(t){return i("swiper-slide",{key:t.id,staticClass:"title-swipe-item"},[e._v(e._s(t))])})),e._v(" "),i("div",{staticClass:"home-first"},[e._v("HOT:")])],1),e._v(" "),i("div",{staticClass:"home-ad p-align-justy"},[i("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.adpic,expression:"adpic"}],staticClass:"p-imgloay"})]),e._v(" "),i("div",{staticClass:"home-goods"},[i("p",{staticClass:"home-goods-title"},[e._v("每日推荐")]),e._v(" "),i("div",{staticClass:"home-day-goods"},[i("div",{staticClass:"daygoodslist_0"},[i("a",{attrs:{href:e.daygoodslist_1_0.to}},[i("p",[e._v(e._s(e.daygoodslist_1_0.title))]),e._v(" "),i("p",[e._v(e._s(e.daygoodslist_1_0.subTitle))]),e._v(" "),i("div",[i("img",{attrs:{src:e.daygoodslist_1_0.pic,alt:""}})])])]),e._v(" "),i("div",{staticClass:"daygoodslist"},e._l(e.daygoodslist_1,function(t){return i("div",[i("a",{attrs:{href:t.to}},[i("div",[i("p",[e._v(e._s(t.title))]),e._v(" "),i("p",[e._v(e._s(t.subTitle))])]),e._v(" "),i("div",[i("img",{attrs:{src:t.pic,alt:""}})])])])}))]),e._v(" "),i("div",{staticClass:"home-day-goods"},[i("div",{staticClass:"daygoodslist_0"},[i("a",{attrs:{href:e.daygoodslist_2_0.to}},[i("p",[e._v(e._s(e.daygoodslist_2_0.title))]),e._v(" "),i("p",[e._v(e._s(e.daygoodslist_2_0.subTitle))]),e._v(" "),i("div",[i("img",{attrs:{src:e.daygoodslist_2_0.pic,alt:""}})])])]),e._v(" "),i("div",{staticClass:"daygoodslist"},e._l(e.daygoodslist_2,function(t){return i("div",[i("a",{attrs:{href:t.to}},[i("div",[i("p",[e._v(e._s(t.title))]),e._v(" "),i("p",[e._v(e._s(t.subTitle))])]),e._v(" "),i("div",[i("img",{attrs:{src:t.pic,alt:""}})])])])}))])]),e._v(" "),i("div",{staticClass:"home-goods"},[i("div",{staticClass:"home-goods-title"},[e._v("精选商品")]),e._v(" "),i("cgoods",{attrs:{product:e.goodslist}})],1),e._v(" "),i("loadingmore",{attrs:{isshow:e.loading}}),e._v(" "),i("pageload",{attrs:{isshow:e.pageload}})],1)},staticRenderFns:[]}},148:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"loadingmore"},[e.isshow?i("div",[i("span"),e._v("努力加载中…")]):i("div",[e._v("已经到底了")])])},staticRenderFns:[]}},41:function(e,t,i){i(114);var o=i(1)(i(80),i(139),null,null);e.exports=o.exports},65:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={props:{product:{type:Array}}}},66:function(e,t,i){t=e.exports=i(32)(),t.push([e.i,'.home-goods-list{padding:0 .28rem .18rem .1rem;border-top:1px solid #dfdfdf;border-bottom:1px solid #dfdfdf}.goods{position:relative;padding-left:.18rem;padding-top:.18rem;width:100%;overflow:hidden}.goods-img{height:2rem;border:1px solid #dfdfdf;overflow:hidden;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-line-pack:center;align-content:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.goods-name,.goods-oldprice{font-size:.2rem;margin-top:.1rem}.goods-name{font-size:12px;height:35px;color:#3c3c3c}.goods-oldprice{color:#cccbcb;margin-bottom:.1rem}.goods-newprice{color:#ff3b3b;font-size:.22rem}.goods-vip{background-color:#ff1877;left:.18rem;top:.18rem;padding-left:.05rem;color:#fff;font-size:.18rem;line-height:.34rem;width:1rem}.goods-vip,.goods-vip:before{position:absolute;height:.34rem}.goods-vip:before{content:"";right:-.17rem;top:0;border:.17rem solid #ff1877;box-sizing:border-box;-webkit-box-sizing:border-box;overflow:hidden;border-right-color:transparent}',"",{version:3,sources:["F:/Workspace/may-shop/src/components/goods.vue"],names:[],mappings:"AACA,iBACE,8BAAkC,AAClC,6BAA8B,AAC9B,+BAAiC,CAClC,AACD,OACE,kBAAmB,AACnB,oBAAqB,AACrB,mBAAoB,AACpB,WAAW,AACX,eAAiB,CAClB,AACD,WACE,YAAa,AACb,yBAA0B,AAC1B,gBAAiB,AACjB,oBAAqB,AACrB,oBAAqB,AACrB,aAAc,AACd,0BAA2B,AACvB,qBAAsB,AAC1B,wBAAyB,AACrB,qBAAsB,AAClB,sBAAwB,CACjC,AACD,4BAEE,gBAAiB,AACjB,gBAAkB,CACnB,AACD,YACE,eAAgB,AAChB,YAAa,AACb,aAAe,CAChB,AACD,gBACE,cAAe,AACf,mBAAqB,CACtB,AACD,gBACE,cAAe,AACf,gBAAkB,CACnB,AACD,WAEE,yBAA0B,AAC1B,YAAa,AACb,WAAY,AACZ,oBAAqB,AACrB,WAAY,AACZ,iBAAkB,AAClB,mBAAoB,AAEpB,UAAY,CACb,AACD,6BAXE,kBAAmB,AAQnB,aAAe,CAchB,AAXD,kBACE,WAAY,AAEZ,cAAgB,AAChB,MAAO,AACP,4BAA6B,AAE7B,sBAAuB,AACvB,8BAA+B,AAC/B,gBAAiB,AACjB,8BAAgC,CACjC",file:"goods.vue",sourcesContent:['\n.home-goods-list {\n  padding: 0rem .28rem .18rem .1rem;\n  border-top: 1px solid #DFDFDF;\n  border-bottom: 1px solid #DFDFDF;\n}\n.goods {\n  position: relative;\n  padding-left: .18rem;\n  padding-top: .18rem;  \n  width:100%;\n  overflow: hidden;\n}\n.goods-img {\n  height: 2rem;\n  border: 1px solid #dfdfdf;\n  overflow: hidden;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-line-pack: center;\n      align-content: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n.goods-name,\n.goods-oldprice {\n  font-size: .2rem;\n  margin-top: .1rem;\n}\n.goods-name {\n  font-size: 12px;\n  height: 35px;\n  color: #3C3C3C;\n}\n.goods-oldprice {\n  color: #cccbcb;\n  margin-bottom: .1rem;\n}\n.goods-newprice {\n  color: #FF3b3b;\n  font-size: .22rem;\n}\n.goods-vip {\n  position: absolute;\n  background-color: #ff1877;\n  left: .18rem;\n  top: .18rem;\n  padding-left: .05rem;\n  color: #fff;\n  font-size: .18rem;\n  line-height: .34rem;\n  height: .34rem;\n  width: 1rem;\n}\n.goods-vip:before {\n  content: "";\n  position: absolute;\n  right: -0.17rem;\n  top: 0;\n  border: .17rem solid #ff1877;\n  height: .34rem;\n  box-sizing: border-box;\n  -webkit-box-sizing: border-box;\n  overflow: hidden;\n  border-right-color: transparent;\n}\n'],sourceRoot:""}])},67:function(e,t,i){var o=i(66);"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);i(33)("5182a4e3",o,!0)},68:function(e,t,i){i(67);var o=i(1)(i(65),i(69),null,null);e.exports=o.exports},69:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"home-goods-list clearfix p-flex-float"},e._l(e.product,function(t){return i("div",{key:t.id,staticClass:"goods"},[i("router-link",{attrs:{to:{name:"product"}}},[i("div",{staticClass:"goods-img p-align-justy"},[i("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.pic,expression:"item.pic"}],staticClass:"p-imgloay"})]),e._v(" "),i("div",{staticClass:"goods-name textellipsis"},[e._v("\n        "+e._s(t.names)+"\n      ")])])],1)}))},staticRenderFns:[]}},71:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={props:["isshow"]}},80:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=i(68),n=i.n(o),s=i(131),A=i.n(s),r=i(128),a=i(129);t.default={data:function(){return{banners:[r,a,"https://s2.mogucdn.com/mlcdn/c45406/170322_7jdajecai8j1jj4832h3lf1l5f09e_750x360.jpg_800x9999.v1c7E.70.webp","https://s2.mogucdn.com/mlcdn/c45406/170323_7604eb29kc72b15gj5dk8fc18k212_750x360.jpg"],swiperbanner:{autoplay:3500,pagination:".swiper-pagination",paginationClickable:!0,loop:!0,observeParents:!0},titles:["围观“帝君”领跑扬州+满600减50","泰国茉莉香米松软甘甜，新品减5","满150减10+  满79减5"],swipertitle:{direction:"vertical",loop:!0,autoplay:5e3},adpic:"https://img.alicdn.com/imgextra/i3/99/TB2e.QJdp5N.eBjSZFvXXbvMFXa_!!99-0-yamato.jpg_1152x1920q30s0.jpg",goodslist:[{price:123,pic:"https://s10.mogucdn.com/mlcdn/c45406/170322_3af3d77k9035j4jafk34k41888j70_750x376.jpg_640x999.jpg"},{pic:"https://s10.mogucdn.com/mlcdn/c45406/170322_1fkci5flej46kha9l7f9gfg1fd315_750x376.jpg_640x999.jpg"},{price:123,pic:"https://s2.mogucdn.com/mlcdn/c45406/170321_0lc83e72l792d5j4331f3584fd98h_750x360.jpg_800x9999.v1c7E.70.webp"}],daygoodslist_1_0:{title:" 上衣 ",subTitle:"领券直降100元 ",price:123,pic:"https://s2.mogucdn.com/p2/170320/16681717_7i2fl9liea42kcdi6d22kk81h7ji0_320x360.jpg"},daygoodslist_2_0:{title:" 美鞋尝鲜 ",subTitle:"TOP单品 低至1折",price:123,pic:"https://s2.mogucdn.com/mlcdn/c45406/170323_0419ag6713j63fbfh56gc3ajae1ac_320x360"},daygoodslist_1:[{title:"裤子",subTitle:" 5折抢新 ",price:123,pic:"https://s2.mogucdn.com/mlcdn/c45406/170323_8flcl1120jg89fcd08d5klf9b7a9l_180x180.jpg"},{title:" 裙子 ",subTitle:" 流行不撞衫 ",price:123,pic:"https://s2.mogucdn.com/p2/170320/105897215_1f417i68dfjib1786hdcf1afkc60a_180x180.jpg"}],daygoodslist_2:[{title:" 人气美包 ",subTitle:" 高颜值美包盘点 ",price:123,pic:"https://s2.mogucdn.com/mlcdn/c45406/170322_32la577b09922kgelk8k1c2i2d1j9_180x180.jpg"},{title:" 热辣男友 ",subTitle:" 男友换新装 ",price:123,pic:"https://s2.mogucdn.com/mlcdn/c45406/170322_03e3211e06k36lja4i2fdd93cfeil_180x180.jpg"}],goods:[{to:"",title:"团购",subTitle:"量贩买就送",img:"https://s2.mogucdn.com/p2/170317/105897215_7fecl8jg88ige3lgbfbhb5i17079i_200x200.jpg"},{to:"",title:"优选",subTitle:"最高满减50",img:"https://s10.mogucdn.com/p1/160518/upload_ie4dgojuga4dkojzhazdambqgiyde_120x120.png"},{to:"",title:"新人福利",subTitle:"百款新人好礼",img:"https://s10.mogucdn.com/p1/160401/1ei_ie4dinbwmnsggntbg4zdambqgiyde_120x120.jpg"}],loading:!1,pageload:!1}},components:{cgoods:n.a,loadingmore:A.a},methods:{loadMore:function(){var e=this;this.loading=!0,setTimeout(function(){e.goodslist.push({pic:"http://s2.mogucdn.com/p2/170325/arkmaster_3el2ebda377a75le6hlef58a0b0ac_690x400.png"}),e.loading=!1},1e3)}}}},97:function(e,t,i){t=e.exports=i(32)(),t.push([e.i,".banner-swipe{height:2.6rem}.container{height:10.42rem;overflow-y:scroll}.banner-swipe-item{height:100%;display:-webkit-box;display:-ms-flexbox;display:flex;display:-webkit-flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.banner-swipe-item img{width:100%}.swiper-pagination-bullet{width:5px;height:5px}.swiper-pagination-bullet-active{background-color:#ff1877}.home-msg,.title-swipe{position:relative;padding-left:1.26rem;height:.6rem;line-height:.6rem;color:#3c3c3c;font-size:.25rem;margin:10px 0;background-color:#fff}.title-swipe{padding-left:0}.title-swipe .title-swipe-item>span{margin-right:.16rem;border:1px solid #ff5364;border-radius:50%;height:.33rem;line-height:.33rem;width:.33rem;text-align:center;color:#ff5364}.home-first{position:absolute;left:.28rem;top:0;font-size:.26rem;color:#ff5364}.home-ad{width:6.4rem;height:2.4rem;overflow:hidden;vertical-align:bottom}.home-goods-title{line-height:.72rem;font-size:.22rem;color:#3c3c3c;background-color:#fff;padding-left:20px;margin-top:1em}","",{version:3,sources:["F:/Workspace/may-shop/src/views/home/home.vue"],names:[],mappings:"AACA,cACE,aAAe,CAChB,AACD,WACE,gBAAiB,AACjB,iBAAmB,CACpB,AACD,mBACE,YAAa,AACb,oBAAqB,AACrB,oBAAqB,AACrB,aAAc,AACd,qBAAsB,AACtB,yBAA0B,AACtB,sBAAuB,AACnB,mBAAoB,AAC5B,wBAAyB,AACrB,qBAAsB,AAClB,sBAAwB,CACjC,AACD,uBACE,UAAY,CACb,AACD,0BACE,UAAW,AACX,UAAY,CACb,AACD,iCACE,wBAA0B,CAC3B,AACD,uBAEE,kBAAmB,AACnB,qBAAsB,AACtB,aAAc,AACd,kBAAmB,AACnB,cAAe,AACf,iBAAkB,AAClB,cAAoB,AACpB,qBAAuB,CACxB,AACD,aACE,cAAgB,CACjB,AACD,oCACE,oBAAqB,AACrB,yBAA0B,AAC1B,kBAAmB,AACnB,cAAe,AACf,mBAAoB,AACpB,aAAc,AACd,kBAAmB,AACnB,aAAe,CAChB,AACD,YACE,kBAAmB,AACnB,YAAa,AACb,MAAO,AACP,iBAAkB,AAClB,aAAe,CAChB,AACD,SACE,aAAc,AAEd,cAAe,AACf,gBAAiB,AACjB,qBAAuB,CACxB,AACD,kBACE,mBAAoB,AACpB,iBAAkB,AAClB,cAAe,AACf,sBAAuB,AACvB,kBAAkB,AAClB,cAAe,CAChB",file:"home.vue",sourcesContent:["\n.banner-swipe {\n  height: 2.6rem;\n}\n.container{\n  height: 10.42rem;\n  overflow-y: scroll;\n}\n.banner-swipe-item {\n  height: 100%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  display: -webkit-flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n.banner-swipe-item img {\n  width: 100%;\n}\n.swiper-pagination-bullet {\n  width: 5px;\n  height: 5px;\n}\n.swiper-pagination-bullet-active {\n  background-color: #ff1877;\n}\n.home-msg,\n.title-swipe {\n  position: relative;\n  padding-left: 1.26rem;\n  height: .6rem;\n  line-height: .6rem;\n  color: #3c3c3c;\n  font-size: .25rem;\n  margin: 10px 0 10px;\n  background-color: #fff;\n}\n.title-swipe {\n  padding-left: 0;\n}\n.title-swipe .title-swipe-item>span {\n  margin-right: .16rem;\n  border: 1px solid #ff5364;\n  border-radius: 50%;\n  height: .33rem;\n  line-height: .33rem;\n  width: .33rem;\n  text-align: center;\n  color: #ff5364;\n}\n.home-first {\n  position: absolute;\n  left: .28rem;\n  top: 0;\n  font-size: .26rem;\n  color: #ff5364;\n}\n.home-ad {\n  width: 6.4rem;\n  /*height: 1.6rem;*/\n  height: 2.4rem;\n  overflow: hidden;\n  vertical-align: bottom;\n}\n.home-goods-title {\n  line-height: .72rem;\n  font-size: .22rem;\n  color: #3C3C3C;\n  background-color: #fff;\n  padding-left:20px;\n  margin-top:1em;\n}\n"],sourceRoot:""}])}});
//# sourceMappingURL=1.c8249577162318d10a89.js.map