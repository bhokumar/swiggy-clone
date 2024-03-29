import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.scss'],
})
export class RestaurantDetailsComponent  implements OnInit {

  @Input() isLoading: boolean = false;
  @Input() data: any = {};
  
  constructor() { }

  ngOnInit() {}

  getCuisines(cuisines: any[]) {
    return cuisines.join(', ');
  }

}
