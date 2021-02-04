import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material';
import { actorDTO } from '../actor';
import { ActoresService } from '../actores.service';

@Component({
  selector: 'app-indice-actores',
  templateUrl: './indice-actores.component.html',
  styleUrls: ['./indice-actores.component.css']
})
export class IndiceActoresComponent implements OnInit {

  constructor(private actoresService:ActoresService) { }

  actores: actorDTO[];
  columnasAMostrar = ['id', 'nombre', 'acciones'];
  cantidadTotalRegistros;
  paginaActual = 1;
  cantidadRegistrosAMostrar = 10;

  ngOnInit() {
      this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar);
  }

  cargarRegistros(pagina:number, cantidadRegistrosAMostrar){
    this.actoresService.obtenerTodos(pagina, cantidadRegistrosAMostrar)
    .subscribe((respuesta:HttpResponse<actorDTO[]>) => {
      this.actores = respuesta.body;
      this.cantidadTotalRegistros = respuesta.headers.get("cantidadTotalRegistros");
    }, error => console.error(error));
  }

  actualizarPaginacion(datos:PageEvent){
    this.paginaActual = datos.pageIndex + 1;
    this.cantidadRegistrosAMostrar = datos.pageSize;
    this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar);
  }

  borrar(id:number){
      this.actoresService.borrar(id)
      .subscribe(()=> {
        this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar);
      },error => console.error(error));
  }

}

