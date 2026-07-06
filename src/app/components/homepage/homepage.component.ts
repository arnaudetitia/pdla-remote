import { Component, OnInit, signal } from '@angular/core';
import { EquipesService } from '../../services/equipes.service';
import { tap } from 'rxjs';
import { Equipe } from '../../model/equipe.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-homepage.component',
  imports: [CommonModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent implements OnInit {
  equipes = signal<Equipe[]>([]);

  constructor(private equipeService: EquipesService) {}

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
}
