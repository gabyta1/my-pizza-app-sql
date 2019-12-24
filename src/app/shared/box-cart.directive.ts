import {Directive, ElementRef, HostListener, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appBox]'
})
export class BoxCartDirective implements OnInit {
    sizeBoxCart = 600;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {

  }

  ngOnInit() {
  }
  @HostListener('onchange') sizeBox() {
    if (this.elRef.nativeElement.style.height < this.sizeBoxCart) {
      this.renderer.setStyle(this.elRef.nativeElement, 'height', 'sizeBoxCart');
    }
      }
}
