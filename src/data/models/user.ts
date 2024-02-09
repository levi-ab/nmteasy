export default interface IUser {
    id: string
	first_name: string
	last_name: string
	username: string
	email: string
	league: ILeague
	points: number
}

export interface ILeague {
	id: string
	title: string
	points: string
}