import {RouterModule, Routes} from '@angular/router';
import {InfoComponent} from './info/info.component';
import {Lab4Component} from './lab4/lab4.component';

const appRoutes: Routes = [
  {path: '', redirectTo: 'lab4', pathMatch: 'full'},
  {path: 'info', component: InfoComponent},
  {path: 'lab4', component: Lab4Component},

  // otherwise redirect to home
  {path: '**', redirectTo: 'lab4'},
];

export const routing = RouterModule.forRoot(appRoutes);
