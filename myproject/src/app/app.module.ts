import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProduitComponent } from './produit/produit.component';
import { AddproduitComponent } from './addproduit/addproduit.component';
import { CommandeComponent } from './commande/commande.component';
import { ProdCardComponent } from './components/prod-card/prod-card.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    NavigationComponent,
    ProduitComponent,
    AddproduitComponent,
    CommandeComponent,
    ProdCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}