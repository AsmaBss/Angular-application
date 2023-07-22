import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Parcelle } from 'src/app/models/parcelle';
import { PlanSondageService } from 'src/app/services/plan-sondage.service';

@Component({
  selector: 'app-add-plan-sondage',
  templateUrl: './add-plan-sondage.component.html',
  styleUrls: ['./add-plan-sondage.component.css'],
})
export class AddPlanSondageComponent implements OnInit {
  @ViewChild('f') sondageForm!: NgForm;
  @Input() parcelle!: Parcelle;
  @Output() verify = new EventEmitter<boolean>();

  parcelleShpFile!: File;
  parcelleShxFile!: File;
  parcelleDbfFile!: File;
  parcellePrjFile!: File;

  constructor(
    private planSondageService: PlanSondageService,
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

  save(form: any) {
    const formData = new FormData();
    formData.append('shpFile', this.parcelleShpFile);
    formData.append('shxFile', this.parcelleShxFile);
    formData.append('dbfFile', this.parcelleDbfFile);
    formData.append('prjFile', this.parcellePrjFile);

    this.planSondageService
      .add(formData, this.parcelle.id)
      .subscribe((data) => {
        this.verify.emit(true);
        const currentUrl = this.router.url;
        this.router
          .navigateByUrl('/Accueil', {
            skipLocationChange: false,
            onSameUrlNavigation: 'reload',
          })
          .then(() => {
            this.router.navigate([currentUrl]);
            form.reset();
          });
      });
  }

  close() {
    this.sondageForm.resetForm();
  }
}
