import { Component, OnInit } from '@angular/core';
import { Parcelle } from 'src/app/models/parcelle';
import { ParcelleService } from 'src/app/services/parcelle.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-parcelles',
  templateUrl: './list-parcelles.component.html',
  styleUrls: ['./list-parcelles.component.css'],
})
export class ListParcellesComponent implements OnInit {
  parcelles: Parcelle[] = [];

  constructor(private parcelleService: ParcelleService) {}

  ngOnInit(): void {
    this.loadParcelles();
  }

  loadParcelles() {
    this.parcelleService.getAll().subscribe((data) => {
      this.parcelles = data;
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
          () => window.location.reload()
        );
      }
    });
  }
}
