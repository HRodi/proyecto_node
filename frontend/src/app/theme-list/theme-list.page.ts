import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-theme-list',
  templateUrl: './theme-list.page.html',
  styleUrls: ['./theme-list.page.scss'],
})
export class ThemeListPage implements OnInit {
  temas: any = [];
  token: string | null = '';
  config:any;

  constructor(
    private router:Router,
    private toastController:ToastController,
    private alertController:AlertController
  ) {}

  buscarTemas(){
    console.log("Iniciando lista de temas");
    axios.get('http://localhost:3000/themes/list',this.config)
    .then((result)=>{
      if(result.data.success){
        this.temas = result.data.temas;
        console.log('Temas obteneidos: ', this.temas)
      }else{
        console.log("Error al obtener los temas: ", result.data.error);
      }
    }).catch((error)=>{console.log("No fue posible obtener los temas: ", error.message)});
  }

  ionVerificarToken():void{
    this.token = localStorage.getItem('token');
    if(!this.token){
      this.router.navigate(['/login']);
      return;
    }
    this.config={headers:{Authorization:this.token}};
    this.buscarTemas();
  }

  borrarTema(id:number){
    axios.delete('http://localhost:3000/themes/delete/'+id,this.config)
    .then((result)=>{
      if(result.data.success){
        this.buscarTemas();
        this.mostrarToast('Se eliminó el tema');
      }
    }).catch((error)=>{this.mostrarToast("No se pudo borrar:"+ error.message)})
  }

  async confirmarBorrado(id:number){
    const alert = await this.alertController.create({
      header:'Confirmar',message:'¿Estás seguro?',
      buttons:[
        {text:'Sí',handler:()=>{this.borrarTema(id)}},
        {text:'No',handler:()=>{}}
      ]
    })
    await alert.present();
  }

  async mostrarToast(mensaje:string){
    const toast = await this.toastController.create({
      message:mensaje,
      duration:2000,
      position:'middle'
    });
    await toast.present();
  }

  ngOnInit() {
    this.buscarTemas();
  }
}
