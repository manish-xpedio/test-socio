export interface supp_parking_bookings {
	sysid: number;
	member_id: number;
	req_id: number;
	parking_id: number;
	from_date: string;
	to_date: string;
	parking_charges: number;
	payment_status: string;
	status: string;
	action: string;
}