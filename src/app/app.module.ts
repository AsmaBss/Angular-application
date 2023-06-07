import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';

import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    GoogleMapsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
