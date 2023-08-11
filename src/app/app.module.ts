import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';

import {
  HttpClientModule,
  HttpClientJsonpModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { ImagesComponent } from './components/images/images.component';
import { PrelevementComponent } from './components/prelevement/prelevement.component';
import { ObservationImagesComponent } from './components/observation-images/observation-images.component';
import { LoginComponent } from './components/login/login.component';
import { RouterModule } from '@angular/router';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { AuthGuard } from './interceptor/auth.guard';
import { AuthService } from './services/auth.service';
import { TestComponent } from './components/test/test.component';
import { FormTestComponent } from './components/form-test/form-test.component';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { AddUserComponent } from './components/add-user/add-user.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { ListParcellesComponent } from './components/list-parcelles/list-parcelles.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { AdministrationComponent } from './components/administration/administration.component';
import { AddParcelleComponent } from './components/add-parcelle/add-parcelle.component';
import { AddPlanSondageComponent } from './components/add-plan-sondage/add-plan-sondage.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HomeComponent,
    HeaderComponent,
    ImagesComponent,
    PrelevementComponent,
    ObservationImagesComponent,
    LoginComponent,
    TestComponent,
    FormTestComponent,
    AddUserComponent,
    ListUsersComponent,
    ListParcellesComponent,
    UpdateUserComponent,
    AdministrationComponent,
    AddParcelleComponent,
    AddPlanSondageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('jwtToken');
        },
      },
    }),
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    AuthService,
    JwtHelperService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
