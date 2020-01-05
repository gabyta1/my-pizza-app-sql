
import { Directive, ElementRef, HostListener, OnInit, Renderer2} from '@angular/core';


@Directive({
  selector: '[appButton]'
})
export class ButtonDirective implements OnInit {





  constructor(private elRef: ElementRef, private renderer: Renderer2) {

  }

  ngOnInit() {
  }

@HostListener('mousedown') onmousedown() {
   if (this.elRef.nativeElement.style.backgroundColor === 'blue') {
     this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'rgba(200,0,0,0.7)');
   } else {
     this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue');

   }

}



}
