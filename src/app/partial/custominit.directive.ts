import { Directive, ElementRef, Renderer } from '@angular/core';

// Directive decorator
// tslint:disable-next-line:directive-selector
@Directive({ selector: '[customInit]' })
// Directive class
export class CustomInitDirective {
    constructor(el: ElementRef, renderer: Renderer) {
        // Use renderer to render the element with styles
        // renderer.setElementStyle(el.nativeElement, 'display', 'none');
        el.nativeElement.style.color = 'green';
    }
// tslint:disable-next-line:eofline
}