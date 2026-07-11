import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MargeFormControlComponent } from './marge-form-control/marge-form-control.component';
import { Marge } from '../../model/marge.model';
import { debounceTime, tap } from 'rxjs';
import { ReponsesService } from '../../services/reponses.service';

@Component({
  selector: 'app-remote-page.component',
  imports: [MargeFormControlComponent, MatSliderModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './remote-page.component.html',
  styleUrl: './remote-page.component.scss',
})
export class RemotePageComponent {
  readonly MIN_YEAR = 1950;
  readonly MAX_YEAR = new Date().getFullYear();

  reponseForm: FormGroup;

  reponseSent = signal<boolean>(false);

  constructor(
    private formBuilder: FormBuilder,
    private reponseService: ReponsesService,
  ) {
    this.reponseForm = this.formBuilder.group({
      marge: [null, [Validators.required]],
      annee: [this.MIN_YEAR, [Validators.required]],
    });
    this.reponseForm
      .get('annee')
      ?.valueChanges.pipe(
        debounceTime(500),
        tap(() => {
          this.sendReponse();
        }),
      )
      .subscribe();
    this.reponseForm
      .get('marge')
      ?.valueChanges.pipe(
        tap(() => {
          this.sendReponse();
        }),
      )
      .subscribe();
  }

  modifierAnnee(increment: number) {
    const currentAnnee = this.reponseForm.get('annee')?.value;
    this.reponseForm.patchValue({ annee: currentAnnee + increment });
  }

  sendMarge(marge: Marge | null) {
    this.reponseForm.patchValue({ marge: marge });
  }

  sendReponse() {
    const marge = this.reponseForm.get('marge')?.value;
    const annee = this.reponseForm.get('annee')?.value;
    this.reponseService.sendReponse(annee, marge).subscribe();
  }

  confirmerReponse() {
    this.reponseSent.set(true);
    this.reponseService.confirmReponse().subscribe();
  }
}
