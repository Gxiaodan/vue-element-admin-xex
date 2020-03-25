/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const chartsRouter = {
  path: '/charts',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Charts',
  meta: {
    title: 'Charts',
    icon: 'chart'
  },
  children: [
    {
      path: 'keyboard',
      component: () => import('@/views/charts/keyboard'),
      name: 'KeyboardChart',
      meta: { title: 'Keyboard Chart', noCache: true }
    },
    {
      path: 'line',
      component: () => import('@/views/charts/line'),
      name: 'LineChart',
      meta: { title: 'Line Chart', noCache: true }
    },
    {
      path: 'mix-chart',
      component: () => import('@/views/charts/mix-chart'),
      name: 'MixChart',
      meta: { title: 'Mix Chart', noCache: true }
    },
    {
      path: 'grid-layout',
      component: () => import('@/views/charts/grid-layout'),
      name: 'VueGridLayout',
      meta: { title: 'vue_grid_layout', noCache: true }
    },
    {
      path: 'antVg2Plot',
      component: () => import('@/views/charts/antVg2Plot'),
      name: 'antVg2Plot',
      meta: { title: 'antVg2Plot', noCache: true }
    }
  ]
}

export default chartsRouter
