import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class TicketManagerService {
	constructor(
		private http: HttpClient,
		private router: Router
	) { }
	private toTicketObj(obj: Object) {
		obj['expire'] = new Date(obj['expire']);
		return obj as TicketObj;
	}
	getTicketById(id: number) {
		return this.http
			.get(`http://localhost/calendar/index.php?id=${id}`)
			.pipe(
				map((response: Array<Object>) => {
					try {
						return new Ticket().setObj(this.toTicketObj(response[0]));
					} catch (error) {
						console.error(`Ticket with id ${id} not found or invalid`);
						this.router.navigate(['/']);
					}
				})
			);
	}
	getAllTickets() {
		return this.http
			.get(`http://localhost/calendar/index.php`)
			.pipe(
				map((response: Array<Object>) => {
					const ticketArr: Ticket[] = [];
					response.forEach(obj => {
						ticketArr.push(new Ticket().setObj(this.toTicketObj(obj)));
					})
					return ticketArr;
				})
			);
	}
	createTicket(ticket: Ticket) {

	}
}
export type TicketObj = {id: number, title: string, description: string, expire: Date, user: string};
export class Ticket {
	id: number;
	title: string;
	description: string;
	expire: Date;
	user: string;

	get ticketObj() {
		return {
			id:				this.id,
			title:			this.title,
			description:	this.description,
			expire:			this.expire,
			user:			this.user
		} as TicketObj
	}
	get object() {
		return {
			title:			this.title,
			description:	this.description,
			expire:			this.expire.toISOString().split('T')[0]
			// user:			this.user
		}
	}
	get info() {
		return `Ticket {id: ${this.id}, title: ${this.title}, description: ${this.description}, expire: ${this.expire.toLocaleDateString()}}`
	}

	public constructor() {}

	setVal(id: number, title: string, description: string, expire: Date, user: string) {
		this.id = id;
		this.title = title;
		this.description = description;
		this.expire = expire;
		this.user = user;
		return this;
	}
	setObj(obj: TicketObj) {
		this.setVal(obj.id, obj.title, obj.description, obj.expire, obj.user);
		return this;
	}
}