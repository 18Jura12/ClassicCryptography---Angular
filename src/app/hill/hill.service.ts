import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Result } from '../result.model';
import { HillResult } from './hill-result.model';

@Injectable({
  providedIn: 'root'
})
export class HillService {

  constructor(
    private http: HttpClient
  ) { }

  getEncripted(openText: string, key: string, alphabet: string) {
    return this.http.get<Result>(
      'http://localhost:8080/api/hill/cipher',
      {
        params:
          new HttpParams()
            .set('openText', openText)
            .set('key', key)
            .set('alphabet', alphabet)
      }
    );
  }

  getDecripted(cipher: string, key: string, alphabet: string) {
    return this.http.get<Result>(
      'http://localhost:8080/api/hill/decipher',
      {
        params:
          new HttpParams()
            .set('cipher', cipher)
            .set('key', key)
            .set('alphabet', alphabet)
      }
    );
  }

  getDecriptedWithoutKey(cipher: string) {
    return this.http.get<Result[]>(
      'http://localhost:8080/api/hill/decipherNoKey',
      {
        params:
          new HttpParams()
            .set('cipher', cipher)
      }
    );

  }

}
