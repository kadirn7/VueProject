import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import TodoList from '../views/TodoList.vue'
import PomodoroTimer from '../views/PomodoroTimer.vue'
import Calculator from '../views/Calculator.vue'
import Weather from '../views/Weather.vue'
import Gallery from '../views/Gallery.vue'
import Blog from '../views/Blog.vue'
import TicTacToe from '../views/TicTacToe.vue'
import Game2048 from '../views/Game2048.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/todolist',
    name: 'TodoList',
    component: TodoList
  },
  {
    path: '/pomodoro',
    name: 'PomodoroTimer',
    component: PomodoroTimer
  },
  {
    path: '/calculator',
    name: 'Calculator',
    component: Calculator
  },
  {
    path: '/weather',
    name: 'Weather',
    component: Weather
  },
  {
    path: '/gallery',
    name: 'Gallery',
    component: Gallery
  },
  {
    path: '/blog',
    name: 'Blog',
    component: Blog
  },
  {
    path: '/tictactoe',
    name: 'TicTacToe',
    component: TicTacToe
  },
  {
    path: '/2048',
    name: 'Game2048',
    component: Game2048
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 