import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-sidebar-v2';
import { Observation } from 'src/app/models/observation';
import { Parcelle } from 'src/app/models/parcelle';
import { Passe } from 'src/app/models/passe';
import { Prelevement } from 'src/app/models/prelevement';
import { Statut } from 'src/app/models/statut';
import { AuthService } from 'src/app/services/auth.service';
import { ObservationService } from 'src/app/services/observation.service';
import { PasseService } from 'src/app/services/passe.service';
import { PlanSondageService } from 'src/app/services/plan-sondage.service';
import { PrelevementService } from 'src/app/services/prelevement.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements AfterViewInit {
  private map!: L.Map;
  private parcelleLayer!: L.Polygon;
  private planSondageLayer: L.Marker[] = [];
  private prelevementLayer: L.Marker[] = [];
  private observationsLayer: L.CircleMarker[] = [];

  hideOptions = true;
  isCheckedParcelle = true;
  isCheckedPlanSondage = false;
  isCheckedPrelevement = false;
  isCheckedObservation = false;
  displayImagesPrelevement: boolean = false;
  displayImagesObservation: boolean = false;

  parcelles: Parcelle[] = [];
  parcelle!: Parcelle;
  prelevement!: Prelevement;
  passes!: Passe[];
  observation!: Observation;

  constructor(
    private planSondageService: PlanSondageService,
    private prelevementService: PrelevementService,
    private passeService: PasseService,
    private obsercationService: ObservationService,
    private authService: AuthService
  ) {}

  ngAfterViewInit(): void {
    this.loadMap();
  }

  loadMap() {
    const loc = {
      lat: 36.806389,
      long: 10.181667,
    };
    const zoom = 9;
    this.map = L.map('map', {
      center: [loc.lat, loc.long],
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

  selectedParcelle(event: Parcelle) {
    this.parcelle = event;
    if (this.parcelleLayer == undefined) {
      const coordinates = event.geometry.coordinates
        .replace('MULTIPOLYGON (((', '')
        .replace(')))', '')
        .split(', ')
        .map((coord: any) => {
          const [lng, lat] = coord.split(' ');
          return [parseFloat(lat), parseFloat(lng)];
        });
      this.parcelleLayer = L.polygon(coordinates).addTo(this.map);
      this.map.fitBounds(this.parcelleLayer.getBounds());
      this.hideOptions = false;
      var sidebar = L.control
        .sidebar({
          autopan: true,
          closeButton: true,
          container: 'sidebar',
          position: 'left',
        })
        .addTo(this.map);
    }
    this.loadPlanSondage();
    this.loadPrelevement();
    this.loadObservations();
  }

  loadPlanSondage() {
    this.planSondageService
      .getByParcelle(this.parcelle.id)
      .subscribe((data) => {
        for (var i in data) {
          data[i].geometry.coordinates
            .replace('POINT (', '')
            .replace(')', '')
            .split(', ')
            .map((coord: any) => {
              const [lng, lat] = coord.split(' ');
              this.planSondageLayer.push(
                L.marker([parseFloat(lat), parseFloat(lng)]).setIcon(greyIcon)
              );
            });
        }
      });
  }

  loadPrelevement() {
    this.planSondageService
      .getByParcelle(this.parcelle.id)
      .subscribe((data) => {
        for (var i in data) {
          data[i].geometry.coordinates
            .replace('POINT (', '')
            .replace(')', '')
            .split(', ')
            .map((coord: any) => {
              const [lng, lat] = coord.split(' ');
              this.prelevementService
                .getByPlanSondage(data[i].id)
                .subscribe((prelevement) => {
                  if (prelevement != null) {
                    const myDiv = document.getElementById('details-container');
                    if (prelevement.statut == Statut.Securise) {
                      this.prelevementLayer.push(
                        L.marker([parseFloat(lat), parseFloat(lng)], {
                          zIndexOffset: 9999,
                        })
                          .setIcon(greenIcon)
                          .on('click', () => {
                            this.loadPasses(prelevement.id);
                            if (myDiv) {
                              this.prelevement = prelevement;
                              if (this.prelevement != undefined) {
                                myDiv.style.display = 'block';
                                this.closeDiv2();
                              }
                            }
                          })
                      );
                    } else if (prelevement.statut == Statut.A_Verifier) {
                      this.prelevementLayer.push(
                        L.marker([parseFloat(lat), parseFloat(lng)], {
                          zIndexOffset: 9999,
                        })
                          .setIcon(orangeIcon)
                          .on('click', () => {
                            this.loadPasses(prelevement.id);
                            if (myDiv) {
                              this.prelevement = prelevement;
                              if (this.prelevement != undefined) {
                                myDiv.style.display = 'block';
                                this.closeDiv2();
                              }
                            }
                          })
                      );
                    } else if (prelevement.statut == Statut.Non_Securise) {
                      this.prelevementLayer.push(
                        L.marker([parseFloat(lat), parseFloat(lng)], {
                          zIndexOffset: 9999,
                        })
                          .setIcon(redIcon)
                          .on('click', () => {
                            this.loadPasses(prelevement.id);
                            if (myDiv) {
                              this.prelevement = prelevement;
                              if (this.prelevement != undefined) {
                                this.closeDiv2();
                                myDiv.style.display = 'block';
                              }
                            }
                          })
                      );
                    }
                  }
                });
            });
        }
      });
  }

  loadPasses(id: number) {
    this.passeService.getAll(id).subscribe((data) => {
      this.passes = data;
    });
  }

  loadObservations() {
    this.obsercationService
      .getByParcelle(this.parcelle.id)
      .subscribe((data) => {
        for (var i in data) {
          const observation = data[i];
          const myDiv = document.getElementById('details-container2');
          this.observationsLayer.push(
            L.circleMarker(
              [parseFloat(data[i].latitude), parseFloat(data[i].longitude)],
              {
                radius: 10,
                color: 'black',
                fillOpacity: 2,
              }
            ).on('click', () => {
              if (myDiv) {
                this.observation = observation;
                if (this.observation != undefined) {
                  this.closeDiv();
                  myDiv.style.display = 'block';
                }
              }
            })
          );
        }
      });
  }

  onCheckboxChange(option: string) {
    if (option == 'parcelle') {
      if (this.isCheckedParcelle) {
        this.map.addLayer(this.parcelleLayer);
      } else {
        this.map.removeLayer(this.parcelleLayer);
      }
    }
    if (option == 'planSondage') {
      if (this.isCheckedPlanSondage) {
        this.planSondageLayer.forEach((ps) => {
          ps.addTo(this.map);
        });
      } else {
        this.planSondageLayer.forEach((ps) => {
          this.map.removeLayer(ps);
        });
      }
    }
    if (option == 'prelevements') {
      if (this.isCheckedPrelevement) {
        this.prelevementLayer.forEach((p) => {
          p.addTo(this.map);
        });
      } else {
        this.prelevementLayer.forEach((p) => {
          this.map.removeLayer(p);
        });
      }
    }
    if (option == 'observations') {
      if (this.isCheckedObservation) {
        this.observationsLayer.forEach((o) => {
          o.addTo(this.map);
        });
      } else {
        this.observationsLayer.forEach((o) => {
          this.map.removeLayer(o);
        });
      }
    }
  }

  modalImagesPrelevement(id: number) {
    this.displayImagesPrelevement = true;
  }

  modalImagesObservation(id: number) {
    this.displayImagesObservation = true;
  }

  closeDiv() {
    const myDiv = document.getElementById('details-container');
    myDiv!.style.display = 'none';
  }

  closeDiv2() {
    const myDiv = document.getElementById('details-container2');
    myDiv!.style.display = 'none';
  }

  public isLoggedIn() {
    return this.authService.isLoggedIn();
  }
}

const greyIcon = L.icon({
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
});
