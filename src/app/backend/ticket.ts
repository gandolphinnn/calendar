export class Ticket {
	constructor (
		public id: number,
		public title: string,
		public description: string,
		public expire: Date,
		public label: string
	) {	}
	get info() {
		return `Ticket {id: ${this.id}, title: ${this.title}, description: ${this.description}, expire: ${this.expire.toLocaleDateString()}, label: ${this.label}}`
	}
}

export function fakeTickets() {
	return [
		new Ticket(1, 't1', 'd1', new Date(), 'l1'),
		new Ticket(2, 't2', 'd2', new Date(), 'l2'),
		new Ticket(3, 't3', 'd3', new Date(), 'l3'),
		new Ticket(4, 't4', 'd4', new Date(), 'l4'),
		new Ticket(5, 't5', 'd5', new Date(), 'l5'),
	]
}