import {Component, OnInit} from '@angular/core';
import {SocketioService} from "../../services/socketio.service";
import {ActivatedRoute} from "@angular/router";
import {logger} from "codelyzer/util/logger";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  private socket: any;
  gameId: string;

  constructor(private socketIoService: SocketioService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.gameId = this.route.snapshot.paramMap.get('id');
    this.socketIoService.connect(this.gameId);
    this.receiveJoinedPlayer();
  }

  public endGame() {

  }

  receiveJoinedPlayer() {
    this.socketIoService.receiveJoinedPlayer().subscribe((message) => {
      console.log(message);
    });
  }

  public move(direction: string) {
    this.socket.emit("move", direction);
  }
}
