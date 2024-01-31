import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TicketManagerService {
	private tickets: Ticket[] = [];
	get readTickets() {
		return [...this.tickets];
	}

	getTicketById(id: number) {

		return this.tickets[0] //todo;
	}

	saveChanges() {
		try {
			this.tickets = [...this.tickets];
		} catch (error) {
			console.log(error);
		}
	}
}

export class Ticket {
	constructor (
		public id: number,
		public title: string,
		public description: string,
		public expire: Date
	) {	}
	get object() {
		return {
			title: this.title,
			description: this.description,
			//expire: this.expire.toISOString().split('T')[0]
			expire: null
		}
	}
	get info() {
		return `Ticket {id: ${this.id}, title: ${this.title}, description: ${this.description}, expire: ${this.expire.toLocaleDateString()}}`
	}
}