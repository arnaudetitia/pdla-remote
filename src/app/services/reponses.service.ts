import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Marge } from '../model/marge.model';
import { environment } from '../../environments/environment.dev';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReponsesService {
  constructor(private http: HttpClient) {}

  sendReponse(annee: number, marge: Marge): Observable<any> {
    return this.http.put(environment.apiUrl + '/reponse', {
      annee: JSON.stringify(annee),
      marge: JSON.stringify(marge),
    });
  }

  confirmReponse(): Observable<any> {
    return this.http.put(environment.apiUrl + '/reponse/confirm', {});
  }
}
