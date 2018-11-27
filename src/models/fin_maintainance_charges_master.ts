export interface fin_maintainance_charges_master {
	sysid: number;
	fin_year: string;
	meeting_id: number;
	total_owner_charges: number;
	total_tenant_charges: number;
	penalty_percent: number;
	action: string;
}