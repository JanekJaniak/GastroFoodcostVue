import Vue from 'vue'
import VueRouter from 'vue-router'
import RecipeCostCalculator from '../components/RecipeCostCalculator.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'RecipeCostCalculator',
    component: RecipeCostCalculator
  },
  {
    path: '/IngredientLossCalc',
    name: 'IngredientLossCalc',
  
    component: () => import('../components/IngredientLossCalc.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})
export default router
