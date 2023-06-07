import { Component, Input, OnInit } from '@angular/core';
import { Parcelle } from 'src/app/models/parcelle';
import { PlanSondageService } from 'src/app/services/plan-sondage.service';

@Component({
  selector: 'app-plan-sondage',
  templateUrl: './plan-sondage.component.html',
  styleUrls: ['./plan-sondage.component.css'],
})
export class PlanSondageComponent implements OnInit {
  @Input() parcelle!: Parcelle;

  parcelleShpFile!: File;
  parcelleShxFile!: File;
  parcelleDbfFile!: File;
  parcellePrjFile!: File;

  constructor(private planSondageService: PlanSondageService) {}

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

    this.planSondageService.add(formData, this.parcelle.id).subscribe();
    window.location.reload();
  }
}
