import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-visitorpendingreq',
	templateUrl: './visitorpendingreq.component.html',
	styleUrls: ['./visitorpendingreq.component.css']
})

export class VisitorpendingreqComponent implements OnInit {
	@Output() parent_flag = new EventEmitter();


	supp_gatepass_status: string = '';
	supp_visitor_invitationList: any = [];
	supp_gatepass: any = {};
	supp_gatepassList: any = [];

	constructor( private ds: DataService, private route: ActivatedRoute, private router: Router ){
	}

	ngOnInit() {
		this.parent_flag.emit(
			{
				comp_name: 'visitorpendingreq',
				hide_side_menu: false,
				hide_login_btn: true,
				hide_logout_btn: false,
				content_name: 'main-content'
			}
		);
		this.route.queryParams
			.subscribe(params => {
			this.supp_gatepass['sysid'] = params.id;
		});
		this.ref_select();
		this.select_supp_gatepass();
		this.supp_gatepass['in_date'] = this.ds.getJsonDate(this.supp_gatepass['in_date']);
		this.supp_gatepass['out_date'] = this.ds.getJsonDate(this.supp_gatepass['out_date']);

	}


	ref_select(){
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: {action: 'REF_SELECT'},
				proc: 'supp_gatepassOps'
			}
		})
		.subscribe(res => {
			this.supp_visitor_invitationList = res['data'][0];
		});
	}

	select_supp_gatepass(){
		this.supp_gatepass['action']='SELECT_SUPP_GATEPASS';
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.supp_gatepass,
				proc: 'supp_gatepassOps'
			}
		})
		.subscribe(res => {
			this.supp_gatepassList = res['data'][0];
			if (+this.supp_gatepass['sysid'] > 0){
				this.supp_gatepass = this.supp_gatepassList[0];
			}
			else
				this.supp_gatepass = {};
		});
	}

	save_supp_gatepass(frm){
		if (!frm.form.valid){
			this.supp_gatepass_status = 'Fields indicated by * are mandatory.';
			return;
		}
		this.supp_gatepass['action']='SAVE_SUPP_GATEPASS';
		this.supp_gatepass['in_date'] = this.ds.getStringDate(this.supp_gatepass['in_date']);
		this.supp_gatepass['out_date'] = this.ds.getStringDate(this.supp_gatepass['out_date']);
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.supp_gatepass,
				proc: 'supp_gatepassOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.supp_gatepass_status = res['data'][0][0].msg;
				this.supp_gatepass = {};
				this.select_supp_gatepass();
			}
			else
				this.supp_gatepass_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	delete_supp_gatepass(sysid){
		this.supp_gatepass['action']='DELETE_SUPP_GATEPASS';
		this.supp_gatepass['sysid']=sysid;
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.supp_gatepass,
				proc: 'supp_gatepassOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.supp_gatepass_status = res['data'][0][0].msg;
				this.supp_gatepass = {};
				this.select_supp_gatepass();
			}
			else
				this.supp_gatepass_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	current_record_supp_gatepass(rec){
		this.supp_gatepass = rec;
		this.supp_gatepass_status = '';
	}

	clear_supp_gatepass(){
		this.supp_gatepass = {};
		this.supp_gatepass_status = '';
	}

}