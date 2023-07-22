import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Parcelle } from 'src/app/models/parcelle';
import { ParcelleService } from 'src/app/services/parcelle.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
})
export class UpdateUserComponent implements OnInit, OnChanges {
  @Input() id!: number;

  parcelles: Parcelle[] = [];
  hisParcelles: Parcelle[] = [];
  selectedParcelles: Parcelle[] = [];

  constructor(
    private parcelleService: ParcelleService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadParcelles();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['id'] && !changes['id'].firstChange) {
      this.loadParcelles();
    }
  }

  loadParcelles() {
    this.parcelleService.getAll().subscribe(
      (data) => {
        this.parcelles = data;
        /*this.parcelles = data.filter(
          (parcelle) =>
            !this.hisParcelles.some(
              (affectedParcelle) => affectedParcelle.id === parcelle.id
            )
        );*/
      },
      (error) => {
        console.log(error);
      }
    );
    this.parcelleService.getByUser(this.id).subscribe(
      (data) => {
        this.hisParcelles = data;
        this.selectedParcelles = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  selectedParcelle(p: Parcelle): void {
    /*const index = this.selectedParcelles.indexOf(p);
    if (index === -1) {
      this.selectedParcelles.push(p);
    } else {
      this.selectedParcelles.splice(index, 1);
    }*/
    if (this.isSelected(p)) {
      this.selectedParcelles = this.selectedParcelles.filter(
        (selectedParcelle) => selectedParcelle.id !== p.id
      );
    } else {
      this.selectedParcelles.push(p);
    }
  }

  isSelected(p: Parcelle): boolean {
    return this.selectedParcelles.some(
      (selectedParcelle) => selectedParcelle.id === p.id
    );
  }

  save() {
    this.selectedParcelles = this.selectedParcelles.map((parcelle) => {
      return {
        ...parcelle,
        geometry: null,
      };
    });
    this.userService.affect(this.id, this.selectedParcelles).subscribe(
      (data) => {},
      (error) => {
        console.log(error);
      }
    );
  }
}
