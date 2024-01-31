import { Component, ElementRef, Input, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TicketManagerService, Ticket, TicketObj } from '../services/ticket-manager.service';
import { arrPivot, coalesce, isNull } from '@gandolphinnn/utils'
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements AfterViewInit {
	@ViewChild('f') form: NgForm;
	activeTicket = new Ticket();

	constructor(
		private ticketManagerService: TicketManagerService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private http: HttpClient
	) {}
	
	ngAfterViewInit() {
		
		this.activatedRoute.params.subscribe(
			(params: Params) => {
				this.ticketManagerService.setTicketById(this.activeTicket, params['id']);
			}
		)
		/*console.log(this.form.value);
		console.log(this.activeTicket);
		//this.form.setValue(this.activeTicket.object); //todo not working
		console.log(this.form.value); */
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
