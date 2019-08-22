/* 此代码自动生成，手动修改将被覆盖 
 * date 2019-8-22 14:19:40 
*/

import Vue from 'vue' 
import Router from 'vue-router' 
Vue.use(Router) 

const carpage2 = () => import('@/views/car/page2')
const emergencypage6 = () => import('@/views/emergency/page6')
const error401 = () => import('@/views/error/401')
const loadingloading = () => import('@/views/loading/loading')
const mapolMap = () => import('@/views/map/olMap')
const recordspage3 = () => import('@/views/records/page3')
const sectiondetails = () => import('@/views/section/details')
const sectionlist = () => import('@/views/section/list')
const sectionpage1 = () => import('@/views/section/page1')
const specialpage4 = () => import('@/views/special/page4')
const videopage5 = () => import('@/views/video/page5')
const emergencycomponentsFarCall = () => import('@/views/emergency/components/FarCall')
const emergencycomponentsOperation = () => import('@/views/emergency/components/Operation')
const emergencycomponentsPosition = () => import('@/views/emergency/components/Position')
const emergencycomponentsPositionMapDialog = () => import('@/views/emergency/components/PositionMapDialog')
const emergencycomponentsUserInfo = () => import('@/views/emergency/components/UserInfo')
const emergencycomponentsYuAnForm = () => import('@/views/emergency/components/YuAnForm')
const emergencycomponentsYuAnFormNew = () => import('@/views/emergency/components/YuAnFormNew')
const emergencycomponentsYuAnInfo = () => import('@/views/emergency/components/YuAnInfo')
const emergencycomponentsYuAnInfoNew = () => import('@/views/emergency/components/YuAnInfoNew')
const emergencycomponentsYuAnItem = () => import('@/views/emergency/components/YuAnItem')
const emergencycomponentsYuAnList = () => import('@/views/emergency/components/YuAnList')
const emergencycomponentsYuAnPeople = () => import('@/views/emergency/components/YuAnPeople')
const emergencycomponentsYuAnPlace = () => import('@/views/emergency/components/YuAnPlace')
const emergencycomponentsYuAnResource = () => import('@/views/emergency/components/YuAnResource')
const emergencycomponentsYuAnStage = () => import('@/views/emergency/components/YuAnStage')
const router = [
    {
        name: "401",
        path: "/401",
        component: error401
    },
    {
        name: "details",
        path: "/details",
        component: sectiondetails
    },
    {
        name: "FarCall",
        path: "/FarCall",
        component: emergencycomponentsFarCall
    },
    {
        name: "list",
        path: "/list",
        component: sectionlist
    },
    {
        name: "loading",
        path: "/loading",
        component: loadingloading
    },
    {
        name: "olMap",
        path: "/olMap",
        component: mapolMap
    },
    {
        name: "Operation",
        path: "/Operation",
        component: emergencycomponentsOperation
    },
    {
        name: "page1",
        path: "/page1",
        component: sectionpage1
    },
    {
        name: "page2",
        path: "/page2",
        component: carpage2
    },
    {
        name: "page3",
        path: "/page3",
        component: recordspage3
    },
    {
        name: "page4",
        path: "/page4",
        component: specialpage4
    },
    {
        name: "page5",
        path: "/page5",
        component: videopage5
    },
    {
        name: "page6",
        path: "/page6",
        component: emergencypage6
    },
    {
        name: "Position",
        path: "/Position",
        component: emergencycomponentsPosition
    },
    {
        name: "PositionMapDialog",
        path: "/PositionMapDialog",
        component: emergencycomponentsPositionMapDialog
    },
    {
        name: "UserInfo",
        path: "/UserInfo",
        component: emergencycomponentsUserInfo
    },
    {
        name: "YuAnForm",
        path: "/YuAnForm",
        component: emergencycomponentsYuAnForm
    },
    {
        name: "YuAnFormNew",
        path: "/YuAnFormNew",
        component: emergencycomponentsYuAnFormNew
    },
    {
        name: "YuAnInfo",
        path: "/YuAnInfo",
        component: emergencycomponentsYuAnInfo
    },
    {
        name: "YuAnInfoNew",
        path: "/YuAnInfoNew",
        component: emergencycomponentsYuAnInfoNew
    },
    {
        name: "YuAnItem",
        path: "/YuAnItem",
        component: emergencycomponentsYuAnItem
    },
    {
        name: "YuAnList",
        path: "/YuAnList",
        component: emergencycomponentsYuAnList
    },
    {
        name: "YuAnPeople",
        path: "/YuAnPeople",
        component: emergencycomponentsYuAnPeople
    },
    {
        name: "YuAnPlace",
        path: "/YuAnPlace",
        component: emergencycomponentsYuAnPlace
    },
    {
        name: "YuAnResource",
        path: "/YuAnResource",
        component: emergencycomponentsYuAnResource
    },
    {
        name: "YuAnStage",
        path: "/YuAnStage",
        component: emergencycomponentsYuAnStage
    }
]

export default new Router({ routes: router })