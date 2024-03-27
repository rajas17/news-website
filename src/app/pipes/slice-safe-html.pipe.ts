import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'sliceSafeHtml'
})
export class SliceSafeHtmlPipe implements PipeTransform {

    constructor(private sanitizer:DomSanitizer){}
  
    transform(value: string, start: number, end: number):SafeHtml {
      const sanitizedHTML = this.sanitizer.bypassSecurityTrustHtml(value);
      
      const slicedHTML = value.slice(start, end);
  
      return this.sanitizer.bypassSecurityTrustHtml(slicedHTML);  }
  }
  


