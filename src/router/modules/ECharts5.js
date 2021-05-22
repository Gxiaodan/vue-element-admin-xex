/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const chartsRouter = {
  path: '/ECharts5',
  component: Layout,
  redirect: 'noRedirect',
  name: 'ECharts5',
  meta: {
    title: 'ECharts5',
    icon: 'chart'
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/ECharts5/index'),
      name: 'index',
      meta: { title: 'index', noCache: true }
    },
    {
      path: 'dynamicBar',
      component: () => import('@/views/ECharts5/dynamicBar'),
      name: 'dynamicBar',
      meta: { title: 'dynamicBar', noCache: true }
    },
    {
      path: 'dynamicLine',
      component: () => import('@/views/ECharts5/dynamicLine'),
      name: 'dynamicLine',
      meta: { title: 'dynamicLine', noCache: true }
    },
    {
      path: 'dynamicPie',
      component: () => import('@/views/ECharts5/dynamicPie'),
      name: 'dynamicPie',
      meta: { title: 'dynamicPie', noCache: true }
    }
  ]
}

export default chartsRouter
