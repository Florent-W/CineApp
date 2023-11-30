import { Component } from '@angular/core';
import { FichesService } from '../shared/services/fiches.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fiches',
  templateUrl: './fiches.component.html',
  styleUrls: ['./fiches.component.scss']
})
export class FichesComponent {
  constructor(private fichesService: FichesService, private router: Router) { }

  ngOnInit(): void {
    this.fichesService.getFiches();
  }

  openFiche(fichesId: number): void {
    this.router.navigate(['/fiches', fichesId]);
    console.log("Fiche ouverte :", fichesId);
  }

  get fichesContent(): any[] {
    return this.fichesService.fichesContent;
  }
}
