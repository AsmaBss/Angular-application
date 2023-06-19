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
import { GoogleMapsModule } from '@angular/google-maps';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { SecurisationComponent } from './components/securisation/securisation.component';
import { ParcelleComponent } from './components/parcelle/parcelle.component';
import { MapComponent } from './components/map/map.component';
import { ImagesComponent } from './components/images/images.component';
import { PrelevementComponent } from './components/prelevement/prelevement.component';
import { PlanSondageComponent } from './components/plan-sondage/plan-sondage.component';
import { ObservationImagesComponent } from './components/observation-images/observation-images.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RouterModule } from '@angular/router';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { AuthGuard } from './interceptor/auth.guard';
import { AuthService } from './services/auth.service';
import { TestComponent } from './components/test/test.component';
import { FormTestComponent } from './components/form-test/form-test.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HomeComponent,
    HeaderComponent,
    ParcelleComponent,
    SecurisationComponent,
    MapComponent,
    ImagesComponent,
    PrelevementComponent,
    PlanSondageComponent,
    ObservationImagesComponent,
    LoginComponent,
    RegisterComponent,
    TestComponent,
    FormTestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    GoogleMapsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    AuthService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
