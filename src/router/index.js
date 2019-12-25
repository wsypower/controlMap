/* 此代码自动生成，手动修改将被覆盖 
 * date 2019-12-25 9:30:36 
*/


import Vue from 'vue' 
import Router from 'vue-router' 
Vue.use(Router) 


const carPage2 = () => import('@/views/car/page2')

const emergencyPage6 = () => import('@/views/emergency/page6')

const error401 = () => import('@/views/error/401')

const loadingLoading = () => import('@/views/loading/loading')

const mapOlMap = () => import('@/views/map/olMap')

const recordsPage3 = () => import('@/views/records/page3')

const sectionIndex = () => import('@/views/section/index')

const specialPage4 = () => import('@/views/special/page4')

const videoPage5 = () => import('@/views/video/page5')

const sectionComponentsPeopleBaseInfo = () => import('@/views/section/components/PeopleBaseInfo')

const sectionComponentsPeopleDetail = () => import('@/views/section/components/PeopleDetail')

const sectionComponentsPeopleInfo = () => import('@/views/section/components/PeopleInfo')

const sectionComponentsPeopleList = () => import('@/views/section/components/PeopleList')

const sectionComponentsPeopleSignInfo = () => import('@/views/section/components/PeopleSignInfo')

const sectionComponentsWorkTimeInfo = () => import('@/views/section/components/WorkTimeInfo')

const router = [
    {
        name: "/error/401",
        path: "/error/401",
        component: error401
    },
    {
        name: "/loading/loading",
        path: "/loading/loading",
        component: loadingLoading
    },
    {
        name: "/map/olMap",
        path: "/map/olMap",
        component: mapOlMap
    },
    {
        name: "/car/page2",
        path: "/car/page2",
        component: carPage2
    },
    {
        name: "/records/page3",
        path: "/records/page3",
        component: recordsPage3
    },
    {
        name: "/special/page4",
        path: "/special/page4",
        component: specialPage4
    },
    {
        name: "/video/page5",
        path: "/video/page5",
        component: videoPage5
    },
    {
        name: "/emergency/page6",
        path: "/emergency/page6",
        component: emergencyPage6
    },
    {
        name: "/section/components/PeopleBaseInfo",
        path: "/section/components/PeopleBaseInfo",
        component: sectionComponentsPeopleBaseInfo
    },
    {
        name: "/section/components/PeopleDetail",
        path: "/section/components/PeopleDetail",
        component: sectionComponentsPeopleDetail
    },
    {
        name: "/section/components/PeopleInfo",
        path: "/section/components/PeopleInfo",
        component: sectionComponentsPeopleInfo
    },
    {
        name: "/section/components/PeopleList",
        path: "/section/components/PeopleList",
        component: sectionComponentsPeopleList
    },
    {
        name: "/section/components/PeopleSignInfo",
        path: "/section/components/PeopleSignInfo",
        component: sectionComponentsPeopleSignInfo
    },
    {
        name: "/section/index",
        path: "/section/index",
        component: sectionIndex
    },
    {
        name: "/section/components/WorkTimeInfo",
        path: "/section/components/WorkTimeInfo",
        component: sectionComponentsWorkTimeInfo
    }
]

export default new Router({ routes: router })