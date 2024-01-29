import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
	@Output('customEvent') event = new EventEmitter<number>();

	onClick() {
		this.event.emit(5);
	}
}
