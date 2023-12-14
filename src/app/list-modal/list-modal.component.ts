import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { List, ListsService } from '../shared/services/lists.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-modal',
  templateUrl: './list-modal.component.html',
  styleUrls: ['./list-modal.component.scss'],
})
export class ListModalComponent implements OnInit {
  constructor(
    private listsService: ListsService,
    private cdr: ChangeDetectorRef
  ) {}

  title = new FormControl(null, [Validators.required]);
  selectedList: number[] = [];

  ngOnInit(): void {
    this.listsService.getCurrentUserList();
  }

  get lists() {
    return this.listsService.currentUserLists;
  }

  createList() {
    this.cdr.detectChanges();

    this.listsService
      .addList({ title: this.title.value! })
      .subscribe((response) => {
        this.title.setValue(null);
        this.listsService.getCurrentUserList();
        this.cdr.detectChanges();
      });
  }

  // updateItems(id: number, list: List) {
  //   if (list.items.includes(id)) {
  //     const index = list.items.indexOf(5);

  //   }
  // }

  updateSelectedList = (id: number) => {
    if (this.selectedList.includes(id)) {
      const index = this.selectedList.indexOf(id);
      this.selectedList.splice(index, 1);
    } else {
      this.selectedList.push(id);
    }
    this.cdr.detectChanges();
  };

  updateList(id: number) {
    const currentList = this.lists.find((list) => list.id === id);
    if (currentList) {
      this.listsService.updateList(currentList);
    }
  }
}
