import { Component, Input } from '@angular/core';
import { List } from 'src/app/shared/services/lists.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent {
  @Input() list?: List;
}
