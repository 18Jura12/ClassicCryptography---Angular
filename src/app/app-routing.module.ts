import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CaesarComponent } from './caesar/caesar.component';
import { HillComponent } from './hill/hill.component';
import { HomeComponent } from './home/home.component';
import { PlayfairComponent } from './playfair/playfair.component';

const routes: Routes = [
  {
    path: 'app',
    component: HomeComponent
  },
  {
    path: 'app/caesar',
    component: CaesarComponent
  },
  {
    path: 'app/hill',
    component: HillComponent
  },
  {
    path: 'app/playfair',
    component: PlayfairComponent
  },
  {
    path:'**',
    redirectTo: '/app',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
