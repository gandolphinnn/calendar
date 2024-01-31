import { Component, EventEmitter, Output } from '@angular/core';
import { TicketManagerService } from '../services/ticket-manager.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
	tickets = this.ticketManager.getAllTickets() ;
	constructor(private ticketManager: TicketManagerService) {}
}
