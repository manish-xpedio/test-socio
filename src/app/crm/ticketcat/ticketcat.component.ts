import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-ticketcat',
	templateUrl: './ticketcat.component.html',
	styleUrls: ['./ticketcat.component.css']
})

export class TicketcatComponent implements OnInit {
	@Output() parent_flag = new EventEmitter();


	crm_ticket_category_status: string = '';
	crm_ticket_category: any = {};
	crm_ticket_categoryList: any = [];

	constructor( private ds: DataService, private route: ActivatedRoute, private router: Router ){
	}

	ngOnInit() {
		this.parent_flag.emit(
			{
				comp_name: 'ticketcat',
				hide_side_menu: false,
				hide_login_btn: true,
				hide_logout_btn: false,
				content_name: 'main-content'
			}
		);
		this.route.queryParams
			.subscribe(params => {
			this.crm_ticket_category['sysid'] = params.id;
		});
		this.ref_select();
		this.select_crm_ticket_category();


	}


	ref_select(){
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: {action: 'REF_SELECT'},
				proc: 'crm_ticket_categoryOps'
			}
		})
		.subscribe(res => {
		});
	}

	select_crm_ticket_category(){
		this.crm_ticket_category['action']='SELECT_CRM_TICKET_CATEGORY';
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.crm_ticket_category,
				proc: 'crm_ticket_categoryOps'
			}
		})
		.subscribe(res => {
			this.crm_ticket_categoryList = res['data'][0];
			if (+this.crm_ticket_category['sysid'] > 0){
				this.crm_ticket_category = this.crm_ticket_categoryList[0];
			}
			else
				this.crm_ticket_category = {};
		});
	}

	save_crm_ticket_category(frm){
		if (!frm.form.valid){
			this.crm_ticket_category_status = 'Fields indicated by * are mandatory.';
			return;
		}
		this.crm_ticket_category['action']='SAVE_CRM_TICKET_CATEGORY';

		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.crm_ticket_category,
				proc: 'crm_ticket_categoryOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.crm_ticket_category_status = res['data'][0][0].msg;
				this.crm_ticket_category = {};
				this.select_crm_ticket_category();
			}
			else
				this.crm_ticket_category_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	delete_crm_ticket_category(sysid){
		this.crm_ticket_category['action']='DELETE_CRM_TICKET_CATEGORY';
		this.crm_ticket_category['sysid']=sysid;
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.crm_ticket_category,
				proc: 'crm_ticket_categoryOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.crm_ticket_category_status = res['data'][0][0].msg;
				this.crm_ticket_category = {};
				this.select_crm_ticket_category();
			}
			else
				this.crm_ticket_category_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	current_record_crm_ticket_category(rec){
		this.crm_ticket_category = rec;
		this.crm_ticket_category_status = '';
	}

	clear_crm_ticket_category(){
		this.crm_ticket_category = {};
		this.crm_ticket_category_status = '';
	}

}