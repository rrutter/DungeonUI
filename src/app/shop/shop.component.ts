import { Component, OnInit } from '@angular/core';
import { ShopService } from '../services/shop.service';
import { InventoryService } from '../services/inventory.service'; // Import the new Inventory Service
import { Router } from "@angular/router";
import {CharacterService} from "../services/character.service";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  shopItems: any[] = [];
  playerItems: any[] = [];  // Holds the player's inventory
  character: any;

  constructor(
    private shopService: ShopService,
    private inventoryService: InventoryService,
    private characterService: CharacterService,
    private router: Router) { }

  ngOnInit(): void {
    this.character = this.characterService.getSelectedCharacter();
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
    this.inventoryService.getInventory(this.character.id).subscribe(
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
        this.updateUIAfterTransaction();  // Refresh both the shop and the player's inventory
      },
      (error) => {
        console.error('Error purchasing item', error);
      }
    );
  }

  sellItem(item: any): void {
    this.shopService.sellItem(item.slotNumber).subscribe(
      (response) => {
        console.log('Item sold', response);
        this.updateUIAfterTransaction();  // Refresh both the shop and the player's inventory
      },
      (error) => {
        console.error('Error selling item', error);
      }
    );
  }

  updateUIAfterTransaction(): void {
    console.log('updating ui after transaction...');
    this.loadShopItems();  // Reload shop items after a successful transaction
    this.loadPlayerInventory();  // Reload inventory after a successful transaction
  }

  goBackToTown(): void {
    this.router.navigate(['/town']);
  }
}

