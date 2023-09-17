import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MenuComponent } from './menu/menu.component';
import { FormsModule } from '@angular/forms';
import { CongeComponent } from './conge/conge.component';
import { OrdremComponent } from './ordrem/ordrem.component';
import { AutorisComponent } from './autoris/autoris.component';
import { DepurbainComponent } from './depurbain/depurbain.component';
import { RhMenuComponent } from './rh-menu/rh-menu.component';

import { TablistfComponent } from './tablistf/tablistf.component';
import { HttpClientModule } from '@angular/common/http';
import { ListeOComponent } from './liste-o/liste-o.component';
import { ListeDComponent } from './liste-d/liste-d.component';
import { ListeCComponent } from './liste-c/liste-c.component';
import { ListeAComponent } from './liste-a/liste-a.component';
import { MenuADComponent } from './menu-ad/menu-ad.component';
import { CollaborateursComponent } from './collaborateurs/collaborateurs.component';
import { PasswordComponent } from './password/password.component';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    MenuComponent,
    CongeComponent,
    OrdremComponent,
    AutorisComponent,
    DepurbainComponent,
    RhMenuComponent,
    TablistfComponent,
    ListeOComponent,
    ListeDComponent,
    ListeCComponent,
    ListeAComponent,
    MenuADComponent,
    CollaborateursComponent,
    PasswordComponent
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
