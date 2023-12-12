import { Component, OnInit } from '@angular/core';
import { List, ListsService } from '../shared/services/lists.service';

@Component({
  selector: 'app-list-modal',
  templateUrl: './list-modal.component.html',
  styleUrls: ['./list-modal.component.scss'],
})
export class ListModalComponent implements OnInit {
  constructor(private listsService: ListsService) {}

  ngOnInit(): void {
    this.listsService.getCurrentUserList();
  }

  get lists() {
    return this.listsService.currentUserLists;
  }
}
