import Vue from 'vue'
// 导入Router方法，用来创建自己的router实例
import Router from 'vue-router'

Vue.use(Router)
const Home = () => import('views/home/Home')
const Category = () => import('views/category/Category')
const Cart = () => import('views/cart/Cart')
const Profile = () => import('views/profile/Profile')
const Detail = () => import('views/detail/Detail')
const Message = () => import('views/message/Message')
const Release = () => import('views/release/Release')

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/Home'
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },
    {
      path: '/Category',
      name: 'Category',
      component: Category
    },
    {
      path: '/Cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/Profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/Detail',
      name: 'Detail',
      component: Detail
    },
    // 暂时停止对留言板的访问
    {
      path: '/Message',
      name: 'Message',
      component: Message
    },
    {
      path: '/Release',
      name: 'Release',
      component: Release
    }
  ],
  mode: 'hash'
})


export default router
