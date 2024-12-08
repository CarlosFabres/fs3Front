import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterOutlet, RouterLink } from '@angular/router';
import { ApiService } from '../../api/api.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterOutlet, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  miFormulario!: FormGroup;
  formErrors: string[] = [];
  emailInUse: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private apiService: ApiService) {}

  ngOnInit(): void {
    this.miFormulario = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        this.passwordValidator
      ]]
    });
  }

  /**
   * @description
   * Validador personalizado para la contraseña.
   */
  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.value;
    const errors = [];
    const passwordMinLength = 8;
    const passwordMaxLength = 20;
    const passwordRegex = {
      lowercase: /[a-z]/,
      uppercase: /[A-Z]/,
      digit: /[0-9]/,
      specialChar: /[!@#$%^&*(),.?":{}|<>]/
    };

    if (password.length < passwordMinLength) {
      errors.push(`La contraseña debe tener al menos ${passwordMinLength} caracteres.`);
    }
    if (password.length > passwordMaxLength) {
      errors.push(`La contraseña debe tener un máximo de ${passwordMaxLength} caracteres.`);
    }
    if (!passwordRegex.lowercase.test(password)) {
      errors.push("La contraseña debe tener al menos una letra minúscula.");
    }
    if (!passwordRegex.uppercase.test(password)) {
      errors.push("La contraseña debe tener al menos una letra mayúscula.");
    }
    if (!passwordRegex.digit.test(password)) {
      errors.push("La contraseña debe tener al menos un número.");
    }
    if (!passwordRegex.specialChar.test(password)) {
      errors.push("La contraseña debe tener al menos un carácter especial (ej. !@#$%^&*).");
    }

    return errors.length > 0 ? { passwordInvalid: errors.join('\n') } : null;
  }

  /**
   * @description
   * Verifica si el correo ya está registrado antes de enviar los datos al backend.
   */
  verificarEmailAntesDeRegistrar(): void {
    const email = this.miFormulario.get('email')?.value;

    this.apiService.getUsuarios().subscribe((usuarios) => {
      this.emailInUse = usuarios.some((usuario: any) => usuario.email === email);

      if (this.emailInUse) {
        this.formErrors.push('El correo electrónico ya está registrado.');
      } else {
        this.registrarUsuario();
      }
    });
  }

  /**
   * @description
   * Enviar el usuario al backend para registrarlo.
   */
  registrarUsuario(): void {
    const usuario = {
      ...this.miFormulario.value,
      rol: 'Cliente' // Asignar rol automáticamente
    };

    this.apiService.crearUsuario(usuario).subscribe({
      next: (response) => {
        console.log('Usuario registrado:', response);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Error al registrar el usuario:', error);
        this.formErrors.push('Hubo un error al registrar el usuario. Intente nuevamente.');
      }
    });
  }

  /**
   * @description
   * Manejar el envío del formulario.
   */
  onSubmit(): void {
    this.formErrors = [];

    if (this.miFormulario.valid) {
      this.verificarEmailAntesDeRegistrar();
    } else {
      if (this.miFormulario.get('username')?.invalid) {
        this.formErrors.push('El nombre es requerido.');
      }
      const emailControl = this.miFormulario.get('email');
      if (emailControl?.invalid) {
        if (emailControl.errors?.['required']) {
          this.formErrors.push('El correo electrónico es requerido.');
        }
        if (emailControl.errors?.['email']) {
          this.formErrors.push('El correo electrónico no es válido.');
        }
      }
      if (this.miFormulario.get('password')?.errors?.['passwordInvalid']) {
        this.formErrors.push(this.miFormulario.get('password')?.errors?.['passwordInvalid']);
      }
    }
  }
}
