import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;
  const mockBaseUrl = 'http://localhost:8080/productos';
  const mockBaseUrlUsuarios = 'http://localhost:8081/usuarios';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get a product by ID', () => {
    const mockProduct = { id: 1, nombre: 'Perfume Test', precio: 100 };
    
    service.getPerfumeById(1).subscribe(product => {
      expect(product).toEqual(mockProduct);
    });

    const req = httpMock.expectOne(`${mockBaseUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProduct);
  });

  it('should update a product', () => {
    const updatedProduct = { id: 1, nombre: 'Perfume Updated', precio: 120 };

    service.updatePerfume(1, updatedProduct).subscribe(product => {
      expect(product).toEqual(updatedProduct);
    });

    const req = httpMock.expectOne(`${mockBaseUrl}/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedProduct);
    req.flush(updatedProduct);
  });

  it('should get all perfumes', () => {
    const mockProducts = [
      { id: 1, nombre: 'Perfume Test 1', precio: 100 },
      { id: 2, nombre: 'Perfume Test 2', precio: 150 }
    ];
    
    service.getPerfumes().subscribe(products => {
      expect(products.length).toBe(2);
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne(mockBaseUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should create a new perfume', () => {
    const newProduct = { nombre: 'New Perfume', precio: 90 };

    service.crearPerfume(newProduct).subscribe(product => {
      expect(product).toEqual(newProduct);
    });

    const req = httpMock.expectOne(mockBaseUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newProduct);
    req.flush(newProduct);
  });

  it('should delete a perfume', () => {
    service.deletePerfume(1).subscribe(response => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`${mockBaseUrl}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('should get all users', () => {
    const mockUsers = [
      { id: 1, nombre: 'Usuario Test 1' },
      { id: 2, nombre: 'Usuario Test 2' }
    ];

    service.getUsuarios().subscribe(users => {
      expect(users.length).toBe(2);
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne(mockBaseUrlUsuarios);
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('should create a new user', () => {
    const newUser = { nombre: 'New Usuario' };

    service.crearUsuario(newUser).subscribe(user => {
      expect(user).toEqual(newUser);
    });

    const req = httpMock.expectOne(mockBaseUrlUsuarios);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newUser);
    req.flush(newUser);
  });

  it('should update a user', () => {
    const updatedUser = { id: 1, nombre: 'Usuario Updated' };

    service.updateUsuario(1, updatedUser).subscribe(user => {
      expect(user).toEqual(updatedUser);
    });

    const req = httpMock.expectOne(`${mockBaseUrlUsuarios}/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedUser);
    req.flush(updatedUser);
  });

  it('should get a user by ID', () => {
    const mockUser = { id: 1, nombre: 'Usuario Test' };

    service.getUsuarioById(1).subscribe(user => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne(`${mockBaseUrlUsuarios}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });

  it('should delete a user', () => {
    service.deleteUsuario(1).subscribe(response => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`${mockBaseUrlUsuarios}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
