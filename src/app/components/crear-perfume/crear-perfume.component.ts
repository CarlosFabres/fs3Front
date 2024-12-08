import { Component } from '@angular/core';
import { ApiService } from '../../api/api.service'; // Importa tu ApiService
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';  // Importa FormsModule
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crear-perfume',
  templateUrl: './crear-perfume.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./crear-perfume.component.scss']
})

export class CrearPerfumeComponent {

  // Definir el objeto de producto sin necesidad de un modelo
  perfume: any = {
    nombre: '',
    descripcion: '',
    precio: 0,
    stock: 0,
    marca: '',
    categoria: ''
  };

  constructor(private apiService: ApiService, private router: Router) { }

  // Método para enviar el formulario
  crearPerfume(): void {
    this.apiService.crearPerfume(this.perfume).subscribe(
      (nuevoPerfume) => {
        // Si el perfume se crea correctamente, redirigir a la página de listado o detalle
        this.router.navigate(['/home']);  // O cualquier ruta que desees
      },
      (error) => {
        console.error('Error al crear el perfume', error);
      }
    );
  }
}
