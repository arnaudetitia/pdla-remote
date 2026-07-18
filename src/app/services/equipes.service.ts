import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Equipe } from '../model/equipe.model';

@Injectable({
  providedIn: 'root',
})
export class EquipesService {
  constructor(private http: HttpClient) {}

  getEquipes(): Observable<Equipe[]> {
    return this.http.get<Equipe[]>(environment.apiUrl + '/equipes');
  }

  connectEquipe(nomEquipe: string): Observable<any> {
    return this.http.put(environment.apiUrl + '/equipes/connect', {
      equipe: JSON.stringify(nomEquipe),
    });
  }

  getEquipeEnJeu(): Observable<string> {
    return this.http.get<string>(environment.apiUrl + '/equipes/en-jeu');
  }
}
