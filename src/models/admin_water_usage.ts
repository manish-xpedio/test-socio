export interface admin_water_usage {
	sysid: number;
	conn_id: number;
	usage_date: string;
	allowed_quota: number;
	actual_usage: number;
	action: string;
}