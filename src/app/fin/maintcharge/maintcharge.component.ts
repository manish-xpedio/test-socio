import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-maintcharge',
	templateUrl: './maintcharge.component.html',
	styleUrls: ['./maintcharge.component.css']
})

export class MaintchargeComponent implements OnInit {
	@Output() parent_flag = new EventEmitter();

	fin_maintainance_charges_master_status: string = '';
	fin_maintainance_charges_master: any = {};
	fin_maintainance_charges_masterList: any = [];
	fin_maintainance_charges_details: any = {};
	fin_maintainance_charges_detailsList: any = [];
	fin_maintainance_charges_details_status: string = '';

	constructor( private ds: DataService, private route: ActivatedRoute, private router: Router ){
	}

	ngOnInit() {
		this.parent_flag.emit(
			{
				comp_name: 'maintcharge',
				hide_side_menu: false,
				hide_login_btn: true,
				hide_logout_btn: false,
				content_name: 'main-content'
			}
		);

		this.route.queryParams
			.subscribe(params => {
			this.fin_maintainance_charges_master['sysid'] = params.sysid;
		});
		this.ref_select();
		this.select_fin_maintainance_charges_master();
	}

	

	ref_select(){
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: {action: 'REF_SELECT'},
				proc: 'fin_maintainance_charges_masterOps'
			}
		})
		.subscribe(res => {
		});
	}

	select_fin_maintainance_charges_master(){
		this.fin_maintainance_charges_master['action']='SELECT_FIN_MAINTAINANCE_CHARGES_MASTER';
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.fin_maintainance_charges_master,
				proc: 'fin_maintainance_charges_masterOps'
			}
		})
		.subscribe(res => {
			console.log(res);
			this.fin_maintainance_charges_masterList = res['data'][0];
			if (+this.fin_maintainance_charges_master['sysid'] > 0){
				this.fin_maintainance_charges_master = this.fin_maintainance_charges_masterList[0];
				this.fin_maintainance_charges_detailsList = res['data'][1];
				this.fin_maintainance_charges_master['total_owner_charges'] = res['data'][2][0]['charge_value_owner'];
				this.fin_maintainance_charges_master['total_tenant_charges'] = res['data'][2][0]['charge_value_tenant'];
			}
			else
				this.fin_maintainance_charges_master = {};
		});
	}

	save_fin_maintainance_charges_master(frm){
		if (!frm.form.valid){
			this.fin_maintainance_charges_master_status = 'Fields indicated by * are mandatory.';
			return;
		}
		this.fin_maintainance_charges_master['action']='SAVE_FIN_MAINTAINANCE_CHARGES_MASTER';

		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.fin_maintainance_charges_master,
				proc: 'fin_maintainance_charges_masterOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.fin_maintainance_charges_master_status = res['data'][0][0].msg;
				this.fin_maintainance_charges_master = {};
				this.select_fin_maintainance_charges_master();
			}
			else
				this.fin_maintainance_charges_master_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	delete_fin_maintainance_charges_master(sysid){
		this.fin_maintainance_charges_master['action']='DELETE_FIN_MAINTAINANCE_CHARGES_MASTER';
		this.fin_maintainance_charges_master['sysid']=sysid;
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.fin_maintainance_charges_master,
				proc: 'fin_maintainance_charges_masterOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.fin_maintainance_charges_master_status = res['data'][0][0].msg;
				this.fin_maintainance_charges_master = {};
				this.select_fin_maintainance_charges_master();
			}
			else
				this.fin_maintainance_charges_master_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	current_record_fin_maintainance_charges_master(rec){
		this.fin_maintainance_charges_master = rec;
		this.fin_maintainance_charges_master_status = '';
	}

	clear_fin_maintainance_charges_master(){
		this.fin_maintainance_charges_master = {};
		this.fin_maintainance_charges_master_status = '';
	}

	select_fin_maintainance_charges_details(){
		this.fin_maintainance_charges_details['action']='SELECT_FIN_MAINTAINANCE_CHARGES_DETAILS';
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.fin_maintainance_charges_details,
				proc: 'fin_maintainance_charges_detailsOps'
			}
		})
		.subscribe(res => {
			this.fin_maintainance_charges_detailsList = res['data'][0];
			if (+this.fin_maintainance_charges_details['sysid'] > 0){
				this.fin_maintainance_charges_details = this.fin_maintainance_charges_detailsList[0];
			}
			else
				this.fin_maintainance_charges_details = {};
		});
	}

	save_fin_maintainance_charges_details(frm){
		if (!frm.form.valid){
			this.fin_maintainance_charges_details_status = 'Fields indicated by * are mandatory.';
			return;
		}
		this.fin_maintainance_charges_details['action']='SAVE_FIN_MAINTAINANCE_CHARGES_DETAILS';

		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.fin_maintainance_charges_details,
				proc: 'fin_maintainance_charges_detailsOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.fin_maintainance_charges_details_status = res['data'][0][0].msg;
				this.select_fin_maintainance_charges_master();
				this.fin_maintainance_charges_details = {main_id: this.fin_maintainance_charges_master['sysid']};
			}
			else
				this.fin_maintainance_charges_details_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	delete_fin_maintainance_charges_details(sysid){
		this.fin_maintainance_charges_details['action']='DELETE_FIN_MAINTAINANCE_CHARGES_DETAILS';
		this.fin_maintainance_charges_details['sysid']=sysid;
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.fin_maintainance_charges_details,
				proc: 'fin_maintainance_charges_detailsOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.fin_maintainance_charges_details_status = res['data'][0][0].msg;
				this.fin_maintainance_charges_details = {};
				this.select_fin_maintainance_charges_details();
			}
			else
				this.fin_maintainance_charges_details_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	current_record_fin_maintainance_charges_details(rec){
		this.fin_maintainance_charges_details = rec;
		this.fin_maintainance_charges_details_status = '';
	}

	clear_fin_maintainance_charges_details(){
		this.fin_maintainance_charges_details = {main_id: this.fin_maintainance_charges_master['sysid']};
		this.fin_maintainance_charges_details_status = '';
	}

}