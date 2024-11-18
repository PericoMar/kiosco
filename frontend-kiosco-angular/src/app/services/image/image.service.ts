import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig } from '../../../config/app-config';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) {}

  /**
   * Subir una imagen y asociarla a un registro.
   *
   * @param tableName Nombre de la tabla (articulos, familias, etc.)
   * @param recordId ID del registro al que se asociará la imagen
   * @param columnName Nombre de la columna en la que se guardará la imagen
   * @param file Archivo de imagen
   * @returns Observable con la respuesta del servidor
   */
  uploadImage(tableName: string, recordId: number, columnName: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', file);
  
    return this.http.post(`${AppConfig.API_URL}/upload-image/${tableName}/${recordId}/${columnName}`, formData);
  }
  
}
