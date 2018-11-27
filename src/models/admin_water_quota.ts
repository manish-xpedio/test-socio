export interface admin_water_quota {
	sysid: number;
	conn_id: number;
	allowed_quota: number;
	threshold_level: number;
	notification_id: number;
	status: string;
	action: string;
}