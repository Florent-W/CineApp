import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ArticlesComponent } from './articles/articles.component';
import { FichesComponent } from './fiches/fiches.component';
import { FicheComponent } from './fiche/fiche.component';
import { AjoutficheComponent } from './ajoutfiche/ajoutfiche.component';
import { ProfilComponent } from './profil/profil.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ArticleComponent } from './article/article.component';
import { ListModalComponent } from './lists/list-modal/list-modal.component';
import { ListContainerComponent } from './lists/list-container/list-container.component';
import { UserFicheComponent } from './user-fiche/user-fiche.component';
import { AjoutarticleComponent } from './ajoutarticle/ajoutarticle.component';
import { UserArticlesComponent } from './user-articles/user-articles.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: FichesComponent,
      },
      { path: 'articles', component: ArticlesComponent },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'articles/:idArticle',
    component: ArticleComponent,
  },
  {
    path: 'fiche',
    component: FichesComponent,
  },
  {
    path: 'fiches/:idFiche',
    component: FicheComponent,
  },
  {
    path: 'ajoutFiche',
    component: AjoutficheComponent,
  },
  {
    path: 'ajoutArticle',
    component: AjoutarticleComponent,
  },
  {
    path: 'profil',
    component: ProfilComponent,
    children: [
      {
        path: '',
        component: UserFicheComponent,
      },
      {
        path: 'listes',
        component: ListContainerComponent,
      },
      {
        path: 'articles',
        component: UserArticlesComponent,
      },
    ],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'gerer-liste',
    component: ListModalComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
