import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/enviroments/enviroment';
import { Observable } from 'rxjs';
import { Assets } from '../interface/assets/assets';

@Injectable({
  providedIn: 'root'
})
export class AssetsService {
  private API_URL = environment.API_URL + 'assets';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) { }

  getAssets(): Observable<Assets[]> {
    return this.http.get<Assets[]>(this.API_URL,
    this.httpOptions);
  }

  saveAsset(asset: any): Observable<any> {
    return this.http.post('URL_DE_TU_API', asset);
  }

  public getAssetById(id: number): Observable<Assets> {
    return this.http.get<Assets>(`${this.API_URL}/${id}`);
  }

  createAsset(asset: Assets): Observable<Assets> {
    return this.http.post<Assets>(this.API_URL,
      asset,
      this.httpOptions)
  }

  public updateAsset(asset: Assets): Observable<Assets> {
    return this.http.patch<Assets>(
      `${this.API_URL}/${asset.id}`,
      asset,
      this.httpOptions
    );
  }

  public deleteAssetById(assetId: number): Observable<Assets> {
    return this.http.delete<Assets>(
      `${this.API_URL}/${assetId}`,
      this.httpOptions
    );
  }
}
