import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class AssetsService {
  private apiUrl = environment.API_URL + 'assets';

  constructor(private http: HttpClient) { }

  getAllAssets(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getAssetById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createAsset(assetData: any): Observable<any> {
    return this.http.post(this.apiUrl, assetData);
  }

  updateAsset(id: number, assetData: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, assetData);
  }

  deleteAsset(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
