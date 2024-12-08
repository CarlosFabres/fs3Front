import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:8080/productos';
  private apiUrl2 = 'http://localhost:8081/usuarios';

  constructor(private http: HttpClient) { }

  public getPerfumeById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  public updatePerfume(id: number, perfume: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, perfume);
  }

  public getPerfumes(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  public crearPerfume(producto: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, producto);
  }

  public deletePerfume(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  public getUsuarios(): Observable<any> {
    return this.http.get(this.apiUrl2);
  }

  public crearUsuario(usuario: any): Observable<any> {
    return this.http.post<any>(this.apiUrl2, usuario);
  }

  public updateUsuario(id: number, usuario: any): Observable<any> {
    return this.http.put(`${this.apiUrl2}/${id}`, usuario);
  }

  public getUsuarioById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl2}/${id}`);
  }
  
  public deleteUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl2}/${id}`);
  }

}