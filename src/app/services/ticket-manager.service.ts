import { Injectable } from '@angular/core';
import { Ticket, fakeTickets } from '../backend/ticket'

@Injectable({
  providedIn: 'root'
})
export class TicketManagerService {
	private _tickets: Ticket[] = fakeTickets();
	get tickets() { return this._tickets }

	constructor() { }
}
