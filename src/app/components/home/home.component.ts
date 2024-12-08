import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api/api.service';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  data: any[] = [];
  searchTerm: string = '';
  userRole: string | null = null;

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.userRole = localStorage.getItem('userRole');
    this.llenarData();
  }

  llenarData() {
    this.apiService.getPerfumes().subscribe((data: any) => {
      this.data = data;
    });
  }

  filtrarPerfumes() {
    if (!this.searchTerm) {
      this.llenarData();
      return;
    }

    this.apiService.getPerfumes().subscribe((data: any) => {
      this.data = data.filter((perfume: any) => 
        perfume.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        perfume.marca.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        perfume.categoria.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    });
  }

  buscarProducto(id: number) {
    this.apiService.getPerfumeById(id).subscribe((data: any) => {
      this.data = [data];
    });
  }

  editarProducto(id: number) {
    this.router.navigate(['/editar-perfume', id]);
  }

  eliminarProducto(id: number) {
    this.apiService.deletePerfume(id).subscribe(() => {
      this.llenarData();
    });
  }

  confirmarEliminacion(id: number) {
    if (confirm('¿Estás seguro de eliminar este perfume?')) {
      this.eliminarProducto(id);
    }
  }

  cerrarSesion() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  
}