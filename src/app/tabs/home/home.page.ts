import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  banners: any[] = [];
  restaurants: any[] = [];
  constructor() { }

  ngOnInit() {
    this.banners = [
      {banner: 'assets/imgs/1.jpg'},
      {banner: 'assets/imgs/2.jpg'},
      {banner: 'assets/imgs/3.jpg'},
    ];

    this.restaurants = [
      {
        cover: 'assets/imgs/1.jpg',
        name: 'Stay fit',
        short_name: 'Stay fit',
        cuisines: ['Fast Food', 'Burgers', 'Desserts', 'Beverages'],
        rating: 4.5,
        delivery_time: 30,
        delivery_fee: 0,
        distance: 2.5,
        price: 100
      },
      {
        cover: 'assets/imgs/2.jpg',
        name: 'Stay fit1',
        short_name: 'Stay fit',
        cuisines: ['Fast Food', 'Burgers', 'Desserts', 'Beverages'],
        rating: 4.5,
        delivery_time: 20,
        delivery_fee: 0,
        distance: 2.5,
        price: 100
      },
      {
        cover: 'assets/imgs/3.jpg',
        name: 'Stay fit1',
        short_name: 'Stay fit',
        cuisines: ['Fast Food', 'Burgers', 'Desserts', 'Beverages'],
        rating: 4.5,
        delivery_time: 20,
        delivery_fee: 0,
        distance: 2.5,
        price: 100
      }
    ];
  }

}
