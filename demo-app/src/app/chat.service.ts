import { Injectable } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';

const url = 'wss://ws.postman-echo.com/raw';

export interface ChatMessage {
  author: string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private readonly subject = webSocket<ChatMessage>(url);
  readonly messages$ = this.subject.asObservable();

  sendMessage(message: string): void {
    this.subject.next({ author: 'me', message });
  }
}
