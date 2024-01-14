import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
})
export class ItemsPage implements OnInit {

  id: any;
  data: any = {};
  items: any[] = [];
  veg: boolean = false;
  restaurants = [
    {
      uid: 'fnwrfqinrwqniwqnrwq',
      cover: 'assets/imgs/1.jpg',
      name: 'Stay fit1',
      short_name: 'stayfit1',
      address: 'Karol bag new delhi',
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
      address: 'Karol bag new delhi',
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
      address: 'Karol bag new delhi',
      cuisines: ['Fast Food', 'Burgers', 'Desserts', 'Beverages'],
      rating: 4.5,
      delivery_time: 20,
      delivery_fee: 0,
      price: 100
    }
  ];

  categories: any[] = [
    {
      id: "e00",
      name: "Italian",
      uid: "12wefdss"
    },
    {
      id: "e0",
      name: "Mexican",
      uid: "12wefdss"
    },
  ]; 

  allItems = [
    {
        category_id: "e00",
        cover: "assets/imgs/pizza.jpg",
        desc: "Great in taste",
        id: "i1",
        name: "Pizza",
        price: 120,
        rating: 0,
        status: true,
        uid: "12wefdss",
        variation: false,
        veg: false
    },
    {
        category_id: "e0",
        cover: "assets/imgs/salad.jpg",
        desc: "Great in taste",
        id: "i2",
        name: "Caprese Salad",
        price: 200,
        rating: 0,
        status: true,
        uid: "12wefdss",
        variation: false,
        veg: true
    },
    {
        category_id: "e00",
        cover: "assets/imgs/pasta.jpg",
        desc: "Great in taste",
        id: "i3",
        name: "Pasta",
        price: 150.50,
        rating: 0,
        status: true,
        uid: "12wefdss",
        variation: false,
        veg: false
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController
    ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      // redirect
      if 
      (!paramMap.has('restaurantId')) {
        this.navCtrl.back();
        return;
      }
      this.id = paramMap.get('restaurantId');
      console.log("Id ", this.id);
      this.getItems();
    });
  }

  getItems() {
    this.data = {};
    const filteredItems = this.restaurants.filter(x => x.uid === this.id);
    this.data = filteredItems.length > 0 ? filteredItems[0] : {};
    console.log("Data",  this.data);
  }

  getCuisines(cuisines: any[]) {
    return cuisines.join(', ');
  }

  vegOnly(event: any) {
    console.log(event.detail.checked);
    // if (event.detail.checked) {
    //   this.items = this.data.items.filter(x => x.veg === true);
    // } else {
    //   this.items = this.data.items;
    // }
  }
}
