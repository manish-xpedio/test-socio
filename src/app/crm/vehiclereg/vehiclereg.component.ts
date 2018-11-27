import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-vehiclereg',
	templateUrl: './vehiclereg.component.html',
	styleUrls: ['./vehiclereg.component.css']
})

export class VehicleregComponent implements OnInit {
	@Output() parent_flag = new EventEmitter();


	crm_vehicles_status: string = '';
	crm_membersList: any = [];
	crm_vehicles: any = {};
	crm_vehiclesList: any = [];
	bc_id: any = false;
	req_text: string;

	constructor( private ds: DataService, private route: ActivatedRoute, private router: Router ){
	}

	ngOnInit() {
		this.parent_flag.emit(
			{
				comp_name: 'vehiclereg',
				hide_side_menu: false,
				hide_login_btn: true,
				hide_logout_btn: false,
				content_name: 'main-content'
			}
		);
		this.route.queryParams
			.subscribe(params => {
			this.crm_vehicles['sysid'] = params.id;
		});
		this.ref_select();
		this.select_crm_vehicles();


	}

	sticker_request(){
		if (+this.crm_vehicles['sysid']>0){
			this.req_text = 'Dear member,<br>Your request for vehicle sticker has been submitted successfully.<br><br>Your request id is <b>63277';
		}
		else {
			this.req_text = 'Please select your vehicle to request sticker'; 
		}
	}

	ref_select(){
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: {action: 'REF_SELECT'},
				proc: 'crm_vehiclesOps'
			}
		})
		.subscribe(res => {
			this.crm_membersList = res['data'][0];
		});
	}

	select_crm_vehicles(){
		this.crm_vehicles['action']='SELECT_CRM_VEHICLES';
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.crm_vehicles,
				proc: 'crm_vehiclesOps'
			}
		})
		.subscribe(res => {
			this.crm_vehiclesList = res['data'][0];
			if (+this.crm_vehicles['sysid'] > 0){
				this.crm_vehicles = this.crm_vehiclesList[0];
			}
			else
				this.crm_vehicles = {};
		});
	}

	save_crm_vehicles(frm){
		if (!frm.form.valid){
			this.crm_vehicles_status = 'Fields indicated by * are mandatory.';
			return;
		}
		this.crm_vehicles['action']='SAVE_CRM_VEHICLES';

		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.crm_vehicles,
				proc: 'crm_vehiclesOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.crm_vehicles_status = res['data'][0][0].msg;
				this.crm_vehicles = {};
				this.select_crm_vehicles();
			}
			else
				this.crm_vehicles_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	delete_crm_vehicles(sysid){
		this.crm_vehicles['action']='DELETE_CRM_VEHICLES';
		this.crm_vehicles['sysid']=sysid;
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.crm_vehicles,
				proc: 'crm_vehiclesOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.crm_vehicles_status = res['data'][0][0].msg;
				this.crm_vehicles = {};
				this.select_crm_vehicles();
			}
			else
				this.crm_vehicles_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	current_record_crm_vehicles(rec){
		this.crm_vehicles = rec;
		this.bc_id = true;
				console.log(this.bc_id);
		this.crm_vehicles_status = '';
	}

	clear_crm_vehicles(){
		this.crm_vehicles = {};
		this.crm_vehicles_status = '';
	}

}