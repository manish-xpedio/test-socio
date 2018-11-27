export interface admin_wings {
	sysid: number;
	building_name: string;
	total_floors: number;
	min_flats_per_floor: number;
	max_flats_per_floor: number;
	is_lift: string;
	is_solar: string;
	is_common_lights: string;
	is_camera: string;
	total_owner_parkings: number;
	common_parkings_allotted: number;
	closed_parking_no: number;
	opened_parking_no: number;
	water_taks: number;
	common_toilets: number;
	status: string;
	action: string;
}