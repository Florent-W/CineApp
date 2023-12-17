import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Fiche, FichesService } from 'src/app/shared/services/fiches.service';
import { List, ListsService } from 'src/app/shared/services/lists.service';

@Component({
  selector: 'app-lists',
  templateUrl: './listItem.component.html',
  styleUrls: ['./listItem.component.scss'],
})
export class ListItemComponent implements OnInit, OnDestroy {
  @Input() list?: List;
  items: Fiche[] = [];

  constructor(
    private fiches: FichesService,
    private listsService: ListsService
  ) {}
  ngOnInit(): void {
    this.getFicheByListItem();
  }

  ngOnDestroy(): void {
    this.getFicheByListItem().unsubscribe();
  }

  editList(id: number) {
    if (this.list?.items.includes(id)) {
      const index = this.list.items.indexOf(id);
      this.listsService.updateList({
        ...this.list,
        items: this.list.items.filter((l) => l != id),
      });
    } else {
      this.listsService.updateList({
        ...this.list!,
        items: [...this.list?.items!, id],
      });
    }
    this.listsService.getCurrentUserList();
  }

  private getFicheByListItem = () => {
    return forkJoin(
      this.list?.items.map((list) => this.fiches.getFicheById(list)) as any
    ).subscribe((fiche: any) => (this.items = fiche));
  };

  removeList = () => {
    this.listsService.deleteList(this.list?.id!);
    this.listsService.getCurrentUserList();
  };
}
