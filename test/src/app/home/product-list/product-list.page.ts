import { Component, OnInit } from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButton, IonIcon, IonButtons, IonRouterLink,
  IonList, IonItem, IonLabel, IonItemSliding,
  IonItemOption, IonItemOptions
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, trash, create } from 'ionicons/icons';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButton, IonIcon, IonButtons, IonRouterLink,
    IonList, IonItem, IonLabel, IonItemSliding,
    IonItemOption, IonItemOptions,
    CommonModule,
    RouterLink
  ],
  providers: [ProductService]
})
export class ProductListPage implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {
    addIcons({ add, trash, create });
  }

  async ngOnInit() {
    this.loadProducts();
  }

  async loadProducts() {
    this.products = await this.productService.getProducts();
  }

  async deleteProduct(productId: number) {
    const success = await this.productService.deleteProduct(productId);
    if (success) {
      this.loadProducts();
    }
  }
}
