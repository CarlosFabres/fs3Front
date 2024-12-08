import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../api/api.service'; // Importa tu ApiService
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Importa FormsModule

@Component({
  selector: 'app-editar-perfume',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-perfume.component.html',
  styleUrls: ['./editar-perfume.component.scss']
})
export class EditarPerfumeComponent implements OnInit {
  perfume: any = {};  // Creamos una propiedad para almacenar los datos del perfume
  id: number | null = null;  // Variable para almacenar el id

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,  // Para obtener el id desde la URL
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtener el id de la URL
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));  // Convierte el id a número
      if (this.id) {
        this.getPerfume();  // Llama al método para obtener los detalles del perfume
      }
    });
  }

  // Método para obtener los detalles del perfume desde la API
  getPerfume() {
    this.apiService.getPerfumeById(this.id!).subscribe((data: any) => {
      this.perfume = data;  // Asignamos los datos al objeto perfume
    });
  }

  // Método para actualizar el perfume
  actualizarPerfume() {
    this.apiService.updatePerfume(this.id!, this.perfume).subscribe((data: any) => {
      console.log('Producto actualizado:', data);
      this.router.navigate(['/home']);  // Redirige al home después de la actualización
    });
  }
}
