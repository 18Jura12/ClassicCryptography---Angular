import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Result } from '../result.model';

@Injectable({
  providedIn: 'root'
})
export class CaesarService {

  constructor(
    private http: HttpClient
  ) {}

  getEncripted(openText: string, shift: number, alphabet: string) {
    return this.http.get<Result>(
      'http://localhost:8080/api/caesar/cipher',
      {
        params:
          new HttpParams()
            .set('openText', openText)
            .set('shift', shift)
            .set('alphabet', alphabet)
      }
    );
  }

  getDecripted(cipher: string, shift: number, alphabet: string) {
    return this.http.get<Result>(
      'http://localhost:8080/api/caesar/decipher',
      {
        params:
          new HttpParams()
            .set('cipher', cipher)
            .set('shift', shift)
            .set('alphabet', alphabet)
      }
    );
  }

}
