import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonicModule, ToastController, LoadingController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactoService } from '../services/contacto/contacto.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class MenuPage implements OnInit {
  userData: any;
  contactos: any = [];

  constructor(
    private router: Router,
    private contactoService: ContactoService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController // Agregado para manejar el loader
  ) {}

  async ngOnInit() {
    // Obtener datos del usuario desde la navegación o localStorage
    if (this.router.getCurrentNavigation()?.extras.state?.['userData']) {
      this.userData = this.router.getCurrentNavigation()?.extras.state?.['userData'];
      console.log('Datos del usuario desde navegación:', this.userData);
    } else {
      const storedUserData = localStorage.getItem('userData');
      if (storedUserData) {
        this.userData = JSON.parse(storedUserData);
        console.log('Datos del usuario desde localStorage:', this.userData);
      } else {
        this.cerrarSesion();
      }
    }

    await this.cargarContactos();
  }

  async cargarContactos() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando contactos...',
      spinner: 'crescent'
    });
    await loading.present();

    this.contactoService.getContactos(this.userData.cod_persona).subscribe(
      async (response: any) => {
        this.contactos = response.data;
        await loading.dismiss();
      },
      async (error) => {
        await loading.dismiss();
        this.showAlert('Error', 'No se pudo cargar la lista de contactos.');
      }
    );
  }

  abrirFormularioAgregar(idUser: any) {
    this.alertCtrl
      .create({
        header: 'Agregar Contacto',
        inputs: [
          { name: 'nombre_contacto', placeholder: 'Nombre', type: 'text' },
          { name: 'apellido_contacto', placeholder: 'Apellido', type: 'text' },
          { name: 'telefono_contacto', placeholder: 'Teléfono', type: 'tel' },
          { name: 'correo_contacto', placeholder: 'Email', type: 'email' },
        ],
        buttons: [
          { text: 'Cancelar', role: 'cancel' },
          {
            text: 'Guardar',
            handler: (data) => {
              this.agregarContacto(data, idUser);
            },
          },
        ],
      })
      .then((alert) => alert.present());
  }

  async agregarContacto(data: any, idUser: any) {
    const loading = await this.loadingCtrl.create({
      message: 'Guardando contacto...',
      spinner: 'crescent'
    });
    await loading.present();

    this.contactoService.addContacto(data, idUser).subscribe(
      async (response: any) => {
        await loading.dismiss();

        if (response.estado) {
          this.cargarContactos();
          this.showToast('Contacto agregado correctamente.');
        } else if (response.code == 409) {
          this.showAlert('Error', 'Número de teléfono repetido.');
        } else {
          this.showAlert('Error', 'No se pudo agregar el contacto.');
        }
      },
      async (error) => {
        await loading.dismiss();
        this.showAlert('Error', 'No se pudo conectar con el servidor.');
      }
    );
  }

  editarContacto(cod_contacto: any, contacto: any) {
    this.alertCtrl
      .create({
        header: 'Editar Contacto',
        inputs: [
          { name: 'nombre_contacto', value: contacto.nombre_contacto, type: 'text' },
          { name: 'apellido_contacto', value: contacto.apellido_contacto, type: 'text' },
          { name: 'telefono_contacto', value: contacto.telefono_contacto, type: 'tel' },
          { name: 'correo_contacto', value: contacto.correo_contacto, type: 'email' },
        ],
        buttons: [
          { text: 'Cancelar', role: 'cancel' },
          {
            text: 'Guardar',
            handler: (data) => {
              this.actualizarContacto(cod_contacto, data);
            },
          },
        ],
      })
      .then((alert) => alert.present());
  }

  async actualizarContacto(cod_contacto: any, data: any) {
    const loading = await this.loadingCtrl.create({
      message: 'Actualizando contacto...',
      spinner: 'crescent'
    });
    await loading.present();

    this.contactoService.updateContacto(cod_contacto, data).subscribe(
      async (response: any) => {
        await loading.dismiss();

        if (response.estado) {
          this.cargarContactos();
          this.showToast('Contacto actualizado correctamente.');
        } else {
          this.showAlert('Error', 'No se pudo actualizar el contacto.');
        }
      },
      async (error) => {
        await loading.dismiss();
        this.showAlert('Error', 'No se pudo conectar con el servidor.');
      }
    );
  }

  async eliminarContacto(cod_contacto: any) {
    // Mostrar alerta de confirmación
    const alert = await this.alertCtrl.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar este contacto?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: async () => {
            // Proceder con la eliminación después de la confirmación
            const loading = await this.loadingCtrl.create({
              message: 'Eliminando contacto...',
              spinner: 'crescent'
            });
            await loading.present();
  
            this.contactoService.deleteContacto(cod_contacto).subscribe(
              async (response: any) => {
                await loading.dismiss();
  
                if (response.estado) {
                  this.cargarContactos();
                  this.showToast('Contacto eliminado correctamente.');
                } else {
                  this.showAlert('Error', 'No se pudo eliminar el contacto.');
                }
              },
              async (error) => {
                await loading.dismiss();
                this.showAlert('Error', 'No se pudo conectar con el servidor.');
              }
            );
          }
        }
      ]
    });
  
    await alert.present();
  }
  

  irContactos() {
    this.router.navigate(['/menu']);
  }

  irPerfil() {
    this.router.navigate(['/perfil']);
  }

  cerrarSesion() {
    localStorage.removeItem('userData'); // Eliminar datos de sesión
    this.router.navigate(['/login']); // Redirigir al login
    this.showToast('Sesión cerrada correctamente.');
  }

  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
