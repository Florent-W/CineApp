import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FichesService } from '../shared/services/fiches.service';
import { lengthValidator, minNumberValidator } from '../custom-validators';

@Component({
  selector: 'app-ajoutfiche',
  templateUrl: './ajoutfiche.component.html',
  styleUrls: ['./ajoutfiche.component.scss']
})
export class AjoutficheComponent {
  ficheForm!: FormGroup;
  errorMessage: string = '';

  constructor(private ficheService: FichesService) { }

  ngOnInit(): void {
    this.ficheForm = new FormGroup({
      'title': new FormControl(null, [Validators.required, lengthValidator(3, 100)]),
      'image': new FormControl(null, [Validators.required, lengthValidator(5, 1500)]),
      'category': new FormControl(null, [Validators.required, minNumberValidator(4)]),
      'duration': new FormControl(null, [Validators.required, minNumberValidator(5)]),
      'firstAired': new FormControl(null),
      'genres': new FormControl(null),
      'platforms': new FormControl(null)
    });
  }

  onSubmit(): void {
    if (this.ficheForm.valid) {
      this.ficheService.addFiche(this.ficheForm.value)
      .subscribe(
        response => {
          this.resetForm();
        },
        error => {
          this.errorMessage = error;
          console.log(this.errorMessage);
        }
      );
    }
  }

  resetForm(): void {
    this.ficheForm.reset();
  }
}
