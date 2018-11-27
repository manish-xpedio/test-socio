import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-visitorlog',
	templateUrl: './visitorlog.component.html',
	styleUrls: ['./visitorlog.component.css']
})

export class VisitorlogComponent implements OnInit {
	@Output() parent_flag = new EventEmitter();


	supp_visitor_log_status: string = '';
	supp_visitor_invitationList: any = [];
	crm_membersList: any = [];
	supp_visitor_log: any = {};
	supp_visitor_logList: any = [];

	constructor( private ds: DataService, private route: ActivatedRoute, private router: Router ){
	}

	ngOnInit() {
		this.parent_flag.emit(
			{
				comp_name: 'visitorlog',
				hide_side_menu: false,
				hide_login_btn: true,
				hide_logout_btn: false,
				content_name: 'main-content'
			}
		);
		this.route.queryParams
			.subscribe(params => {
			this.supp_visitor_log['sysid'] = params.id;
		});
		this.ref_select();
		this.select_supp_visitor_log();


	}


	ref_select(){
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: {action: 'REF_SELECT'},
				proc: 'supp_visitor_logOps'
			}
		})
		.subscribe(res => {
			this.supp_visitor_invitationList = res['data'][0];
			this.crm_membersList = res['data'][1];
		});
	}

	select_supp_visitor_log(){
		this.supp_visitor_log['action']='SELECT_SUPP_VISITOR_LOG';
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.supp_visitor_log,
				proc: 'supp_visitor_logOps'
			}
		})
		.subscribe(res => {
			this.supp_visitor_logList = res['data'][0];
			if (+this.supp_visitor_log['sysid'] > 0){
				this.supp_visitor_log = this.supp_visitor_logList[0];
			}
			else
				this.supp_visitor_log = {};
		});
	}

	save_supp_visitor_log(frm){
		if (!frm.form.valid){
			this.supp_visitor_log_status = 'Fields indicated by * are mandatory.';
			return;
		}
		this.supp_visitor_log['action']='SAVE_SUPP_VISITOR_LOG';

		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.supp_visitor_log,
				proc: 'supp_visitor_logOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.supp_visitor_log_status = res['data'][0][0].msg;
				this.supp_visitor_log = {};
				this.select_supp_visitor_log();
			}
			else
				this.supp_visitor_log_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	delete_supp_visitor_log(sysid){
		this.supp_visitor_log['action']='DELETE_SUPP_VISITOR_LOG';
		this.supp_visitor_log['sysid']=sysid;
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.supp_visitor_log,
				proc: 'supp_visitor_logOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.supp_visitor_log_status = res['data'][0][0].msg;
				this.supp_visitor_log = {};
				this.select_supp_visitor_log();
			}
			else
				this.supp_visitor_log_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	current_record_supp_visitor_log(rec){
		this.supp_visitor_log = rec;
		this.supp_visitor_log_status = '';
	}

	clear_supp_visitor_log(){
		this.supp_visitor_log = {};
		this.supp_visitor_log_status = '';
	}

}