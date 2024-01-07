import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  banners: any[] = [];
  isLoading: boolean = false;
  restaurants: any[] = [];
  constructor() { }

  ngOnInit() {
    this.isLoading = true;
    setTimeout(() => {
      this.banners = [
        {banner: 'assets/imgs/1.jpg'},
        {banner: 'assets/imgs/2.jpg'},
        {banner: 'assets/imgs/3.jpg'},
      ];
  
      this.restaurants = [
        {
          uid: 'fnwrfqinrwqniwqnrwq',
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
          uid: 'fnwrfqinrwqniwqnrer',
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
          uid: 'fnwrfqinrwqniwqnrfg',
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
      this.isLoading = false;
    }, 3000);
  }

}
