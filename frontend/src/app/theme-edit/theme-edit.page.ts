import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Platform, ToastController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-theme-edit',
  templateUrl: './theme-edit.page.html',
  styleUrls: ['./theme-edit.page.scss'],
})
export class ThemeEditPage implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private platform = inject(Platform);
  tema: any='';
  titulo='Agregar un tema';
  id=this.activatedRoute.snapshot.paramMap.get('id')as string;
  
  constructor(
    private toastController:ToastController,
    private router:Router
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

  txtBotonRetroceso(){
    return this.platform.is('android') ? 'Inbox':'Inicio';
  }

  guardarTema(){
    let token = localStorage.getItem('token');
    let config = {headers:{Authorization: token}};
    console.log('id:', this.tema.id,
      'name: ', this.tema.name,
      'description: ',this.tema.description)
    var data = {
      id: this.id,
      create_date:this.tema.create_date,
      name: this.tema.name,
      description:this.tema.description,
      keywords:this.tema.keywords
    };
    axios.post('http://localhost:3000/themes/update',data,config)
    .then(async(result)=>{
      if(result.data.success){
        this.mostrarToast('Tema Guardado');
        this.router.navigate(['/theme-list']).then(()=>{
          window.location.reload();
        });
      }else{
        this.mostrarToast(result.data.error);
      }
    })
  }

  ngOnInit() {
    let token = localStorage.getItem('token');
    let config = {headers:{Authorization: token}};

    axios.get('http://localhost:3000/themes/'+this.id,config)
    .then((result)=>{
      if(result.data.success){
        if(this.id != '0'){
          this.titulo = 'Editar'
        }
        if(result.data.tema != null){
          this.tema = result.data.tema;
        }else{
          this.tema = {};
        }
      }else{
        console.log('No se pudo obtener el tema: ',result.data.error);
      }
    }).catch((error)=>{console.log(error.mensaje)});
  }
}