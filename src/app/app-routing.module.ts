import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './interceptor/auth.guard';
import { TestComponent } from './components/test/test.component';
import { FormTestComponent } from './components/form-test/form-test.component';
import { VisualisationComponent } from './components/visualisation/visualisation.component';
import { AdministrationComponent } from './components/administration/administration.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'Accueil',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'test',
    component: TestComponent,
  },
  {
    path: 'form',
    component: FormTestComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: 'Accueil' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
