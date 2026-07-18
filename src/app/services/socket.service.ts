import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../environments/environment';
import { EquipesStore } from '../stores/equipes.store';
import { PartieStore } from '../stores/partie.store';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket | undefined;

  constructor(
    private equipesStore: EquipesStore,
    private partieStore: PartieStore,
  ) {
    this.socket = io(environment.socketUrl, {
      transports: ['websocket'],
      upgrade: false,
    });

    this.socket.on('nouvelle-equipe-en-jeu', (data) => {
      this.equipesStore.setEquipeEnJeu(data.equipeEnJeu);
    });

    this.socket.on('toggle-votes', (data) => {
      this.partieStore.toggleVotes(data.statusVotes);
    });

    this.socket.on('partie-termine', () => {
      this.partieStore.makePartieTermine();
    });
  }
}
