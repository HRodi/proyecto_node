import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Platform, ToastController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.page.html',
  styleUrls: ['./user-edit.page.scss'],
})
export class UserEditPage implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private platform = inject(Platform);
  usuario: any = '';
  titulo = 'Agregar un usuario';
  id = this.activatedRoute.snapshot.paramMap.get('id') as string;

  constructor(
    private toastController: ToastController,
    private router: Router
  ) {}

  async mostrarToast(mensaje:string){
    const toast = await this.toastController.create({
      message: mensaje, duration: 2000, position:'middle'
    })
    await toast.present();
  }

  verificarToken(): void {
    let token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }
  }

  ngOnInit() {
    let token = localStorage.getItem('token');
    let config = { headers: { Authorization: token } };
    
    axios.get('http://localhost:3000/users/' + this.id, config)
    .then((result) => {
      if (result.data.success) {
        if (this.id) {
          this.titulo = 'Editar';
        }
        if (result.data.usuario != null) {
          this.usuario = result.data.usuario;
        } else {
          this.usuario = {};
        }
      }else{
        console.log(result.data.error);
      }
    }).catch((error)=>{console.log(error.message)});
  }

  txtBotonRetroceso(){
    return 'Inicio';
  }

  guardarUsuario(){
    let token = localStorage.getItem('token');
    let config = {headers:{Authorization: token}};
    console.log('id', this.usuario.id,'name', this.usuario.name,)
    var data = {
      id: this.id,
      name: this.usuario.name,
      last_name: this.usuario.last_name,
      email: this.usuario.email,
    };
    axios.post('http://localhost:3000/users/update',data,config)
    .then(async(result)=>{
      if(result.data.success){
        this.router.navigate(['/user-list']).then(() => {
          window.location.reload();
        });
        this.mostrarToast('Usuario Guardado');
      }else{
        this.mostrarToast(result.data.error);
      }
    })
  }
}