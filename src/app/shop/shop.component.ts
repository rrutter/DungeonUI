import { Component, OnInit } from '@angular/core';
import { ShopService } from '../services/shop.service';
import { InventoryService } from '../services/inventory.service'; // Import the new Inventory Service
import { Router } from "@angular/router";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  shopItems: any[] = [];
  playerItems: any[] = [];  // Holds the player's inventory
  characterId = 1;  // Assuming the character ID is known (or retrieve it dynamically)

  constructor(
    private shopService: ShopService,
    private inventoryService: InventoryService,  // Inject Inventory Service
    private router: Router) { }

  ngOnInit(): void {
    this.loadShopItems();
    this.loadPlayerInventory();  // Load player's inventory when the component initializes
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

  loadPlayerInventory(): void {
    this.inventoryService.getInventory(this.characterId).subscribe(
      (items) => {
        this.playerItems = items;
      },
      (error) => {
        console.error('Error fetching player inventory', error);
      }
    );
  }

  buyItem(item: any): void {
    this.shopService.buyItem(item.id).subscribe(
      (response) => {
        console.log('Item purchased', response);
        this.loadShopItems();  // Reload shop items after purchase

        // Add the item to the player's inventory
        this.inventoryService.addItemToInventory(this.characterId, item.id).subscribe(() => {
          this.loadPlayerInventory();  // Reload inventory after adding the item
        });
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

        // Remove the item from the player's inventory
        this.inventoryService.removeItemFromInventory(this.characterId, item.id).subscribe(() => {
          this.loadPlayerInventory();  // Reload inventory after removing the item
        });
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
