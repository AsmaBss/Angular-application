import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ParcelleService } from 'src/app/services/parcelle.service';

@Component({
  selector: 'app-add-parcelle',
  templateUrl: './add-parcelle.component.html',
  styleUrls: ['./add-parcelle.component.css'],
})
export class AddParcelleComponent implements OnInit {
  @ViewChild('f') parcelleForm!: NgForm;
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

  save(form: any) {
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
            form.reset();
          });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  close() {
    this.parcelleForm.resetForm();
  }
}
