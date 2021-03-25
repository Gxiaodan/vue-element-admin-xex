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
      path: 'topology',
      component: () => import('@/views/exe/topology'),
      name: 'topology',
      meta: { title: 'topology', noCache: true }
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
      name: 'v-model和插槽',
      meta: { title: 'v-model和插槽', noCache: true }
    },
    {
      path: 'svg',
      component: () => import('@/views/exe/svg'),
      name: 'svg',
      meta: { title: 'svg', noCache: true }
    },
    {
      path: 'clipboard',
      component: () => import('@/views/exe/clipboard'),
      name: 'clipboard',
      meta: { title: 'clipboard', noCache: true }
    },
    {
      path: 'Scssexe',
      component: () => import('@/views/exe/scssexe'),
      name: 'Scssexe',
      meta: { title: 'Scssexe', noCache: true }
    },
    {
      path: 'dragResize',
      component: () => import('@/views/exe/vue-draggable-resizable'),
      name: 'dragResize',
      meta: { title: 'dragResize', noCache: true }
    },
    {
      path: 'ColorPicker',
      component: () => import('@/views/exe/color-picker/index'),
      name: 'ColorPicker',
      meta: { title: 'ColorPicker', noCache: true }
    },
    {
      path: 'progress',
      component: () => import('@/views/exe/progress/index'),
      name: 'progress',
      meta: { title: 'progress', noCache: true }
    },
    {
      path: 'tagsInput',
      component: () => import('@/views/exe/tagsInput'),
      name: 'slot练习tagsInput',
      meta: { title: 'slot练习', noCache: true }
    },
    {
      path: 'compositionApi',
      component: () => import('@/views/exe/compositionApi'),
      name: 'compositionApi',
      meta: { title: 'compositionApi', noCache: true }
    },
    {
      path: 'recursion',
      component: () => import('@/views/exe/recursion'),
      name: 'recursion',
      meta: { title: '递归', noCache: true }
    },
    {
      path: 'threejs',
      component: () => import('@/views/exe/threejs'),
      name: 'threejs',
      meta: { title: 'threejs', noCache: true }
    }
  ]
}

export default exeRouter
