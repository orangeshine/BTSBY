import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import Store from '../store/store'
import App from '../app'
import Index from '../page/Index/Index'

import test from '../page/test'

import Login from '../page/PC/Common/Login'
import SignI from '../page/PC/Individual/Sign'
import SignE from '../page/PC/Enterprise/Sign'
import FindPsd from '../page/PC/Common/FindPsd'
import Individual from '../page/PC/Common/Individual'
import Enterprise from '../page/PC/Common/Enterprise'
import News from '../page/PC/Common/News'
import NewsDetail from '../page/PC/Common/NewsDetail'
import AboutUs from '../page/PC/Common/AboutUs'
import HRBackSystemI from '../page/PC/Individual/HRBackSystemI'
import HRBackSystemE from '../page/PC/Enterprise/HRBackSystemE'
import SubmitOrder from '../page/PC/Common/SubmitOrder'
import Pay from '../page/PC/Common/Pay'

import PeripheryTab from '../page/Mobile/PeripheryTab'
import ArticleDetail from '../page/Mobile/ArticleDetail'
import WhyBuy from '../page/Mobile/WhyBuy'
import Service from '../page/Mobile/Service'
import HowBuy from '../page/Mobile/HowBuy'


import SecurityInfo from '../page/Mobile/SecurityInfo'
import PaySecurity from '../page/Mobile/PaySecurity'
import SignM from '../page/Mobile/Sign'
import FindPsdM from '../page/Mobile/FindPsd'
import My from '../page/Mobile/My'
import MyWallet from '../page/Mobile/My/MyWallet'
import PersonalData from '../page/Mobile/My/PersonalData'
import EnterpriseData from '../page/Mobile/Enterprise/EnterpriseInfo'
import PsdModification from '../page/Mobile/My/PsdModification'
import Message from '../page/Mobile/My/Message'
import Feedback from '../page/Mobile/My/Feedback'
import CostRecord from '../page/Mobile/My/CostRecord'
import MyOrder from '../page/Mobile/My/MyOrder'
import MyOrderE from '../page/Mobile/Enterprise/MyOrder'
import MyOrderDetail from '../page/Mobile/My/MyOrderDetail'
import MyOrderDetailE from '../page/Mobile/Enterprise/MyOrderDetail'
import SecurityRecord from '../page/Mobile/My/SecurityRecord'
import Calculation from '../page/Mobile/Calculation'
import Search from '../page/Mobile/Search'
import CityInfo from '../page/Mobile/CityInfo'
import MyOrderPull from '../page/Mobile/My/MyOrderPull'

import {deviceInfo} from "../util/device"
import {setCookie,getCookie} from '../util/utils'

import {MessageChange} from "../util/utils"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: App,
    children: [
    {path: '/Index', name: '??????', component: Index},
    {path: '/test', name: 'test', component: test},
    {path: '/Login', name: '??????', component: Login},
    {path: '/SignI', name: '????????????', component: SignI},
    {path: '/SignE', name: '????????????', component: SignE},
    {path: '/FindPsd', name: '????????????', component: FindPsd},
    {path: '/Individual', name: '?????????', component: Individual},
    {path: '/Enterprise', name: '?????????', component: Enterprise},
    {path: '/News', name: '????????????', component: News},
    {path: '/NewsDetail/:id', name: '????????????', component: NewsDetail},
    {path: '/AboutUs', name: '????????????', component: AboutUs},
    {path: '/SubmitOrder', name: '????????????', component: SubmitOrder,meta: {requireAuth: false},},
    {path: '/Pay', name: '????????????', component: Pay,meta: {requireAuth: false},},

    
    {path: '/HRBackSystemI', name: 'HR????????????(??????)', component: HRBackSystemI,meta: {requireAuth: true}},
    {path: '/HRBackSystemE', name: 'HR????????????(??????)', component: HRBackSystemE,meta: {requireAuth: true}},

    {path: '/PeripheryTab', name: '????????????', component: PeripheryTab},
    {path: '/ArticleDetail/:id', name: '??????', component: ArticleDetail},
    {path: '/SignM', name: '??????', component: SignM},
    {path: '/FindPsdM', name: '????????????', component: FindPsdM},
    {path: '/WhyBuy', name: '??????????????????', component: WhyBuy},
    {path: '/Service', name: '??????????????????', component: Service},
    {path: '/HowBuy', name: '??????????????????', component: HowBuy},
    {path: '/SecurityInfo', name: '????????????', component: SecurityInfo,meta: {requireAuth: true}},
    {path: '/PaySecurity', name: '????????????', component: PaySecurity,meta: {requireAuth: true}},
    {path: '/My', name: '??????', component: My,meta: {requireAuth: false}},
    {path: '/MyWallet', name: '????????????', component: MyWallet,meta: {requireAuth: true}},
    {path: '/PersonalData', name: '????????????', component: PersonalData,meta: {requireAuth: true}},
    {path: '/EnterpriseData', name: '????????????', component: EnterpriseData,meta: {requireAuth: true}},
    {path: '/PsdModification', name: '????????????', component: PsdModification,meta: {requireAuth: true}},
    {path: '/Message', name: '????????????', component: Message,meta: {requireAuth: true}},
    {path: '/Feedback', name: '????????????', component: Feedback,meta: {requireAuth: true}},
    {path: '/CostRecord', name: '????????????', component: CostRecord,meta: {requireAuth: true}},
    {path: '/MyOrder', name: '????????????(??????)', component: MyOrder,meta: {requireAuth: true}},
    {path: '/MyOrderE', name: '????????????(??????)', component: MyOrderE,meta: {requireAuth: true}},
    {path: '/MyOrderDetail/:OrderNo', name: '????????????(??????)', component: MyOrderDetail,meta: {requireAuth: false}},
    {path: '/MyOrderDetailE/:OrderNo', name: '????????????(??????)', component: MyOrderDetailE,meta: {requireAuth: false}},
    {path: '/SecurityRecord', name: '????????????', component: SecurityRecord,meta: {requireAuth: true}},
    {path: '/Calculation', name: '???????????????', component: Calculation},
    {path: '/Search', name: '?????????', component: Search},
    {path: '/CityInfo/:CityCode', name: '??????????????????', component: CityInfo},
    
{path: '/MyOrderPull', name: 'MyOrderPull', component: MyOrderPull},

      {path:'*', redirect: '/Index'}
      // {path: '/article/:id', name: 'article', component: Article},
    ]
  }
]
const router = new VueRouter({
  routes: routes, // short for routes: routes
  //linkActiveClass: 'active',  // router-link??????????????????class???????????????????????????
  saveScrollPosition: true ,//??????????????????????????? html5????????????
  //mode: 'history',
  //ashbang: false,
  history: true
})
//????????????
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {  // ???????????????????????????????????????
        if (getCookie('btsby_cookie')) {  // ??????vuex state???????????????token????????????
            next()
        }
        else {
            localStorage.clear();
            Store.state.userInfo.username = ''
            Store.state.userInfo.member_id = ''
            Store.state.ifLogined = false
            next({
                path: '/Login',
            })
        }
    }
    else {
        next();
    }
})
//??????????????????????????????
router.afterEach((to, from, next) => {
  var ISMobile = deviceInfo()
  Store.state.activeRoute=to.name;
  Store.state.isMobile=ISMobile;
  document.title = to.name;
  Store.commit('ROUTE_CHANGE',{activeRoute: to.name})
  //??????????????????
  MessageChange()
})
export default router
