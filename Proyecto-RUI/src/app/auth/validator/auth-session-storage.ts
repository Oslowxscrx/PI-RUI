import { Injectable } from '@angular/core';
import { EncryptionHttpService } from '../../../app/service/encryption/encryption-http.service';
import { CookieService } from 'ngx-cookie-service';

const COOKIE_STORAGE_TOKEN_REFRESH_KEY = 'refresh_token';
const SESSION_STORAGE_TOKEN_ACCESS_KEY = 'access_token';

@Injectable({
  providedIn: 'root',
})
export class AuthSessionStorage {
  constructor(
    private encryptionHttpService: EncryptionHttpService,
    private cookieService: CookieService
  ) {}

  setAccessToken(token: string): void {
    const encryptedToken = this.encryptionHttpService.encrypt(token);
    sessionStorage.setItem(SESSION_STORAGE_TOKEN_ACCESS_KEY, encryptedToken);
  }

  getAccessToken(): string {
    const encryptedToken = sessionStorage.getItem(SESSION_STORAGE_TOKEN_ACCESS_KEY);
    return encryptedToken ? this.decryptedToken(encryptedToken) : '';
  }

  removeAccessToken(): void {
    sessionStorage.clear();
    this.removeRefreshToken();
  }

  private removeRefreshToken(): void {
    this.cookieService.delete(COOKIE_STORAGE_TOKEN_REFRESH_KEY, '/', '', true);
  }

  private decryptedToken(encryptedToken: string): string {
    try {
      return this.encryptionHttpService.decrypt(encryptedToken);
    } catch (error) {
      console.error('Error al desencriptar el token de acceso:', error);
      return '';
    }
  }
}