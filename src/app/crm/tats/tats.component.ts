import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-tats',
	templateUrl: './tats.component.html',
	styleUrls: ['./tats.component.css']
})

export class TatsComponent implements OnInit {
	@Output() parent_flag = new EventEmitter();


	crm_tat_def_status: string = '';
	crm_ticket_typesList: any = [];
	crm_ticket_subtypeList: any = [];
	crm_ticket_categoryList: any = [];
	crm_action_codesList: any = [];
	admin_rolesList: any = [];
	crm_esc_matrixList: any = [];
	admin_noti_channelsList: any = [];
	crm_tat_def: any = {};
	crm_tat_defList: any = [];

	constructor( private ds: DataService, private route: ActivatedRoute, private router: Router ){
	}

	ngOnInit() {
		this.parent_flag.emit(
			{
				comp_name: 'tats',
				hide_side_menu: false,
				hide_login_btn: true,
				hide_logout_btn: false,
				content_name: 'main-content'
			}
		);
		this.route.queryParams
			.subscribe(params => {
			this.crm_tat_def['sysid'] = params.id;
		});
		this.ref_select();
		this.select_crm_tat_def();


	}


	ref_select(){
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: {action: 'REF_SELECT'},
				proc: 'crm_tat_defOps'
			}
		})
		.subscribe(res => {
			this.crm_ticket_typesList = res['data'][0];
			this.crm_ticket_subtypeList = res['data'][1];
			this.crm_ticket_categoryList = res['data'][2];
			this.crm_action_codesList = res['data'][3];
			this.admin_rolesList = res['data'][4];
			this.crm_esc_matrixList = res['data'][5];
			this.admin_noti_channelsList = res['data'][6];
		});
	}

	select_crm_tat_def(){
		this.crm_tat_def['action']='SELECT_CRM_TAT_DEF';
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.crm_tat_def,
				proc: 'crm_tat_defOps'
			}
		})
		.subscribe(res => {
			this.crm_tat_defList = res['data'][0];
			if (+this.crm_tat_def['sysid'] > 0){
				this.crm_tat_def = this.crm_tat_defList[0];
			}
			else
				this.crm_tat_def = {};
		});
	}

	save_crm_tat_def(frm){
		if (!frm.form.valid){
			this.crm_tat_def_status = 'Fields indicated by * are mandatory.';
			return;
		}
		this.crm_tat_def['action']='SAVE_CRM_TAT_DEF';

		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.crm_tat_def,
				proc: 'crm_tat_defOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.crm_tat_def_status = res['data'][0][0].msg;
				this.crm_tat_def = {};
				this.select_crm_tat_def();
			}
			else
				this.crm_tat_def_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	delete_crm_tat_def(sysid){
		this.crm_tat_def['action']='DELETE_CRM_TAT_DEF';
		this.crm_tat_def['sysid']=sysid;
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.crm_tat_def,
				proc: 'crm_tat_defOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.crm_tat_def_status = res['data'][0][0].msg;
				this.crm_tat_def = {};
				this.select_crm_tat_def();
			}
			else
				this.crm_tat_def_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	current_record_crm_tat_def(rec){
		this.crm_tat_def = rec;
		this.crm_tat_def_status = '';
	}

	clear_crm_tat_def(){
		this.crm_tat_def = {};
		this.crm_tat_def_status = '';
	}

}