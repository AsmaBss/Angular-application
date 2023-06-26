import { Component, Input, OnInit } from '@angular/core';
import { Parcelle } from 'src/app/models/parcelle';
import { ParcelleService } from 'src/app/services/parcelle.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
})
export class UpdateUserComponent implements OnInit {
  @Input() id!: number;

  parcelles: Parcelle[] = [];
  selectedParcelles: Parcelle[] = [];

  constructor(private parcelleService: ParcelleService) {}

  ngOnInit(): void {
    this.loadParcelles();
  }

  loadParcelles() {
    this.parcelleService.getByUser(this.id).subscribe((data) => {
      this.parcelles = data;
    });
  }

  selectedParcelle(p: Parcelle): void {
    const index = this.selectedParcelles.indexOf(p);
    if (index === -1) {
      this.selectedParcelles.push(p);
    } else {
      this.selectedParcelles.splice(index, 1);
    }
  }
}
