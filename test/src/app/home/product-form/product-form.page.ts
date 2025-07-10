import { Component, OnInit, inject } from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonInput, IonButton, IonItem, IonTextarea,
  ToastController
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.page.html',
  styleUrls: ['./product-form.page.scss'],
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonInput, IonButton, IonItem, IonTextarea,
    FormsModule,
    CommonModule
  ]
})
export class ProductFormPage implements OnInit {
  product: Product = {
    name: '',
    description: '',
    category: '',
    image: ''
  };
  isEditMode = false;

  private productService = inject(ProductService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private toastCtrl = inject(ToastController);

  async ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.isEditMode = true;
      const product = await this.productService.getProductById(+productId);
      if (product) {
        this.product = product;
      }
    }
  }

  async saveProduct() {
    try {
      if (this.isEditMode) {
        await this.productService.updateProduct(this.product);
        await this.showToast('Producto actualizado exitosamente', 'success');
      } else {
        await this.productService.addProduct(this.product);
        await this.showToast('Producto creado exitosamente', 'success');
      }
      // Redirige a la lista de productos después de guardar
      this.router.navigate(['/product-list']);
    } catch (error) {
      await this.showToast('Error al guardar el producto', 'danger');
    }
  }

  private async showToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color,
      position: 'top'
    });
    await toast.present();
  }
}
