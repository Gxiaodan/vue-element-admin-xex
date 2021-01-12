/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const threeRouter = {
  path: '/threejs',
  component: Layout,
  redirect: 'noRedirect',
  name: 'threejs',
  meta: {
    title: 'threejs',
    icon: 'chart'
  },
  children: [
    {
      path: 'threejs',
      component: () => import('@/views/exe/threejs'),
      name: 'threejs',
      meta: { title: 'threejs', noCache: true }
    },
    {
      path: 'threeMap',
      component: () => import('@/views/exe/threejs/threeMap'),
      name: 'threeMap',
      meta: { title: 'threeMap', noCache: true }
    },
    {
      path: 'chinaMap',
      component: () => import('@/views/exe/threejs/china-map'),
      name: 'chinaMap',
      meta: { title: 'chinaMap', noCache: true }
    },
    {
      path: 'chinaMap2',
      component: () => import('@/views/exe/threejs/chinaMap'),
      name: 'chinaMap2',
      meta: { title: 'chinaMap2', noCache: true }
    }
  ]
}

export default threeRouter
