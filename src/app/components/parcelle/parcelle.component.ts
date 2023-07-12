import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ParcelleService } from 'src/app/services/parcelle.service';
import { PlanSondageService } from 'src/app/services/plan-sondage.service';

@Component({
  selector: 'app-parcelle',
  templateUrl: './parcelle.component.html',
  styleUrls: ['./parcelle.component.css'],
})
export class ParcelleComponent implements OnInit {
  @Output() verify = new EventEmitter<boolean>();

  parcelleShpFile!: File;
  parcelleShxFile!: File;
  parcelleDbfFile!: File;
  parcellePrjFile!: File;

  constructor(
    private parcelleService: ParcelleService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onFileSelected(event: any, fileType: string) {
    switch (fileType) {
      case 'shpFile':
        this.parcelleShpFile = event.target.files[0];
        break;
      case 'shxFile':
        this.parcelleShxFile = event.target.files[0];
        break;
      case 'dbfFile':
        this.parcelleDbfFile = event.target.files[0];
        break;
      case 'prjFile':
        this.parcellePrjFile = event.target.files[0];
        break;
      default:
        break;
    }
  }

  save() {
    const formData = new FormData();
    formData.append('shpFile', this.parcelleShpFile);
    formData.append('shxFile', this.parcelleShxFile);
    formData.append('dbfFile', this.parcelleDbfFile);
    formData.append('prjFile', this.parcellePrjFile);

    this.parcelleService.add(formData).subscribe(
      (data) => {
        this.verify.emit(true);
        const currentUrl = this.router.url;
        this.router
          .navigateByUrl('/Accueil', {
            skipLocationChange: false,
            onSameUrlNavigation: 'reload',
          })
          .then(() => {
            this.router.navigate([currentUrl]);
          });
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
