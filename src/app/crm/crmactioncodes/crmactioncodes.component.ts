import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-crmactioncodes',
	templateUrl: './crmactioncodes.component.html',
	styleUrls: ['./crmactioncodes.component.css']
})

export class CrmactioncodesComponent implements OnInit {
	@Output() parent_flag = new EventEmitter();


	crm_action_codes_status: string = '';
	crm_action_codes: any = {};
	crm_action_codesList: any = [];

	constructor( private ds: DataService, private route: ActivatedRoute, private router: Router ){
	}

	ngOnInit() {
		this.parent_flag.emit(
			{
				comp_name: 'crmactioncodes',
				hide_side_menu: false,
				hide_login_btn: true,
				hide_logout_btn: false,
				content_name: 'main-content'
			}
		);
		this.route.queryParams
			.subscribe(params => {
			this.crm_action_codes['sysid'] = params.id;
		});
		this.ref_select();
		this.select_crm_action_codes();


	}


	ref_select(){
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: {action: 'REF_SELECT'},
				proc: 'crm_action_codesOps'
			}
		})
		.subscribe(res => {
		});
	}

	select_crm_action_codes(){
		this.crm_action_codes['action']='SELECT_CRM_ACTION_CODES';
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.crm_action_codes,
				proc: 'crm_action_codesOps'
			}
		})
		.subscribe(res => {
			this.crm_action_codesList = res['data'][0];
			if (+this.crm_action_codes['sysid'] > 0){
				this.crm_action_codes = this.crm_action_codesList[0];
			}
			else
				this.crm_action_codes = {};
		});
	}

	save_crm_action_codes(frm){
		if (!frm.form.valid){
			this.crm_action_codes_status = 'Fields indicated by * are mandatory.';
			return;
		}
		this.crm_action_codes['action']='SAVE_CRM_ACTION_CODES';

		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.crm_action_codes,
				proc: 'crm_action_codesOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.crm_action_codes_status = res['data'][0][0].msg;
				this.crm_action_codes = {};
				this.select_crm_action_codes();
			}
			else
				this.crm_action_codes_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	delete_crm_action_codes(sysid){
		this.crm_action_codes['action']='DELETE_CRM_ACTION_CODES';
		this.crm_action_codes['sysid']=sysid;
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.crm_action_codes,
				proc: 'crm_action_codesOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.crm_action_codes_status = res['data'][0][0].msg;
				this.crm_action_codes = {};
				this.select_crm_action_codes();
			}
			else
				this.crm_action_codes_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	current_record_crm_action_codes(rec){
		this.crm_action_codes = rec;
		this.crm_action_codes_status = '';
	}

	clear_crm_action_codes(){
		this.crm_action_codes = {};
		this.crm_action_codes_status = '';
	}

}