import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Location } from '@angular/common'
import axios from 'axios';
import { ThemePropertiesListPage } from '../theme-properties-list/theme-properties-list.page';

@Component({
  selector: 'app-theme-properties',
  templateUrl: './theme-properties.page.html',
  styleUrls: ['./theme-properties.page.scss'],
})
export class ThemePropertiesPage implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  public propiedadTema: any = '';
  titulo = 'Agregar una propiedad';
  idPropiedad = this.activatedRoute.snapshot.paramMap.get(
    'property_id'
  ) as string;

  constructor(
    private toastController: ToastController,
    private router: Router,
    private location: Location,
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

  guardarPropiedad() {
    let token = localStorage.getItem('token');
    let config = { headers: { Authorization: token } };
    console.log('id_propiedad:', this.propiedadTema.id_propiedad,
      'Descripción', this.propiedadTema.descripcion_del_tema
    );
    var data = {
      id: this.idPropiedad,
      theme_id: this.propiedadTema.theme_id,
      property_name: this.propiedadTema.property_name,
      property_value: this.propiedadTema.property_value,
    };
    axios.post('http://localhost:3000/themes_properties/update',data,config)
    .then(async(result)=>{
      if(result.data.success){
        window.location.reload();
      }else{
        this.mostrarToast(result.data.error);
      }
    })
  }

  ngOnInit(){
    let token = localStorage.getItem('token');
    let config = {headers:{Authorization: token}};

    axios.get('http://localhost:3000/themes_properties/'+this.idPropiedad,config)
    .then((result)=>{
      if(result.data.success){
        if(this.idPropiedad){
          this.titulo = 'Editar'
        }
        if(result.data.tema != null){
          this.propiedadTema = result.data.tema;
        }else{
          this.propiedadTema = '';
        }
      }else{
        console.log('No se pudo obtener el tema: ', result.data.error)
      }
    }).catch((error)=>{console.log(error.mensaje)})
  }
}
