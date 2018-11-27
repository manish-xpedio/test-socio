import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-bussentity',
	templateUrl: './bussentity.component.html',
	styleUrls: ['./bussentity.component.css']
})

export class BussentityComponent implements OnInit {
	@Output() parent_flag = new EventEmitter();


	admin_business_entity_master_status: string = '';
	admin_business_entity_master: any = {};
	admin_business_entity_masterList: any = [];
	admin_rolesList: any = [];
	admin_business_entity_details: any = {};
	admin_business_entity_detailsList: any = [];
	admin_business_entity_details_status: string = '';
	selected_entity: string = '';
	selected_entity_id: number = -1;

	constructor( private ds: DataService, private route: ActivatedRoute, private router: Router ){
	}

	ngOnInit() {
		this.parent_flag.emit(
			{
				comp_name: 'bussentity',
				hide_side_menu: false,
				hide_login_btn: true,
				hide_logout_btn: false,
				content_name: 'main-content'
			}
		);
		this.route.queryParams
			.subscribe(params => {
			this.admin_business_entity_master['sysid'] = params.id;
		});
		this.ref_select();
		this.select_admin_business_entity_master();
	}
	
	ref_select(){
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: {action: 'REF_SELECT'},
				proc: 'admin_business_entity_detailsOps'
			}
		})
		.subscribe(res => {
			this.admin_business_entity_masterList = res['data'][0];
			this.admin_rolesList = res['data'][1];
		});
	}
	
	select_admin_business_entity_master(){
		this.admin_business_entity_master['action']='SELECT_ADMIN_BUSINESS_ENTITY_MASTER';
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.admin_business_entity_master,
				proc: 'admin_business_entity_masterOps'
			}
		})
		.subscribe(res => {
			this.admin_business_entity_masterList = res['data'][0];
			if (+this.admin_business_entity_master['sysid'] > 0){
				this.admin_business_entity_master = this.admin_business_entity_masterList[0];
			}
			else
				this.admin_business_entity_master = {};
		});
	}

	save_admin_business_entity_master(frm){
		if (!frm.form.valid){
			this.admin_business_entity_master_status = 'Fields indicated by * are mandatory.';
			return;
		}
		this.admin_business_entity_master['action']='SAVE_ADMIN_BUSINESS_ENTITY_MASTER';

		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.admin_business_entity_master,
				proc: 'admin_business_entity_masterOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.admin_business_entity_master_status = res['data'][0][0].msg;
				this.admin_business_entity_master = {};
				this.select_admin_business_entity_master();
			}
			else
				this.admin_business_entity_master_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	delete_admin_business_entity_master(sysid){
		this.admin_business_entity_master['action']='DELETE_ADMIN_BUSINESS_ENTITY_MASTER';
		this.admin_business_entity_master['sysid']=sysid;
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.admin_business_entity_master,
				proc: 'admin_business_entity_masterOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.admin_business_entity_master_status = res['data'][0][0].msg;
				this.admin_business_entity_master = {};
				this.select_admin_business_entity_master();
			}
			else
				this.admin_business_entity_master_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	current_record_admin_business_entity_master(rec){
		this.admin_business_entity_master = rec;
		this.admin_business_entity_master_status = '';
		
	}

	clear_admin_business_entity_master(){
		this.admin_business_entity_master = {};
		this.admin_business_entity_master_status = '';
	}
	
	select_child_recs(rec){
		this.selected_entity = rec.entity_name;
		this.selected_entity_id = rec.sysid;
		this.admin_business_entity_details['entity_id']=rec.sysid;
		this.select_admin_business_entity_details();
	}

	select_admin_business_entity_details(){
		if (this.selected_entity != undefined)
			this.admin_business_entity_details['entity_id'] = this.selected_entity_id;
		this.admin_business_entity_details['action']='SELECT_ADMIN_BUSINESS_ENTITY_DETAILS';
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.admin_business_entity_details,
				proc: 'admin_business_entity_detailsOps'
			}
		})
		.subscribe(res => {
			this.admin_business_entity_detailsList = res['data'][0];
			if (+this.admin_business_entity_details['sysid'] > 0){
				this.admin_business_entity_details = this.admin_business_entity_detailsList[0];
			}
			else
				this.admin_business_entity_details = {};
		});
	}

	save_admin_business_entity_details(frm){
		if (!frm.form.valid){
			this.admin_business_entity_details_status = 'Fields indicated by * are mandatory.';
			return;
		}
		this.admin_business_entity_details['action']='SAVE_ADMIN_BUSINESS_ENTITY_DETAILS';

		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.admin_business_entity_details,
				proc: 'admin_business_entity_detailsOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.admin_business_entity_details_status = res['data'][0][0].msg;
				this.admin_business_entity_details = {};
				this.select_admin_business_entity_details();
			}
			else
				this.admin_business_entity_details_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	delete_admin_business_entity_details(sysid){
		this.admin_business_entity_details['action']='DELETE_ADMIN_BUSINESS_ENTITY_DETAILS';
		this.admin_business_entity_details['sysid']=sysid;
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.admin_business_entity_details,
				proc: 'admin_business_entity_detailsOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.admin_business_entity_details_status = res['data'][0][0].msg;
				this.admin_business_entity_details = {};
				this.select_admin_business_entity_details();
			}
			else
				this.admin_business_entity_details_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	current_record_admin_business_entity_details(rec){
		this.admin_business_entity_details = rec;
		this.admin_business_entity_details_status = '';
	}

	clear_admin_business_entity_details(){
		this.admin_business_entity_details = {};
		this.admin_business_entity_details_status = '';
	}

}