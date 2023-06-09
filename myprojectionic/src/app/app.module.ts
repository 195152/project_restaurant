import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Place it here
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
