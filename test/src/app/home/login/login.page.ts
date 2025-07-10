import { Component } from '@angular/core';
import {
  IonContent,
  IonItem,
  IonInput,
  IonButton,
  IonLabel
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular/standalone';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [
    IonContent,
    IonItem,
    IonInput,
    IonButton,
    FormsModule
  ]
})
export class LoginPage {
  username = '';
  password = '';

  constructor(
    private router: Router,
    private toastController: ToastController
  ) {}

  async login() {
    if (this.username === 'admin' && this.password === 'admin') {
      this.router.navigate(['/product-list']);
    } else {
      const toast = await this.toastController.create({
        message: 'Credenciales incorrectas',
        duration: 2000,
        color: 'danger',
        position: 'top'
      });
      await toast.present();
    }
  }
}
