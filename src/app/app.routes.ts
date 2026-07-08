import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { haveToConnectGuard, remoteGuard } from './guards/remote.guard';

export const routes: Routes = [
  { path: '', component: HomepageComponent, canActivate: [haveToConnectGuard] },
  {
    path: 'play',
    loadComponent: () =>
      import('./components/remote-page/remote-page.component').then((m) => m.RemotePageComponent),
    canActivate: [remoteGuard],
  },
];
