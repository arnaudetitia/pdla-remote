import { CanActivateFn, Router } from '@angular/router';
import { EquipeStorageKeys } from '../model/enums/equipe-storage-keys.enum';
import moment from 'moment';
import { inject } from '@angular/core';

export const remoteGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (localStorage.getItem(EquipeStorageKeys.CURRENT_EQUIPE) && !isExpired()) {
    return true;
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
