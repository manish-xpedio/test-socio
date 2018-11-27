import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-commtype',
	templateUrl: './commtype.component.html',
	styleUrls: ['./commtype.component.css']
})

export class CommtypeComponent implements OnInit {
	@Output() parent_flag = new EventEmitter();
	crm_committee_type_status: string = '';
	crm_committee_type: any = {};
	crm_committee_typeList: any = [];


	constructor( private ds: DataService, private route: ActivatedRoute, private router: Router ){
	}

	ngOnInit() {
		this.parent_flag.emit(
			{
				comp_name: 'commtype',
				hide_side_menu: false,
				hide_login_btn: true,
				hide_logout_btn: false,
				content_name: 'main-content'
			}
		);

		this.route.queryParams
			.subscribe(params => {
				this.crm_committee_type['sysid'] = params.id;
			});

		this.ref_select();
		this.select_crm_committee_type();
	}

	ref_select(){
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: {action: 'REF_SELECT'},
				proc: 'crm_committee_typeOps'
			}
		})
		.subscribe(res => {
		});
	}

	select_crm_committee_type(){
		this.crm_committee_type['action']='SELECT_CRM_COMMITTEE_TYPE';
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.crm_committee_type,
				proc: 'crm_committee_typeOps'
			}
		})
		.subscribe(res => {
			this.crm_committee_typeList = res['data'][0];
			if (+this.crm_committee_type['sysid'] > 0){

				this.crm_committee_type = this.crm_committee_typeList[0];
			}
			else
				this.crm_committee_type = {};
		});
	}

	save_crm_committee_type(frm){
		if (!frm.form.valid){
			this.crm_committee_type_status = 'Fields indicated by * are mandatory.';
			return;
		}
		this.crm_committee_type['action']='SAVE_CRM_COMMITTEE_TYPE';

		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.crm_committee_type,
				proc: 'crm_committee_typeOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.crm_committee_type_status = res['data'][0][0].msg;
				this.crm_committee_type = {};
				this.select_crm_committee_type();
			}
			else
				this.crm_committee_type_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	delete_crm_committee_type(sysid){
		this.crm_committee_type['action']='DELETE_CRM_COMMITTEE_TYPE';
		this.crm_committee_type['sysid']=sysid;
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.crm_committee_type,
				proc: 'crm_committee_typeOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.crm_committee_type_status = res['data'][0][0].msg;
				this.crm_committee_type = {};
				this.select_crm_committee_type();
			}
			else
				this.crm_committee_type_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	current_record_crm_committee_type(rec){
		this.crm_committee_type = rec;
		this.crm_committee_type_status = '';
	}

	clear_crm_committee_type(){
		this.crm_committee_type = {};
		this.crm_committee_type_status = '';
	}

}