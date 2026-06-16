import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/projects/atwp',
    name: 'atwp',
    component: () => import('../views/projects/AtwpView.vue'),
  },
  {
    path: '/projects/epaper',
    name: 'epaper',
    component: () => import('../views/projects/EpaperView.vue'),
  },
  {
    path: '/projects/running-text',
    name: 'running-text',
    component: () => import('../views/projects/RunningTextView.vue'),
  },
  {
    path: '/portfolio',
    name: 'portfolio',
    component: () => import('../views/portfolio/FlipBookViewer.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router