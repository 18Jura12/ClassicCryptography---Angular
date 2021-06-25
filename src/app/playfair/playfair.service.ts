import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlayfairResult } from './playfair-result.model';

@Injectable({
  providedIn: 'root'
})
export class PlayfairService {

  constructor(
    private http: HttpClient
  ) {}

  getEncripted(openText: string, key: number, language: string) {
    return this.http.get<PlayfairResult>(
      'http://localhost:8080/api/playfair/cipher',
      {
        params:
          new HttpParams()
            .set('openText', openText)
            .set('key', key)
            .set('language', language)
      }
    );
  }

  getDecripted(cipher: string, key: number, language: string) {
    return this.http.get<PlayfairResult>(
      'http://localhost:8080/api/playfair/decipher',
      {
        params:
          new HttpParams()
            .set('cipher', cipher)
            .set('key', key)
            .set('language', language)
      }
    );
  }

}
