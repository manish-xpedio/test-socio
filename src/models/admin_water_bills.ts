export interface admin_water_bills {
	sysid: number;
	bill_no: string;
	biller_id: number;
	meter_id: number;
	bill_date: string;
	bill_from_period: string;
	bill_to_period: string;
	bill_payment_date: string;
	total_usage: number;
	bill_amount: number;
	amount_adjusted: number;
	penalty_applied: number;
	amount_paid: number;
	penalty_paid: number;
	bill_reason: string;
	remarks: string;
	status: string;
	action: string;
}