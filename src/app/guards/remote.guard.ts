import { CanActivateFn, Router } from '@angular/router';
import { EquipeStorageKeys } from '../model/enums/equipe-storage-keys.enum';
import moment from 'moment';
import { inject } from '@angular/core';
import { EquipesService } from '../services/equipes.service';
import { map, tap } from 'rxjs';

export const remoteGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const equipeService = inject(EquipesService);

  const equipeConnected = localStorage.getItem(EquipeStorageKeys.CURRENT_EQUIPE);
  if (equipeConnected && !isExpired()) {
    return equipeService.getEquipes().pipe(
      map((equipes) => equipes.map((equipe) => equipe.nomEquipe)),
      map((nomsEquipes) => {
        if (nomsEquipes.includes(equipeConnected)) {
          return true;
        } else {
          localStorage.clear();
          return router.parseUrl('/');
        }
      }),
    );
  }
  return router.parseUrl('/');
};

export const haveToConnectGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (!localStorage.getItem(EquipeStorageKeys.CURRENT_EQUIPE) || isExpired()) {
    return true;
  } else {
    return router.parseUrl('/play');
  }
};

const isExpired: () => boolean = () => {
  const dateExpirationString = localStorage.getItem(EquipeStorageKeys.DATE_VALIDITE);

  if (!dateExpirationString) {
    localStorage.clear();
    return true;
  }

  const dateExpiration = moment(dateExpirationString);
  const dateCourante = moment();

  if (dateCourante.isAfter(dateExpiration)) {
    localStorage.clear();
    return true;
  }

  return false;
};
