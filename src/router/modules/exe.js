/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const exeRouter = {
  path: '/exe',
  component: Layout,
  redirect: 'noRedirect',
  name: 'exe',
  meta: {
    title: 'exe',
    icon: 'chart'
  },
  children: [
    {
      path: 'html2canvas',
      component: () => import('@/views/exe/html2canvas'),
      name: 'html2canvas',
      meta: { title: 'html2canvas', noCache: true }
    },
    {
      path: 'editTable',
      component: () => import('@/views/exe/editTable'),
      name: 'editTable',
      meta: { title: 'editTable', noCache: true }
    },
    {
      path: 'vModel',
      component: () => import('@/views/exe/vModel/index'),
      name: 'v-model',
      meta: { title: 'v-model', noCache: true }
    }
  ]
}

export default exeRouter
