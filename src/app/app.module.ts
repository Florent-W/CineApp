import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ArticlesComponent } from './articles/articles.component';
import { FichesComponent } from './fiches/fiches.component';
import { AjoutficheComponent } from './ajoutfiche/ajoutfiche.component';
import { ProfilComponent } from './profil/profil.component';
import { FicheComponent } from './fiche/fiche.component';
import { ModalComponent } from './modal/modal.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SafeUrlPipe } from './pipes/safeurl.pipe';
import { ArticleComponent } from './article/article.component';
import { ListModalComponent } from './lists/list-modal/list-modal.component';
import { ListItemComponent } from './lists/listItem/listItem.component';
import { ListContainerComponent } from './lists/list-container/list-container.component';
import { UserFicheComponent } from './user-fiche/user-fiche.component';
import { AjoutarticleComponent } from './ajoutarticle/ajoutarticle.component';
import { TriPipe } from './pipes/tri.pipe';
import { TooltipDirective } from './directive/tooltip.directive';
import { ThemecolorDirective } from './directive/themecolor.directive';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    ArticlesComponent,
    FichesComponent,
    AjoutficheComponent,
    ProfilComponent,
    FicheComponent,
    ModalComponent,
    ListItemComponent,
    DashboardComponent,
    SafeUrlPipe,
    ArticleComponent,
    ListModalComponent,
    ListContainerComponent,
    UserFicheComponent,
    AjoutarticleComponent,
    TriPipe,
    TooltipDirective,
    ThemecolorDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [  
    ThemecolorDirective
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
