import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PartieStore {
  partieTermineSubject = new Subject<void>();
  partieTermine$ = this.partieTermineSubject.asObservable();

  makePartieTermine() {
    localStorage.clear();
    this.partieTermineSubject.next();
  }
}
