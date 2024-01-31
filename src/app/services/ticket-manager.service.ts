import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketManagerService {
	constructor(
		private http: HttpClient
	) { }
	setTicketById(ticket: Ticket, id: number) {
		this.http
			.get(`http://localhost/calendar/index.php?id=${id}`)
			.subscribe(
				reply => {
					const obj = reply[0];
					obj['expire'] = new Date(obj['expire'])
					ticket.setObj(obj as TicketObj);
				}
			)
	}
	getAllTickets() {
		this.http
			.get(`http://localhost/calendar/index.php`)
			.subscribe(
				(tickets: Array<object>) => {
					tickets.forEach(ticket => {
						console.log(ticket);
						
					});
				}
			)
	}
}
export type TicketObj = {id: number, title: string, description: string, expire: Date, label: string, user: string};
export class Ticket {
	id: number;
	title: string;
	description: string;
	expire: Date;
	label: string;
	user: string;

	public constructor() {}

	setVal(id: number, title: string, description: string, expire: Date, label: string, user: string) {
		this.id = id;
		this.title = title;
		this.description = description;
		this.expire = expire;
		this.label = label;
		this.user = user;
	}
	setObj(obj: TicketObj) {
		this.setVal(obj.id, obj.title, obj.description, obj.expire, obj.label, obj.user);
	}

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