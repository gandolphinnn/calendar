import { AfterViewInit, Component } from '@angular/core';
import { TicketManagerService, Ticket } from '../services/ticket-manager.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements AfterViewInit {
	tickets: Ticket[] = []
	constructor(private ticketManager: TicketManagerService) {}

	ngAfterViewInit() {
		this.ticketManager
			.getAllTickets()
			.subscribe((result: Ticket[]) => {
				this.tickets = result;
			});		
	}
}
