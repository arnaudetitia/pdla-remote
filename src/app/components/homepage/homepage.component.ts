import { Component, OnInit, signal } from '@angular/core';
import { EquipesService } from '../../services/equipes.service';
import { catchError, of, tap } from 'rxjs';
import { Equipe } from '../../model/equipe.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EquipeStorageKeys } from '../../model/enums/equipe-storage-keys.enum';
import moment from 'moment';

@Component({
  selector: 'app-homepage.component',
  imports: [CommonModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent implements OnInit {
  equipes = signal<Equipe[]>([]);

  constructor(
    private equipeService: EquipesService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.equipeService
      .getEquipes()
      .pipe(
        tap((equipes) => {
          this.equipes.set(equipes);
        }),
      )
      .subscribe();
  }

  goToRemote(equipe: Equipe) {
    if (!equipe.connected) {
      this.equipeService
        .connectEquipe(equipe.nomEquipe)
        .pipe(
          tap(() => {
            localStorage.setItem(EquipeStorageKeys.CURRENT_EQUIPE, equipe.nomEquipe);
            const dateValidity = moment().add(1, 'days').startOf('day');
            localStorage.setItem(
              EquipeStorageKeys.DATE_VALIDITE,
              dateValidity.format('YYYY-MM-DD HH:mm:SS'),
            );
            this.router.navigate(['/play']);
          }),
          catchError((error) => {
            console.log(error);
            return of();
          }),
        )
        .subscribe();
    }
  }
}
