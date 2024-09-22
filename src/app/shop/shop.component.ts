import { Component, OnInit } from '@angular/core';
import { ShopService } from '../services/shop.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  shopItems: any[] = [];
  playerItems: any[] = [];  // You may want to fill this with player's actual inventory

  constructor(private shopService: ShopService,
              private router: Router) { }

  ngOnInit(): void {
    this.loadShopItems();
  }

  loadShopItems(): void {
    this.shopService.getShopItems().subscribe(
      (items) => {
        this.shopItems = items;
      },
      (error) => {
        console.error('Error fetching shop items', error);
      }
    );
  }

  buyItem(item: any): void {
    this.shopService.buyItem(item.id).subscribe(
      (response) => {
        console.log('Item purchased', response);
        this.loadShopItems();  // Reload shop items after purchase
      },
      (error) => {
        console.error('Error purchasing item', error);
      }
    );
  }

  sellItem(item: any): void {
    this.shopService.sellItem(item.id).subscribe(
      (response) => {
        console.log('Item sold', response);
        this.loadShopItems();  // Reload shop items after selling
      },
      (error) => {
        console.error('Error selling item', error);
      }
    );
  }

  goBackToTown(): void {
    this.router.navigate(['/town']);
  }
}
