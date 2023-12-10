import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AjoutficheComponent } from "./ajoutfiche/ajoutfiche.component";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ArticlesComponent } from "./articles/articles.component";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { FichesComponent } from "./fiches/fiches.component";
import { FooterComponent } from "./footer/footer.component";
import { GenresModule } from "./genre/genres.module";
import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from "./home/home.component";
import { ModalComponent } from "./modal/modal.component";
import { ModalService } from "./modal/modal.service";

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
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    GenresModule,
  ],
  providers: [ModalService],
  bootstrap: [AppComponent],
})
export class AppModule {}
