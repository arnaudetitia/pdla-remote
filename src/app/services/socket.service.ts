import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../environments/environment.dev';
import { EquipesStore } from '../stores/equipes.store';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket | undefined;

  constructor(private equipesStore: EquipesStore) {
    this.socket = io(environment.socketUrl, {
      transports: ['websocket'],
      upgrade: false,
    });

    this.socket.on('nouvelle-equipe-en-jeu', (data) => {
      this.equipesStore.setEquipeEnJeu(data.equipeEnJeu);
    });
  }
}
