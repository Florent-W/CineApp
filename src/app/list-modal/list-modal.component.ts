import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { List, ListsService } from '../shared/services/lists.service';

@Component({
  selector: 'app-list-modal',
  templateUrl: './list-modal.component.html',
  styleUrls: ['./list-modal.component.scss'],
})
export class ListModalComponent implements OnInit {
  @Input() ficheId?: number;
  title = new FormControl(null, [Validators.required]);
  selection = new FormControl();

  constructor(
    private listsService: ListsService,
    private cdr: ChangeDetectorRef,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this.listsService.getCurrentUserList();
    this.selection.setValue(
      this.lists.map((l): number | null => {
        if (l.items.includes(this.ficheId!)) {
          return l.id;
        } else {
          return null;
        }
      })
    );
  }

  get lists() {
    return this.listsService.currentUserLists;
  }

  get listsById(): Record<number, List> {
    const obj = this.lists.reduce((accumulator, list) => {
      return { ...accumulator, [list.id]: list };
    }, {});

    return obj;
  }

  createList() {
    this.listsService.addList({ title: this.title.value! }).subscribe(() => {
      this.title.setValue(null);
    });
    this.listsService.getCurrentUserList();
  }

  updateItems(): any {
    if (!this.selection.value) {
      return [];
    }
    const newList = this.selection.value.map((listId: any) => {
      const currentList = this.listsById[listId];
      if (currentList.items.includes(this.ficheId as number)) {
        return {
          ...currentList,
          items: currentList.items.filter((i) => i != this.ficheId),
        };
      }
      return {
        ...currentList,
        items: [...currentList.items, this.ficheId],
      };
    });

    return newList;
  }

  private removeDomElement() {
    const appModal = this.document
      .querySelector('app-modal')
      ?.remove() as unknown as Element[];
    appModal?.forEach((appBar) => {
      const modalChild = appBar.querySelector('#modal-list-modal');
      if (modalChild) {
        appBar.remove();
      }
    });
  }

  public updateList() {
    if (this.ficheId) {
      this.listsService.bulkUpdateList(this.updateItems());
      this.listsService.getCurrentUserList();
      this.removeDomElement();
    }
  }
}
