import { createRouter, createWebHistory } from 'vue-router'
import CodeEvaluator from '../components/CodeEvaluator.vue'

const routes = [
  { path: '/', component: CodeEvaluator }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
