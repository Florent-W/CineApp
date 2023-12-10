import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalVariant } from './modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  // styleUrls: ["./modal.component.scss"],
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() public title: string = '';
  @Input() public variant: ModalVariant = 'ajout-fiche';
  @Input() public formGroup?: any;
  @Input() public onSubmit?: any;
  @Input() public hasSubmit?: boolean = false;
  @Output() public closeEvent = new EventEmitter();
  @Output() public submitEvent = new EventEmitter();
  private sub = new Subscription();

  constructor(private elementRef: ElementRef) {}

  @ViewChild('modal', { read: ViewContainerRef })
  entry!: ViewContainerRef;

  ngOnInit(): void {
    console.log('Modal init');
  }

  ngOnDestroy(): void {
    console.log('Destroy Modal');
    this.sub.unsubscribe();
  }

  public closeMe(): void {
    this.elementRef.nativeElement.remove();
    this.closeEvent.emit();
  }

  // public confirm(): void {
  //   this.elementRef.nativeElement.remove();
  //   this.closeEvent.emit();
  // }
}
