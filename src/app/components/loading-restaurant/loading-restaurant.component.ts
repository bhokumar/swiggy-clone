import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-restaurant',
  templateUrl: './loading-restaurant.component.html',
  styleUrls: ['./loading-restaurant.component.scss'],
})
export class LoadingRestaurantComponent  implements OnInit {

  dummy: number[] = [];
  constructor() { }

  ngOnInit() {
    this.dummy  = [1,2,3,4,5,6,7,8,9,10];
  }

}
