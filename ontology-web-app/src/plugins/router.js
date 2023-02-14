import { createRouter, createWebHistory } from 'vue-router'

// 1. Define route components.
// These can be imported from other files
import Search from '@/views/search/Search.vue'
import Search2 from '@/views/search/Search2.vue'
import Detail from '@/views/detail/Detail.vue'
// import SearchView from '@/views/search-view/SearchView.vue'

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
  { name: 'home', path: '/search', component: Search },
  { name: 'detail', path: '/detail', component: Detail },
  { name: 'search', path: '/', component: Search2 },
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
export const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
});