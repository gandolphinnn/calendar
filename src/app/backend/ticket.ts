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

export function fakeTickets() {
	return [
		{title: 't1', description: 'd1', expire: new Date()},
		{title: 't2', description: 'd2', expire: new Date()},
		{title: 't3', description: 'd3', expire: new Date()},
		{title: 't4', description: 'd4', expire: new Date()},
		{title: 't5', description: 'd5', expire: new Date()},
	]
}