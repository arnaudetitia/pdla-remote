import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EquipesStore {
  equipeEnJeuSource = new BehaviorSubject<string>('');
  equipeEnJeu$ = this.equipeEnJeuSource.asObservable();

  setEquipeEnJeu(nomEquipe: string) {
    this.equipeEnJeuSource.next(nomEquipe);
  }
}
