import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../api/api.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  miFormulario: FormGroup;
  formErrors: string[] = [];

  constructor(private fb: FormBuilder, private router: Router, private apiService: ApiService) {
    this.miFormulario = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  /**
   * @description
   * Método para iniciar sesión en la aplicación.
   **/
  submitForm() {
    this.formErrors = [];

    if (this.miFormulario.invalid) {
      return;
    }

    const email = this.miFormulario.value.email;
    const password = this.miFormulario.value.password;

    // Obtener usuarios desde el backend
    this.apiService.getUsuarios().subscribe(
      (usuarios: any[]) => {
        // Buscar si existe un usuario con el email y contraseña proporcionados
        const usuario = usuarios.find(u => u.email === email && u.password === password);

        if (usuario) {
          // Guardar el rol del usuario en Local Storage
          localStorage.setItem('userRole', usuario.rol);
          //Guardar el id del usuario en Local Storage
          localStorage.setItem('userId', usuario.id);
          
          // Redirigir al home
          this.router.navigate(['/home']);
        } else {
          this.formErrors.push('Correo electrónico o contraseña incorrectos.');
        }
      },
      (error) => {
        this.formErrors.push('Hubo un problema al conectarse al servidor. Inténtelo más tarde.');
      }
    );
  }
}
