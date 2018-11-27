export interface fin_member_pay_demand {
	sysid: number;
	member_id: number;
	from_date: string;
	to_date: string;
	previous_balance: number;
	demand_amount: number;
	interest_amount: number;
	total_outstanding: number;
	cost_head: number;
	reason_text: string;
	pay_by_date: string;
	action: string;
}