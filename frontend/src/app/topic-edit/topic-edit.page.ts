import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-topic-edit',
  templateUrl: './topic-edit.page.html',
  styleUrls: ['./topic-edit.page.scss'],
})
export class TopicEditPage implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  public topico: any = '';
  titulo = 'Agregar un topico';
  idTopico = this.activatedRoute.snapshot.paramMap.get('topic_id') as string;

  constructor(
    private toastController: ToastController,
    private router: Router
  ) {}

  async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'middle',
    });
    await toast.present();
  }

  verificarToken(): void {
    let token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }
  }

  txtBotonRetroceso() {
    return 'Inicio';
  }

  guardarTopico() {
    let token = localStorage.getItem('token');
    let config = { headers: { Authorization: token } };
    console.log(
      'id_topico:', this.topico.id_topico,
      'nombre:', this.topico.nombre_topico
    );
    var data = {
      id: this.idTopico,
      name: this.topico.name,
      order: this.topico.order,
      priority: this.topico.priority,
      color: this.topico.color,
      deleted: this.topico.deleted,
      themes_id: localStorage.getItem('temaTopico'),
    };
    axios.post('http://localhost:3000/topics/update',data,config)
    .then(async(result)=>{
      if(result.data.success){
        this.router.navigate(['topic-list',localStorage.getItem('temaTopico')])
        .then(()=>{window.location.reload()});
      }else{
        this.mostrarToast(result.data.error)
      }
    })
  }

  ngOnInit() {
    let token = localStorage.getItem('token');
    let config = {headers:{Authorization: token}};

    axios.get('http://localhost:3000/topics/'+this.idTopico,config)
    .then((result)=>{
      if(result.data.success){
        if(this.idTopico){
          this.titulo = 'Editar'
        }
        if(result.data.topico!=null){
          this.topico = result.data.topico;
        }else{
          this.topico = '';
        }
      }else{
        console.log('No se pudo obtener el tópico', result.data.error)
      }
    }).catch((error)=>{console.log(error.mensaje)})
  }
}
