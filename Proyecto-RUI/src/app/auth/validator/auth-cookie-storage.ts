import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { EncryptionHttpService } from '../../../app/service/encryption/encryption-http.service';

const COOKIE_STORAGE_TOKEN_REFRESH_KEY = 'refresh_token';
const SESSION_STORAGE_TOKEN_ACCESS_KEY = 'access_token';

@Injectable({
  providedIn: 'root',
})
export class AuthCookieStorage {
  constructor(
    private cookieService: CookieService,
    private encryptionHttpService: EncryptionHttpService
  ) {}

  setRefreshToken(token: string): void {
    const encryptedToken = this.encryptionHttpService.encrypt(token);
    this.cookieService.set(
      COOKIE_STORAGE_TOKEN_REFRESH_KEY,
      encryptedToken,
      { expires: 1, path: '/' } // Utiliza la opción 'expires' para configurar la expiración
    );
  }

  getRefreshToken(): string {
    const encryptedToken = this.cookieService.get(
      COOKIE_STORAGE_TOKEN_REFRESH_KEY
    );
    return encryptedToken ? this.encryptionHttpService.decrypt(encryptedToken) : '';
  }

  removeRefreshTokenIfNoAccessToken(): void {
    const accessTokenExists = sessionStorage.getItem(SESSION_STORAGE_TOKEN_ACCESS_KEY) !== null;

    if (!accessTokenExists) {
      this.cookieService.delete(COOKIE_STORAGE_TOKEN_REFRESH_KEY, '/');
    }
  }
}