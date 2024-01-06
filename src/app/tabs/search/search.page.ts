import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  @ViewChild('searchInput') sInput: any;
  query: string = '';
  isLoading: boolean = false;
  allRestaurants: any[] = [
    {
      cover: 'assets/imgs/1.jpg',
      name: 'Stay fit1',
      short_name: 'stayfit1',
      cuisines: ['Fast Food', 'Burgers', 'Desserts', 'Beverages'],
      rating: 4.5,
      delivery_time: 30,
      delivery_fee: 0,
      price: 100
    },
    {
      cover: 'assets/imgs/2.jpg',
      name: 'Stay fit2',
      short_name: 'stayfit2',
      cuisines: ['Fast Food', 'Burgers', 'Desserts', 'Beverages'],
      rating: 4.5,
      delivery_time: 20,
      delivery_fee: 0,
      price: 100
    },
    {
      cover: 'assets/imgs/3.jpg',
      name: 'Stay fit3',
      short_name: 'stayfit3',
      cuisines: ['Fast Food', 'Burgers', 'Desserts', 'Beverages'],
      rating: 4.5,
      delivery_time: 20,
      delivery_fee: 0,
      price: 100
    }
  ];

  restaurants: any[] = [];
  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.sInput.setFocus();
    }, 500);
  }

  onSearchChange(event: any) {
    console.log(event.detail.value);
    this.query = event.detail.value.toLowerCase();

    if (this.query.length > 0) {
      this.restaurants = this.allRestaurants.filter((restaurant) => { 
        return restaurant.short_name.includes(this.query);
      });
      console.log(this.restaurants);
    }
  }

}
