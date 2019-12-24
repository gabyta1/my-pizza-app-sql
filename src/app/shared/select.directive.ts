import {AfterViewChecked, Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2} from '@angular/core';

@Directive({
  selector: '[appSelect]'
})
export class SelectDirective implements AfterViewChecked {
  @Input('appSelect') control;
  @Output() onSelect: EventEmitter<any> = new EventEmitter<any>();

  constructor(private elRef: ElementRef, private renderer: Renderer2) {

  }

  ngAfterViewChecked() {
    if (this.elRef.nativeElement === this.control) {
      this.renderer.setStyle(this.elRef.nativeElement, 'color', 'red');
    } else {
      this.renderer.setStyle(this.elRef.nativeElement, 'color', 'black');
    }
  }

    @HostListener('mousedown') onmousedown() {
        this.onSelect.emit(this.elRef.nativeElement);
        console.log(this.control);
      }
}
