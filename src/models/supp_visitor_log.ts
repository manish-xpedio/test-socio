export interface supp_visitor_log {
	sysid: number;
	request_id: number;
	member_id: number;
	in_datetime: string;
	out_datetime: string;
	person_count: number;
	vehicle_type: string;
	vehicle_no: string;
	status: string;
	action: string;
}