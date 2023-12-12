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
import { ListsComponent } from './lists/lists/lists.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SafeUrlPipe } from './pipes/safeurl.pipe';
import { ListModalComponent } from './list-modal/list-modal.component';

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
    ListsComponent,
    DashboardComponent,
    SafeUrlPipe,
    ListModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
