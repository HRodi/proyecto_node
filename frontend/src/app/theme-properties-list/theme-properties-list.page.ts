import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-theme-properties-list',
  templateUrl: './theme-properties-list.page.html',
  styleUrls: ['./theme-properties-list.page.scss'],
})
export class ThemePropertiesListPage implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  propiedadesTemas:any=[];
  token:string|null='';
  config:any;
  idTema=this.activatedRoute.snapshot.paramMap.get('theme_id')as string;

  constructor(
    private router:Router,
    private toastController:ToastController,
    private alertController:AlertController,
  ) {}

  buscarPropiedadesTemas(){
    console.log("Iniciando lista de propiedades del tema");
    axios.get('http://localhost:3000/themes_properties/consultarUnTema/'+this.idTema,this.config)
    .then((result)=>{
      if(result.data.success){
        this.propiedadesTemas = result.data.regTema;
        console.log('Propiedades obteneidas: ', result.data.regTema)
      }else{
        console.log('Error al obtener las propiedades: ',result.data.error);
      }
    }).catch((error)=>{console.log("No fue posible obtener las propiedades: ",error.message)})
  }

  ionVerificarToken():void{
    this.token = localStorage.getItem('token');
    if(!this.token){
      this.router.navigate(['/login']);
      return;
    }
    this.config={headers:{Authorization:this.token}};
    this.buscarPropiedadesTemas();
  }

  borrarPropiedadTema(idPropiedad:number){
    axios.delete('http://localhost:3000/themes_properties/delete/'+idPropiedad,this.config)
    .then((result)=>{
      if(result.data.success){
        this.buscarPropiedadesTemas();
        this.mostrarToast('Se eliminó el tema');
      }
    }).catch((error)=>{this.mostrarToast("No se pudo borrar: " + error.message)})
  }

  async confirmarBorrado(idPropiedad:number){
    const alert = await this.alertController.create({
      header:'Confirmar',message:'¿Estás seguro?',
      buttons:[
        {text:'Sí',handler:()=>{this.borrarPropiedadTema(idPropiedad)}},
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
    this.buscarPropiedadesTemas();
  }
}