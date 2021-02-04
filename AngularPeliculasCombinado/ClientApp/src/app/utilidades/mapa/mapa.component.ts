import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { latLng, Marker, marker, tileLayer } from 'leaflet';
import { Coordenada, CoordenadaConMensaje } from './coordenada';


@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  constructor() { }

  @Input()
  coordenadasIniciales : CoordenadaConMensaje[] = [];

  @Output()
  coordenadaSeleccionada:EventEmitter<Coordenada> = new EventEmitter<Coordenada>();

  @Input()
  soloLectura:boolean = false;

  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 10,
    center: latLng(38.86216695339701, -366.96533203125)
  };

  capas:Marker<any>[]=[];

  ngOnInit() {
    this.capas = this.coordenadasIniciales.map(valor => {
      let marcador = marker([valor.latitud,valor.longitud])
      if(valor.mensaje){
        marcador.bindPopup(valor.mensaje, {autoClose:false, autoPan:false})
      }
      return marcador;
    });
  }

  manejarClick(event:L.LeafletMouseEvent){
    if(!this.soloLectura){
      const latitud = event.latlng.lat;
      const longitud = event.latlng.lng;
      this.capas = [];
      this.capas.push(marker([latitud,longitud]));
      this.coordenadaSeleccionada.emit({latitud:latitud, longitud:longitud});
    }

  }

}
