import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Home } from './components/home/home';
import { CreateArticle } from './components/create-article/create-article';
import { ReadArticle } from './components/read-article/read-article';
import { EditArticles } from './components/edit-articles/edit-articles';
import { PageNotFound } from './components/page-not-found/page-not-found';
import { Articles } from './components/articles/articles';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        component: Login,
      },
      {
        path: 'register',
        component: Register,
      },
    ],
  },
  {
    path: 'articles',
    children: [
        {
            path:"",
            component:Articles
        },
      {
        path: 'create',
        component: CreateArticle,
      },
      {
        path: ':id',
        component: ReadArticle,
      },
      {
        path: ':id/edit',
        component: EditArticles,
      },
    ],
    
  },
  {path:"**",component:PageNotFound}
];
