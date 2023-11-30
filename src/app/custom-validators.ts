import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function minNumberValidator(min: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    return value < min ? { 'Le plus petit nombre doit être ': { min } } : null;
  };
}

export function lengthValidator(minLongueur: number, maxLongueur: number): ValidatorFn {
    return (controle: AbstractControl): ValidationErrors | null => {
      const valeur = controle.value || '';
      if (valeur.length < minLongueur || valeur.length > maxLongueur) {
        return { 'Le nombre de caractères doit être entre ': { minLongueur, maxLongueur } };
      }
      return null;
    };
  }
