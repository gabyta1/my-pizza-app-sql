import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appButtonTopping]'
})
export class ButtonToppingDirective {

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  private highlight(color: string) {
    this.elRef.nativeElement.style.backgroundColor = color;
  }

}


