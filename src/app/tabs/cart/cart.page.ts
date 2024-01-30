import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { IonContent } from '@ionic/angular';
import * as moment from 'moment';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  @ViewChild(IonContent, { static: false }) content!: IonContent;
  urlCheck: string = '';
  instructions: string = '';
  url: any = [];
  model: CartData = {
    items: [],
    restaurant: {},
    total: 0,
    totalItems: 0,
    totalPrice: 0,
    deliveryCharge: 0
  };
  location: any = {};
  constructor(private router: Router) {}

  ngOnInit() {
    this.checkUrl();
    this.getCartData();
  }

  async getCart() {
    const cartData = await Preferences.get({ key: 'cart' });
    return cartData;
  }

  async getCartData() {
    let data: any = await this.getCart();
    this.location = {
      lat: 28.653831, 
      lng: 77.188257, 
      address: 'Karol Bagh, New Delhi'
    };
    if (data.value) {
      this.model = JSON.parse(data.value);
      await this.calculate();
    }
  }

  async calculate() {
    const items = this.model.items.filter(x => x.quantity > 0);
    this.model.items = items;
    this.model.total = 0;
    this.model.totalPrice = 0;
    this.model.deliveryCharge = 0;
    items.forEach(item => {
      this.model.totalPrice += item.quantity * item.price;
      this.model.totalItems += item.quantity;    
    });

    this.model.total = this.model.totalPrice + this.model.deliveryCharge;
    console.log('Model:', this.model);
    if (this.model.totalItems === 0) {
      await this.clearCart(); 
    }
  }

  async clearCart() {
    await Preferences.remove({ key: 'cart' });
    this.model = {
      items: [],
      restaurant: {},
      total: 0,
      totalItems: 0,
      totalPrice: 0,
      deliveryCharge: 0
    };
  }

  checkUrl() {
    let url = this.router.url.split('/');
    console.log('Url:', url);
    const spliced = url.splice(url.length -2, 2);
    this.urlCheck = spliced[0];
    console.log('UrlCheck:', this.urlCheck);
    url.push(this.urlCheck);
    this.url = url;
  }

  getPreviousUrl() {
    return this.url.join('/');
  }

  quantityMinus(index: number) {
    if (this.model.items[index].quantity > 0) {
      this.model.items[index].quantity -= 1;
    } else {
      this.model.items[index].quantity = 0;
    }
    this.calculate();    
  }

  quantityPlus(index: number) {
    this.model.items[index].quantity += 1;
    this.calculate();
  }

  scrollToBottom() {
    this.content.scrollToBottom(500);
  }
  addAddress() {
    console.log('Add Address');
  }

  changeAddress() {
    console.log('Change Address');
  }

  makePayment() {
    try {
      const data = {
        restaurant_id: this.model?.restaurant.id,
        res: this.model?.restaurant,
        order: JSON.stringify(this.model?.items),
        time: moment().format('lll'),
        address: this.location,
        total: this.model?.totalPrice,
        grandTotal: this.model?.total,
        deleiveryCharge: this.model?.deliveryCharge,
        status: 'Created',
        paid: 'COD'
      };
    } catch (error) {
      console.log('Error:', error);
     }
  }
}


interface CartData {
  items: any[];
  restaurant: any;
  total: number;
  totalItems?: number;
  totalPrice: number;
  deliveryCharge: number;
}