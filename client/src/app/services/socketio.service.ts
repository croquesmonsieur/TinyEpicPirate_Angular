import { Injectable } from '@angular/core';
import {io, Socket} from "socket.io-client";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  socket: Socket

  constructor() { }

  connect(gameId){
    this.socket = io(environment.SOCKET_ENDPOINT);
    this.socket.emit('joinGame', {gameId: gameId});
  }

  receiveJoinedPlayer(): Observable<any>{
    return new Observable((observer) => {
      this.socket.on('joinGame', (message) => {
        observer.next(message);
      });
    });
  }
}
