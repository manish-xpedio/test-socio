import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-ticketsubtype',
	templateUrl: './ticketsubtype.component.html',
	styleUrls: ['./ticketsubtype.component.css']
})

export class TicketsubtypeComponent implements OnInit {
	@Output() parent_flag = new EventEmitter();


	crm_ticket_subtype_status: string = '';
	crm_ticket_subtype: any = {};
	crm_ticket_subtypeList: any = [];

	constructor( private ds: DataService, private route: ActivatedRoute, private router: Router ){
	}

	ngOnInit() {
		this.parent_flag.emit(
			{
				comp_name: 'ticketsubtype',
				hide_side_menu: false,
				hide_login_btn: true,
				hide_logout_btn: false,
				content_name: 'main-content'
			}
		);
		this.route.queryParams
			.subscribe(params => {
			this.crm_ticket_subtype['sysid'] = params.id;
		});
		this.ref_select();
		this.select_crm_ticket_subtype();


	}


	ref_select(){
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: {action: 'REF_SELECT'},
				proc: 'crm_ticket_subtypeOps'
			}
		})
		.subscribe(res => {
		});
	}

	select_crm_ticket_subtype(){
		this.crm_ticket_subtype['action']='SELECT_CRM_TICKET_SUBTYPE';
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.crm_ticket_subtype,
				proc: 'crm_ticket_subtypeOps'
			}
		})
		.subscribe(res => {
			this.crm_ticket_subtypeList = res['data'][0];
			if (+this.crm_ticket_subtype['sysid'] > 0){
				this.crm_ticket_subtype = this.crm_ticket_subtypeList[0];
			}
			else
				this.crm_ticket_subtype = {};
		});
	}

	save_crm_ticket_subtype(frm){
		if (!frm.form.valid){
			this.crm_ticket_subtype_status = 'Fields indicated by * are mandatory.';
			return;
		}
		this.crm_ticket_subtype['action']='SAVE_CRM_TICKET_SUBTYPE';

		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.crm_ticket_subtype,
				proc: 'crm_ticket_subtypeOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.crm_ticket_subtype_status = res['data'][0][0].msg;
				this.crm_ticket_subtype = {};
				this.select_crm_ticket_subtype();
			}
			else
				this.crm_ticket_subtype_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	delete_crm_ticket_subtype(sysid){
		this.crm_ticket_subtype['action']='DELETE_CRM_TICKET_SUBTYPE';
		this.crm_ticket_subtype['sysid']=sysid;
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.crm_ticket_subtype,
				proc: 'crm_ticket_subtypeOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.crm_ticket_subtype_status = res['data'][0][0].msg;
				this.crm_ticket_subtype = {};
				this.select_crm_ticket_subtype();
			}
			else
				this.crm_ticket_subtype_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	current_record_crm_ticket_subtype(rec){
		this.crm_ticket_subtype = rec;
		this.crm_ticket_subtype_status = '';
	}

	clear_crm_ticket_subtype(){
		this.crm_ticket_subtype = {};
		this.crm_ticket_subtype_status = '';
	}

}