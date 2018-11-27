import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-tickettypes',
	templateUrl: './tickettypes.component.html',
	styleUrls: ['./tickettypes.component.css']
})

export class TickettypesComponent implements OnInit {
	@Output() parent_flag = new EventEmitter();


	crm_ticket_types_status: string = '';
	crm_ticket_types: any = {};
	crm_ticket_typesList: any = [];

	constructor( private ds: DataService, private route: ActivatedRoute, private router: Router ){
	}

	ngOnInit() {
		this.parent_flag.emit(
			{
				comp_name: 'tickettypes',
				hide_side_menu: false,
				hide_login_btn: true,
				hide_logout_btn: false,
				content_name: 'main-content'
			}
		);
		this.route.queryParams
			.subscribe(params => {
			this.crm_ticket_types['sysid'] = params.id;
		});
		this.ref_select();
		this.select_crm_ticket_types();


	}


	ref_select(){
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: {action: 'REF_SELECT'},
				proc: 'crm_ticket_typesOps'
			}
		})
		.subscribe(res => {
		});
	}

	select_crm_ticket_types(){
		this.crm_ticket_types['action']='SELECT_CRM_TICKET_TYPES';
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.crm_ticket_types,
				proc: 'crm_ticket_typesOps'
			}
		})
		.subscribe(res => {
			this.crm_ticket_typesList = res['data'][0];
			if (+this.crm_ticket_types['sysid'] > 0){
				this.crm_ticket_types = this.crm_ticket_typesList[0];
			}
			else
				this.crm_ticket_types = {};
		});
	}

	save_crm_ticket_types(frm){
		if (!frm.form.valid){
			this.crm_ticket_types_status = 'Fields indicated by * are mandatory.';
			return;
		}
		this.crm_ticket_types['action']='SAVE_CRM_TICKET_TYPES';

		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.crm_ticket_types,
				proc: 'crm_ticket_typesOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.crm_ticket_types_status = res['data'][0][0].msg;
				this.crm_ticket_types = {};
				this.select_crm_ticket_types();
			}
			else
				this.crm_ticket_types_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	delete_crm_ticket_types(sysid){
		this.crm_ticket_types['action']='DELETE_CRM_TICKET_TYPES';
		this.crm_ticket_types['sysid']=sysid;
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.crm_ticket_types,
				proc: 'crm_ticket_typesOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.crm_ticket_types_status = res['data'][0][0].msg;
				this.crm_ticket_types = {};
				this.select_crm_ticket_types();
			}
			else
				this.crm_ticket_types_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	current_record_crm_ticket_types(rec){
		this.crm_ticket_types = rec;
		this.crm_ticket_types_status = '';
	}

	clear_crm_ticket_types(){
		this.crm_ticket_types = {};
		this.crm_ticket_types_status = '';
	}

}