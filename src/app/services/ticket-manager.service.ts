import { Injectable } from '@angular/core';
import { Ticket, fakeTickets } from '../backend/ticket'
export { Ticket } from '../backend/ticket'

@Injectable({
  providedIn: 'root'
})
export class TicketManagerService {
	private _savedTickets: Ticket[] = [];
	private _pendingTickets: Ticket[] = [];
	get readTickets() {
		return [...this._savedTickets];
	}

	private _identity = 0
	get identity() {
		return this._identity += 1;
	}

	constructor() {
		const tickets = fakeTickets();
		tickets.forEach(ticket => {
			this.addFull(ticket.title, ticket.description, ticket.expire);
		});
		this.saveChanges();
	}

	addEmpty() {
		const ticket = new Ticket(this.identity, '', '', null);
		this._pendingTickets.push(ticket);
		return ticket;
	}
	addFull(title: string, description: string, expire: Date) {
		const ticket = new Ticket(this.identity, title, description, expire);
		this._pendingTickets.push(ticket);
		return ticket;
	}

	getTicketById(id: number) {
		if (id === undefined) {
			return this.addEmpty()
		}
		return this._pendingTickets.filter(ticket => ticket.id == id)[0];
	}

	saveChanges() {
		try {
			this._savedTickets = [...this._pendingTickets];
		} catch (error) {
			console.log(error);
		}
	}
}
