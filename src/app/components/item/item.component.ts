import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent  implements OnInit {

  @Input() item: any = {};
  @Input() index: number = 0;
  @Output() add: EventEmitter<any> = new EventEmitter<any>();
  @Output() minus: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {}

  quantityPlus() {
    this.add.emit(this.index);
  }

  quantityMinus() {

  }

}
