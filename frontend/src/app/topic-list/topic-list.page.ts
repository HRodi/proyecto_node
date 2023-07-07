import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.page.html',
  styleUrls: ['./topic-list.page.scss'],
})
export class TopicListPage implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  topicos:any=[];
  token:string|null='';
  config:any;
  idTema=this.activatedRoute.snapshot.paramMap.get('theme_id')as string;

  constructor(
    private router:Router,
    private toastController:ToastController,
    private alertController:AlertController
  ) {}

  ionVerificarToken():void{
    this.token = localStorage.getItem('token');
    if(!this.token){
      this.router.navigate(['/login']);
      return;
    }
    this.config={headers:{Authorization:this.token}};
    this.buscarTopicos();
  }

  async mostrarToast(mensaje:string){
    const toast = await this.toastController.create({
      message:mensaje,
      duration:2000,
      position:'middle'
    });
    await toast.present();
  }

  buscarTopicos(){
    console.log("Iniciando lista de tópicos del tema");
    axios.get('http://localhost:3000/topics/consuTopTem/'+this.idTema, this.config)
    .then((result)=>{
      if(result.data.success){
        this.topicos = result.data.topTem;
        console.log('Topicos obtenidos: ',result.data.topTem)
      }else{
        console.log('Error al obtener los tópicos: ',result.data.error)
      }
    }).catch((error)=>{console.log("No fue posible obtener los topicos")})
  }

  borrarTopico(idTopico:number){
    axios.delete('http://localhost:3000/topics/delete/'+idTopico,this.config)
    .then((result)=>{
      if(result.data.success){
        this.buscarTopicos();
        this.mostrarToast('Se eliminó el tópico');
      }
    }).catch((error)=>{this.mostrarToast("No se pudo eliminar: "+ error.message)})
  }

  async confirmarBorrado(idPropiedad:number){
    const alert = await this.alertController.create({
      header:'Confirmar',message:'¿Estás seguro?',
      buttons:[
        {text:'Sí',handler:()=>{this.borrarTopico(idPropiedad)}},
        {text:'No',handler:()=>{}}
      ]
    })
    await alert.present();
  }

  ngOnInit() {
    this.buscarTopicos();
    localStorage.setItem('temaTopico',this.idTema);
  }
}