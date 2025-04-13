import { useSelectedTicket } from "../hooks/store"

export default function TicketOverview() {
	const ticket = useSelectedTicket()

	return <div className="p-4"></div>
}
