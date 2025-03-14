import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterOutlet, RouterLink } from '@angular/router';
import { ApiService } from '../../api/api.service';

@Component({
  selector: 'app-recovery',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterOutlet, RouterLink],
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.scss']
})
export class RecoveryComponent {
  recoveryForm: FormGroup;
  recoveryErrorMessages: string[] = [];
  recoveryMessages: string[] = [];

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.recoveryForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  /**
   * @description
   * Verificar si el correo electrónico ingresado está registrado y mostrar un mensaje de recuperación.
   */
  submitForm() {
    this.recoveryErrorMessages = [];
    this.recoveryMessages = [];

    if (this.recoveryForm.invalid) {
      this.recoveryErrorMessages.push('Por favor ingrese un correo electrónico válido.');
      return;
    }

    const email = this.recoveryForm.value.email;

    this.apiService.getUsuarios().subscribe({
      next: (usuarios: any[]) => {
        const usuario = usuarios.find((u: any) => u.email === email);

        if (usuario) {
          this.recoveryMessages.push(`Se enviará un correo de recuperación a ${email}`);
          this.recoveryMessages.push(`Tu contraseña es: ${usuario.password}`);
        } else {
          this.recoveryErrorMessages.push('El correo electrónico no está registrado.');
        }
      },
      error: () => {
        this.recoveryErrorMessages.push('Hubo un error al intentar recuperar los datos. Inténtelo nuevamente más tarde.');
      }
    });
  }
}
