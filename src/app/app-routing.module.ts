import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { MenuComponent } from './menu/menu.component';
import { CongeComponent } from './conge/conge.component';
import { OrdremComponent } from './ordrem/ordrem.component';
import { AutorisComponent } from './autoris/autoris.component';
import { DepurbainComponent } from './depurbain/depurbain.component';
import { RhMenuComponent } from './rh-menu/rh-menu.component';

import { TablistfComponent } from './tablistf/tablistf.component';
import { ListeOComponent } from './liste-o/liste-o.component';
import { ListeDComponent } from './liste-d/liste-d.component';
import { ListeCComponent } from './liste-c/liste-c.component';
import { ListeAComponent } from './liste-a/liste-a.component';
import { MenuADComponent } from './menu-ad/menu-ad.component';
import { CollaborateursComponent } from './collaborateurs/collaborateurs.component';
import { PasswordComponent } from './password/password.component';



const routes: Routes = [
  {
    path:'',
  component:HomepageComponent
  
  },
  {path:'menu',component:MenuComponent},
  {path:'menuad',component:MenuADComponent},
  {path:'conge',component:CongeComponent},
  {path:'ordrem',component:OrdremComponent},
  {path:'autorisation',component:AutorisComponent},
  {path:'depurb',component:DepurbainComponent},
  {path:'collab',component:CollaborateursComponent},
  {path:'listeOrdre',component:ListeOComponent},
  {path:'listeDep',component:ListeDComponent},
  {path:'listeConge',component:ListeCComponent},
  {path:'listeAut',component:ListeAComponent},
  {path:'tabl',component:TablistfComponent},
  {path:'menurh',component:RhMenuComponent},
  {path:'passwrd',component:PasswordComponent}

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
