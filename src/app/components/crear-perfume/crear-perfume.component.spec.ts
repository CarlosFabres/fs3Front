import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearPerfumeComponent } from './crear-perfume.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { ApiService } from '../../api/api.service';
import { of, throwError } from 'rxjs';

describe('CrearPerfumeComponent', () => {
  let component: CrearPerfumeComponent;
  let fixture: ComponentFixture<CrearPerfumeComponent>;
  let mockApiService: jasmine.SpyObj<ApiService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockApiService = jasmine.createSpyObj('ApiService', ['crearPerfume']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        CrearPerfumeComponent,
        HttpClientTestingModule
      ],
      providers: [
        { provide: ApiService, useValue: mockApiService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CrearPerfumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the perfume object correctly', () => {
    expect(component.perfume).toEqual({
      nombre: '',
      descripcion: '',
      precio: 0,
      stock: 0,
      marca: '',
      categoria: ''
    });
  });

  it('should call crearPerfume and navigate on success', () => {
    component.perfume = {
      nombre: 'Perfume 1',
      descripcion: 'Un perfume especial',
      precio: 100,
      stock: 10,
      marca: 'Marca X',
      categoria: 'Categoría Y'
    };

    mockApiService.crearPerfume.and.returnValue(of({ id: 1 }));

    component.crearPerfume();

    expect(mockApiService.crearPerfume).toHaveBeenCalledWith(component.perfume);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should handle errors when creating a perfume', () => {
    const errorResponse = { message: 'Error al crear el perfume' };
    mockApiService.crearPerfume.and.returnValue(throwError(() => errorResponse));

    spyOn(console, 'error'); // Espía para verificar el log de errores

    component.crearPerfume();

    expect(mockApiService.crearPerfume).toHaveBeenCalledWith(component.perfume);
    expect(console.error).toHaveBeenCalledWith('Error al crear el perfume', errorResponse);
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should not call crearPerfume if perfume data is invalid', () => {
    // Datos inválidos: campos vacíos o con valores por defecto
    component.perfume = {
      nombre: '',
      descripcion: '',
      precio: 0,
      stock: 0,
      marca: '',
      categoria: ''
    };

    component.crearPerfume();

    expect(mockApiService.crearPerfume).not.toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should not navigate if ApiService.crearPerfume throws an error', () => {
    mockApiService.crearPerfume.and.returnValue(throwError(() => new Error('Network error')));

    spyOn(console, 'error');

    component.crearPerfume();

    expect(mockApiService.crearPerfume).toHaveBeenCalledWith(component.perfume);
    expect(console.error).toHaveBeenCalledWith('Error al crear el perfume', jasmine.any(Error));
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });
});
