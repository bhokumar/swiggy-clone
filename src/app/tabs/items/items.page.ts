import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
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
  isLoading: boolean = false;
  veg: boolean = false;
  storeData: CartData = {
    items: [],
    restaurant: {},
    total: 0,
    totalItems: 0
  };
  cartData: CartData = {
    items: [],
    restaurant: {},
    total: 0,
    totalItems: 0
  };
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
      uid: "fnwrfqinrwqniwqnrwq"
    },
    {
      id: "e0",
      name: "Mexican",
      uid: "fnwrfqinrwqniwqnrwq"
    },
  ]; 

  allItems = [
    {
        category_id: "e00",
        cover: "assets/imgs/pizza.jpg",
        desc: "Great in taste",
        id: "i1",
        name: "Pizza",
        quantity:0,
        price: 120,
        rating: 0,
        status: true,
        uid: "fnwrfqinrwqniwqnrwq",
        variation: false,
        veg: false
    },
    {
        category_id: "e0",
        cover: "assets/imgs/salad.jpg",
        desc: "Great in taste",
        id: "i2",
        name: "Caprese Salad",
        quantity:0,
        price: 200,
        rating: 0,
        status: true,
        uid: "fnwrfqinrwqniwqnrer",
        variation: false,
        veg: true
    },
    {
        category_id: "e00",
        cover: "assets/imgs/pasta.jpg",
        desc: "Great in taste",
        id: "i3",
        name: "Pasta",
        quantity:0,
        price: 150.50,
        rating: 0,
        status: true,
        uid: "fnwrfqinrwqniwqnrwq",
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

 async getItems() {
    this.data = {};
    this.cartData = {
      items: [],
      restaurant: {},
      total: 0,
      totalItems: 0
    };
    const filteredItems = this.restaurants.filter(x => x.uid === this.id);
    this.data = filteredItems.length > 0 ? filteredItems[0] : {};
    this.items = this.allItems.filter(x => x.uid === this.id);
    this.categories = this.categories.filter(x => x.uid === this.id);
    console.log("Data",  this.data);
    const cart = await this.getCart();
    if (cart.value) {
      this.storeData = JSON.parse(cart.value);
      console.log("Store Data", this.storeData);
      if (this.id === this.storeData.restaurant.uid) {
        this.cartData = this.storeData;
        this.allItems.forEach(item => {
          const index = this.cartData.items.findIndex(x => x.id === item.id);
          if (index > -1) {
            item.quantity = this.cartData.items[index].quantity;
          }
        });
        this.cartData.totalItems = this.storeData.totalItems;
        this.cartData.total = this.storeData.total;
      }
    }
  }

  getCuisines(cuisines: any[]) {
    return cuisines.join(', ');
  }

  vegOnly(event: any) {
    console.log(event.detail.checked);
    if (event.detail.checked) {
      this.items = this.allItems.filter(x => x.veg === true);
    } else {
      this.items = this.allItems;
    }
  }

  quantityPlus(index: number) {
    this.allItems[index].quantity += 1;
    this.calculate();
  }

  quantityMinus(index: number) {
    this.allItems[index].quantity -= 1;
    this.calculate();
  }

  calculate() {
    this.cartData.items = this.allItems.filter(x => x.quantity > 0);
    this.cartData.total = this.calculateTotal();
    this.cartData.totalItems = this.calculateTotalItems();
  }

  calculateTotal() {
    let total = 0;
    this.cartData.items.forEach(item => {
      total += item.quantity * item.price;
    });
    return total;
  }

  calculateTotalItems() {
    let total = 0;
    this.cartData.items.forEach(item => {
      total += item.quantity;
    });
    return total;
  }

  checkout() {
    console.log("Checkout");
  }

  async viewCart() {
    console.log("View Cart");
    if (this.cartData.totalItems > 0) {
      await this.saveCart();
      // this.navCtrl.navigateForward(['/tabs/cart']);
    }
  }

  async getCart() {
    return await Preferences.get({ key: 'cart' });
  }
  async saveCart() { 
    try {
      this.cartData.restaurant = this.data;
      const cart = JSON.stringify(this.cartData);
      await Preferences.set({ key: 'cart', value: cart });
    } catch (error) {
      console.log("Error", error);
    }
   
   }
}


interface CartData {
  items: any[];
  restaurant: any;
  total: number;
  totalItems: number;
}