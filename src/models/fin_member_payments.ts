export interface fin_member_payments {
	sysid: number;
	member_id: number;
	demand_id: number;
	payment_date: string;
	from_date: string;
	to_date: string;
	previous_balance: number;
	demand_amount: number;
	interest_charged: number;
	total_outstanding: number;
	actual_paid: number;
	amount_carry_forward: number;
	payment_mode: number;
	cost_header: number;
	gl_no: string;
	action: string;
}