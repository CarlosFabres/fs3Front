import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../api/api.service';

@Component({
  selector: 'app-perfil',
  standalone: true, // Confirma que es un componente standalone
  imports: [CommonModule, FormsModule], // Incluye FormsModule aquí
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})

export class PerfilComponent implements OnInit {
  usuario: any = {};
  nuevoUsername: string = '';
  usuarios: any[] = []; // Lista de usuarios

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.cargarDatosUsuario();
    this.cargarUsuarios();
  }

  cargarDatosUsuario(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.apiService.getUsuarioById(Number(userId)).subscribe(
        (data) => {
          this.usuario = data;
          this.nuevoUsername = this.usuario.username; // Inicializa el campo de edición
        },
        (error) => {
          console.error('Error al cargar los datos del usuario:', error);
        }
      );
    } else {
      console.error('No se encontró el ID de usuario en localStorage');
    }
  }

  
  

  actualizarUsername(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      const usuarioActualizado = { ...this.usuario, username: this.nuevoUsername };

      this.apiService.updateUsuario(Number(userId), usuarioActualizado).subscribe(
        (data) => {
          this.usuario = data;
          alert('Username actualizado correctamente');
        },
        (error) => {
          console.error('Error al actualizar el usuario:', error);
        }
      );
    }
  }

  cerrarSesion(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  cargarUsuarios(): void {
    this.apiService.getUsuarios().subscribe(
      (data) => {
        this.usuarios = data;
      },
      (error) => {
        console.error('Error al cargar los usuarios:', error);
      }
    );
  }

  eliminarUsuario(id: number): void {
    this.apiService.deleteUsuario(id).subscribe(
      () => {
        this.cargarUsuarios();
      },
      (error) => {
        console.error('Error al eliminar el usuario:', error);
      }
    );
  }

  confirmarEliminacion(id: number): void {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      this.eliminarUsuario(id);
    }
  }
}
