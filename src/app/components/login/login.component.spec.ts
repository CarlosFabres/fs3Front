import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, // Importa HttpClientTestingModule para poder mockear HttpClient
        LoginComponent
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '123' })  
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController); // Inyecta el mock de HttpClient
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle server connection error', () => {
    // Simula un error en la conexión al servidor
    component.submitForm();

    const req = httpMock.expectOne('/api/usuarios');
    req.error(new ErrorEvent('Network error'));

    expect(component.formErrors.length).toBe(1);
    expect(component.formErrors[0]).toBe('Hubo un problema al conectarse al servidor. Inténtelo más tarde.');
  });

  it('should not submit form if invalid', () => {
    component.miFormulario.setValue({ email: '', password: '' });
    component.submitForm();

    // No debe realizar una solicitud HTTP
    const reqs = httpMock.match('/api/usuarios');
    expect(reqs.length).toBe(0);
  });

  it('should store user role and id in local storage and redirect when valid user', () => {
    const mockUser = { id: '123', email: 'test@example.com', password: 'password', rol: 'user' };
    component.miFormulario.setValue({ email: mockUser.email, password: mockUser.password });

    component.submitForm();

    const req = httpMock.expectOne('/api/usuarios');
    req.flush([mockUser]);

    expect(localStorage.getItem('userRole')).toBe(mockUser.rol);
    expect(localStorage.getItem('userId')).toBe(mockUser.id);
    expect(component.formErrors.length).toBe(0); // No debe haber errores
  });

  it('should set form error for invalid login attempt', () => {
    const mockUsers = [{ email: 'other@example.com', password: 'password', rol: 'user' }];
    component.miFormulario.setValue({ email: 'test@example.com', password: 'password' });

    component.submitForm();

    const req = httpMock.expectOne('/api/usuarios');
    req.flush(mockUsers); // Respuesta sin coincidencias

    expect(component.formErrors.length).toBe(1);
    expect(component.formErrors[0]).toBe('Correo electrónico o contraseña incorrectos.');
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no hayan solicitudes no interceptadas
  });
});
