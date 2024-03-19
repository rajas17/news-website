import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  constructor(private _router:Router, private _renderer:Renderer2, private elementRef: ElementRef){}
  @Input() postData:any;
  ngOnInit(): void {
  
  }
  
}
