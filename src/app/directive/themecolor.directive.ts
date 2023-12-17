import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTheme]'
})
export class ThemecolorDirective {
  @Input('appTheme') theme!: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges() {
    this.changeTheme(this.theme);
  }

  private changeTheme(theme: string) {
    if (theme) {
      this.renderer.setStyle(this.el.nativeElement, 'background-color', theme);
    }
  }
}
