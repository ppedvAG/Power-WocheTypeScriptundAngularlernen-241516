import { Component, model } from '@angular/core';
import { ChatService } from '../../chat.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
})
export class ChatComponent {
  echo$: Observable<string>;
  message = model('');

  constructor(private chatService: ChatService) {
    this.echo$ = this.chatService.messages$.pipe(
      map((msg) => `${msg.author}: ${msg.message}`)
    );
  }

  sendMessage() {
    this.chatService.sendMessage(this.message());
    this.message.set('');
  }
}
