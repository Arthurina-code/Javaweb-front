import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  // createWebHistory: The route path does not include a # symbol. (In production, the project cannot be accessed directly and requires Nginx forwarding.)
  // createWebHashHistory: The route path includes a # symbol.

  history: createWebHashHistory(), 
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/Home')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/Register')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login')
    },
    {
      path: '/feadback',
      name: 'feadback',
      component: () => import('@/views/FeadBack')
    },
    {
      path: '/news/:id',
      name: 'news',
      component: () => import('@/views/News')
    },
    {
      path: '/bookclass',
      name: 'bookclass',
      component: () => import('@/views/BookClass')
    },
    {
      path: '/book_rank',
      name: 'bookRank',
      component: () => import('@/views/BookRank')
    },
    {
      path: '/book/:id',
      name: 'book',
      component: () => import('@/views/Book')
	   
    },
    {
      path: '/chapter_list/:bookId',
      name: 'chapterList',
      component: () => import('@/views/ChapterList')
	   
    },
    {
      path: '/book/:id/:chapterId',
      name: 'bookContent',
      component: () => import('@/views/BookContent')
	   
    },
    {
      path: '/user/setup',
      name: 'userSetup',
      component: () => import('@/views/UserSetup')
    },
    {
      path: '/user/comment',
      name: 'userComment',
      component: () => import('@/views/UserComment')
	   
    },
    {
      path: '/author/register',
      name: 'authorRegister',
      component: () => import('@/views/author/Register')
    },
    {
      path: '/author/book_list',
      name: 'authorBookList',
      component: () => import('@/views/author/BookList')
    },
    {
      path: '/author/book_add',
      name: 'authorBookAdd',
      component: () => import('@/views/author/BookAdd')
    },
    {
      path: '/author/chapter_list',
      name: 'authorChapterList',
      component: () => import('@/views/author/ChapterList')
    },
    {
      path: '/author/chapter_add',
      name: 'authorChapterAdd',
      component: () => import('@/views/author/ChapterAdd')
    },
    {
      path: '/author/chapter_update',
      name: 'authorChapterUpdate',
      component: () => import('@/views/author/ChapterUpdate')
    }
  ]
})

// To solve the issue in Vue where page navigation always
// starts from the middle of the new page:
router.afterEach((to,from,next) => {
  window.scrollTo(0,0)
})

export default router