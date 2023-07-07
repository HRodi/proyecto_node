import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.page.html',
  styleUrls: ['./user-list.page.scss'],
})
export class UserListPage implements OnInit {

  usuarios: any = [];
  token: string | null = '';
  config:any;
  constructor(
    private router:Router,
    private toastController:ToastController,
    private alertController:AlertController,
  ) { }

  async mostrarToast(mensage:string){
    const toast = await this.toastController.create({
      message:mensage,
      duration:2000,
      position:'middle'
    });
    await toast.present();
  }

  buscarUsuarios(){
    console.log("Iniciando lista de usuarios");
    axios.get('http://localhost:3000/users/list',this.config)
    .then((result)=>{
      if(result.data.success){
        this.usuarios = result.data.usuarios;
      }else{
        console.log(result.data.error);
      }  
    }).catch((error)=>{console.log(error.message)});
  }

  borrarUsuario(id:number){
    axios.delete('http://localhost:3000/users/delete/'+id,this.config)
    .then((result)=>{
      if(result.data.success){
        this.buscarUsuarios();
        this.mostrarToast('Se eliminó el usuario');
      }
    }).catch((error)=>{this.mostrarToast(error.message)})
  }

  async confirmarBorrado(id:number){
    const alert = await this.alertController.create({
      header:'Confirmar',
      message:'¿Estás seguro?',
      buttons:[
        {text:'Sí',handler:()=>{this.borrarUsuario(id)}},
        {text:'No',handler:()=>{}}
      ]
    })
    await alert.present();
  }

  ionVerificarToken():void{
    this.token = localStorage.getItem('token');
    if(!this.token){
      this.router.navigate(['/login']);
      return;
    }
    this.config ={headers:{Authorization:this.token}};
    this.buscarUsuarios();
  }

  ngOnInit() {
    this.ionVerificarToken();
  }

}
