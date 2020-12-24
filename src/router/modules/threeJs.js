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
    }
  ]
}

export default threeRouter
