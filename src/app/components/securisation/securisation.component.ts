import { Component } from '@angular/core';
import { Securisation } from 'src/app/models/securisation';
import { SecurisationService } from 'src/app/services/securisation.service';

@Component({
  selector: 'app-securisation',
  templateUrl: './securisation.component.html',
  styleUrls: ['./securisation.component.css'],
})
export class SecurisationComponent {
  securisations!: Securisation[];
  constructor(private s: SecurisationService) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.s.getAll().subscribe((data) => {
      console.log(data);
      this.securisations = data;
    });
  }
}
