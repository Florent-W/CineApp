import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function minNumberValidator(min: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    console.log('Le plus petit nombre doit être ' + min);
    return value < min ? { 'Le plus petit nombre doit être ': { min } } : null;
  };
}

export function lengthValidator(minLongueur: number, maxLongueur: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const valeur = control.value || '';
      if (valeur.length < minLongueur || valeur.length > maxLongueur) {
        console.log('Le nombre de caractères doit être entre : ' + minLongueur + ' et ' + maxLongueur )
        return { 'Le nombre de caractères doit être entre ': { minLongueur, maxLongueur } };
      }
      return null;
    };
}

export function specialCharactersValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }
    const specialChars = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '{', '}', '[', ']', ':', ';', '<', '>', ',', '.', '?', '~', '\\', '/'];

    for (let i = 0; i < specialChars.length; i++) {
      if (control.value.includes(specialChars[i])) {
        console.log('La chaîne de caractères contient des caractères spéciaux.');
        return { 'specialCharacters': 'La chaîne de caractères contient des caractères spéciaux.' };
      }
    }
    return null;
  };
}

export function numberValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    if (!(Number(value))) {
      console.log('Un champ n\'a pas de nombre');
      return { 'notANumber': 'Ce n\'est pas un nombre' };
    }
    return null;
  };
}
