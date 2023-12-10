import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth/auth.service";
import { ModalService } from "../modal/modal.service";
import { FichesService } from "./fiches.service";

@Component({
  selector: "app-fiches",
  templateUrl: "./fiches.component.html",
  styleUrls: ["./fiches.component.scss"],
})
export class FichesComponent implements OnInit, OnDestroy {
  @ViewChild("modal", { read: ViewContainerRef })
  entry!: ViewContainerRef;

  modalTemplate: TemplateRef<any> | undefined;

  constructor(
    private fichesService: FichesService,
    private router: Router,
    private authService: AuthService,
    private modalService: ModalService
  ) {}
  ngOnDestroy(): void {
    throw new Error("Method not implemented.");
  }

  ngOnInit(): void {
    this.fichesService.getFiches();
  }

  openFiche(fichesId: number): void {
    this.router.navigate(["/fiches", fichesId]);
    console.log("Fiche ouverte :", fichesId);
  }

  isUserConnected() {
    return this.authService.isUserConnected();
  }

  createModal() {
    this.modalService
      .openModal({
        title: "Titre",
      })
      .subscribe((action) => {
        console.log(action);

        console.log("action", action);
      });
  }

  get fichesContent(): any[] {
    return this.fichesService.fichesContent;
  }
}

export type Fiche = {
  title: string;
  category: string;
  duration: number;
  firstAired: string;
  genres: [];
  platforms: string;
  id: number;
};
