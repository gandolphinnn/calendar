import { Component, ElementRef, Input, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TicketManagerService, Ticket } from '../services/ticket-manager.service';
import { arrPivot, coalesce, isNull } from '@gandolphinnn/utils'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements AfterViewInit {
	ticketRef: Ticket;
	@ViewChild('f') form: NgForm;

	constructor(
		private ticketManagerService: TicketManagerService,
		private router: Router,
		private activatedRoute: ActivatedRoute
	) {}
	
	ngAfterViewInit() {
		this.activatedRoute.params.subscribe(
			(params: Params) => {
				this.ticketRef = this.ticketManagerService.getTicketById(params['id']);
			}
		)
		console.log(this.form.value);
		console.log(this.ticketRef.object);
		this.form.setValue(this.ticketRef.object); //todo not working
		console.log(this.form.value);
	}
	onSubmit() {
		console.log(this.form.value);
		const date = new Date(this.form.value.expire)
		date.setDate(date.getDate() + 1)
		this.form.value.expire = date.toISOString().split('T')[0]
		console.log()
		this.form.setValue(this.form.value)
		/*this.ticketRef.title = this.form.value.title;
		this.ticketRef.description = this.form.value.description;
		this.ticketRef.expire = this.form.value.expire;
		this.router.navigate(['/'])
		*/
	}
}
