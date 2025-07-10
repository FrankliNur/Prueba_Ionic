import { Injectable, inject } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Product } from '../models/product.model';
import { ToastController } from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private storage = inject(Storage);
  private storageKey = 'products';
  private toastCtrl = inject(ToastController);

  constructor() {
    this.initStorage();
  }

  private async initStorage() {
    await this.storage.create();
  }

  async getProducts(): Promise<Product[]> {
    try {
      return (await this.storage.get(this.storageKey)) || [];
    } catch (error) {
      console.error('Error al obtener productos:', error);
      await this.showToast('Error al cargar productos', 'danger');
      return [];
    }
  }

  async addProduct(product: Product): Promise<boolean> {
    try {
      const products = await this.getProducts();
      product.id = Date.now(); // ID único basado en timestamp
      products.push(product);
      await this.storage.set(this.storageKey, products);
      await this.showToast('Producto creado con éxito', 'success');
      return true;
    } catch (error) {
      console.error('Error al agregar producto:', error);
      await this.showToast('Error al crear producto', 'danger');
      return false;
    }
  }

  async updateProduct(updatedProduct: Product): Promise<boolean> {
    try {
      let products = await this.getProducts();
      const index = products.findIndex(p => p.id === updatedProduct.id);

      if (index !== -1) {
        products[index] = updatedProduct;
        await this.storage.set(this.storageKey, products);
        await this.showToast('Producto actualizado', 'success');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      await this.showToast('Error al actualizar', 'danger');
      return false;
    }
  }

  async deleteProduct(id: number): Promise<boolean> {
    try {
      let products = await this.getProducts();
      products = products.filter(p => p.id !== id);
      await this.storage.set(this.storageKey, products);
      await this.showToast('Producto eliminado', 'warning');
      return true;
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      await this.showToast('Error al eliminar', 'danger');
      return false;
    }
  }

  async getProductById(id: number): Promise<Product | undefined> {
    try {
      const products = await this.getProducts();
      return products.find(p => p.id === id);
    } catch (error) {
      console.error('Error al buscar producto:', error);
      return undefined;
    }
  }

  private async showToast(message: string, color: 'success' | 'danger' | 'warning') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color,
      position: 'top'
    });
    await toast.present();
  }
}
