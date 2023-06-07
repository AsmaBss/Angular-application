import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//import * as L from 'leaflet';
import { map } from 'rxjs';
import { Prelevement } from 'src/app/models/prelevement';
import { Statut } from 'src/app/models/statut';
import { ParcelleService } from 'src/app/services/parcelle.service';
import { PlanSondageService } from 'src/app/services/plan-sondage.service';
import { PrelevementService } from 'src/app/services/prelevement.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit {
  private map: any;
  private idSecurisation!: number;
  prelevements!: Prelevement[];
  prelevement!: Prelevement;
  display: boolean = false;

  constructor(
    private p: ParcelleService,
    private ps: PlanSondageService,
    private pr: PrelevementService,
    public activatedRoute: ActivatedRoute
  ) {}

  ngAfterViewInit(): void {
    // get id of securisation
    this.activatedRoute.paramMap
      .pipe(map(() => window.history.state))
      .subscribe((res) => {
        this.idSecurisation = res.id;
      });
    // create map
    //this.createMap();
    // load parcelle
    //this.getPolygons();
    //this.getAll(this.idSecurisation);
  }

  /*createMap() {
    const zoom = 9;
    this.map = L.map('map', {
      zoom: zoom,
    });
    const mainLayer = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        minZoom: 0,
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }
    );
    mainLayer.addTo(this.map);
  }

  getPolygons() {
    this.p.getBySecurisation(this.idSecurisation).subscribe((data) => {
      const coordinates = data.geometry.coordinates
        .replace('MULTIPOLYGON (((', '')
        .replace(')))', '')
        .split(', ')
        .map((coord: any) => {
          const [lng, lat] = coord.split(' ');
          return [parseFloat(lat), parseFloat(lng)];
        });
      const polygon = L.polygon(coordinates).addTo(this.map);
      this.map.fitBounds(polygon.getBounds());
      // load plan sondage
      this.getPoints(data.id);
    });
  }

  getPoints(id: number) {
    this.ps.getByParcelle(id).subscribe((data) => {
      for (var i in data) {
        data[i].geometry.coordinates
          .replace('POINT (', '')
          .replace(')', '')
          .split(', ')
          .map((coord: any) => {
            const [lng, lat] = coord.split(' ');
            // load prelevement
            this.pr.getByPlanSondage(data[i].id).subscribe((prelevement) => {
              if (prelevement != null) {
                this.prelevement = prelevement;
                let marker: any = null;
                const myDiv = document.getElementById('details');
                console.log('then => ', myDiv?.style.display);
                if (prelevement.statut == Statut.Securise) {
                  marker = L.marker([parseFloat(lat), parseFloat(lng)])
                    .setIcon(greenIcon)
                    .addTo(this.map);
                } else if (prelevement.statut == Statut.A_Verifier) {
                  marker = L.marker([parseFloat(lat), parseFloat(lng)])
                    .setIcon(orangeIcon)
                    .addTo(this.map);
                } else if (prelevement.statut == Statut.Non_Securise) {
                  marker = L.marker([parseFloat(lat), parseFloat(lng)])
                    .setIcon(redIcon)
                    .addTo(this.map);
                }
                marker.on('click', () => {
                  if (myDiv) {
                    myDiv.style.display = 'block';
                    this.onMarkerClick(prelevement);
                  }
                });
              } else {
                L.marker([parseFloat(lat), parseFloat(lng)])
                  .setIcon(greyIcon)
                  .addTo(this.map);
              }
            });
            return [parseFloat(lat), parseFloat(lng)];
          });
      }
    });
  }*/

  onMarkerClick(markerData: any) {
    this.prelevement = markerData;
  }

  getAll(id: number) {
    this.pr.getAllBySecurisation(id).subscribe((data) => {
      console.log(data);
      this.prelevements = data;
    });
  }

  convert(statut: string): any {
    switch (statut) {
      case Statut.Securise:
        return 'Sécurisé';
      case Statut.A_Verifier:
        return 'A vérifier';
      case Statut.Non_Securise:
        return 'Non sécurisé';
    }
  }

  onPress(id: number) {
    this.display = true;
  }
}

/*const greyIcon = L.icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
const greenIcon = L.icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
const redIcon = L.icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
const orangeIcon = L.icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});*/
