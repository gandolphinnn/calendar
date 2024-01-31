import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TicketManagerService, Ticket } from '../services/ticket-manager.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements AfterViewInit {
	@ViewChild('f') form: NgForm;
	activeTicket: Ticket;
	mode: 'edit' | 'add';

	constructor(
		private ticketManager: TicketManagerService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
	) {}
	
	ngAfterViewInit() {
		this.activatedRoute.url.subscribe(urlSegment => {
			this.mode = <'edit' | 'add'>urlSegment[0].path;
			if (this.mode === 'edit') {
				const id = parseInt(urlSegment[1].path);
				if (id) {
					this.ticketManager
						.getTicketById(id)
						.subscribe(ticket => {
							try {
								this.activeTicket = ticket;
								this.form.setValue(this.activeTicket.object);
							} catch (error) {} //? Error handled in the pipe
						});
				}
			}
		})
	}
	onSubmit() {
		console.log(this.form.value);
		const date = new Date(this.form.value.expire)
		date.setDate(date.getDate() + 1)
		this.form.value.expire = date.toISOString().split('T')[0]
		console.log()
		this.form.setValue(this.form.value)
		this.activeTicket.title = this.form.value.title;
		this.activeTicket.description = this.form.value.description;
		this.activeTicket.expire = this.form.value.expire;
		this.router.navigate(['/'])
		
	}
}
