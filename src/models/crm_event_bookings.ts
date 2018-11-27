export interface crm_event_bookings {
	sysid: number;
	member_id: number;
	event_name: string;
	booking_entity: string;
	booking_reason: string;
	from_date: string;
	from_time: string;
	to_date: string;
	to_time: string;
	booking_charges: number;
	parking_req: string;
	parking_count: number;
	event_details: string;
	status: string;
	action: string;
}