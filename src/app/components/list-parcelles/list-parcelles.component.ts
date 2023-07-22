import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { Parcelle } from 'src/app/models/parcelle';
import { ParcelleService } from 'src/app/services/parcelle.service';
import { PlanSondageService } from 'src/app/services/plan-sondage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-parcelles',
  templateUrl: './list-parcelles.component.html',
  styleUrls: ['./list-parcelles.component.css'],
})
export class ListParcellesComponent implements OnInit {
  @Output() verify = new EventEmitter<boolean>();
  @Input() allParcelles!: any[];

  parcelles: any[] = [];

  constructor(
    private parcelleService: ParcelleService,
    private planSondageService: PlanSondageService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  loadParcelles() {
    this.parcelleService.getAll().subscribe((data) => {
      //this.parcelles = data;
      this.allParcelles = data.map((item) => ({
        id: item.id,
        nom: item.nom,
        type: item.type,
        nbr: null,
      }));
      this.allParcelles.forEach((parcelle) => {
        this.planSondageService.nbr(parcelle.id).subscribe((nbr) => {
          parcelle.nbr = nbr;
        });
      });
    });
  }

  deleteParcelle(id: number) {
    Swal.fire({
      title: 'Vous êtes sûr?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.isConfirmed) {
        this.parcelleService.delete(id).subscribe();
        Swal.fire('Supprimé!', 'La parcelle a été supprimé.', 'success').then(
          () => {
            this.verify.emit(true);
            const currentUrl = this.router.url;
            this.router
              .navigateByUrl('/Accueil', {
                skipLocationChange: false,
                onSameUrlNavigation: 'reload',
              })
              .then(() => {
                this.router.navigate([currentUrl]);
                this.loadParcelles();
              });
          }
        );
      }
    });
  }
}
