import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PartieStore {
  votesOpenSubject = new BehaviorSubject<boolean>(false);
  votesOpen$ = this.votesOpenSubject.asObservable();

  partieTermineSubject = new Subject<void>();
  partieTermine$ = this.partieTermineSubject.asObservable();

  toggleVotes(status: boolean) {
    this.votesOpenSubject.next(status);
  }

  makePartieTermine() {
    localStorage.clear();
    this.partieTermineSubject.next();
  }
}
