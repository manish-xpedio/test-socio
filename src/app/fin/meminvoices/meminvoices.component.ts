import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-meminvoices',
	templateUrl: './meminvoices.component.html',
	styleUrls: ['./meminvoices.component.css']
})

export class MeminvoicesComponent implements OnInit {
	@Output() parent_flag = new EventEmitter();


	fin_member_payments_status: string = '';
	crm_membersList: any = [];
	fin_member_pay_demandList: any = [];
	fin_cost_headsList: any = [];
	fin_member_payments: any = {};
	fin_member_paymentsList: any = [];
	fin_member_payments_attribs: any = {};
	fin_member_payments_attribsList: any = [];
	bc_options: any = {};
	fin_member_payments_attribs_status: string = '';

	constructor( private ds: DataService, private route: ActivatedRoute, private router: Router ){
	}

	ngOnInit() {
		this.parent_flag.emit(
			{
				comp_name: 'meminvoices',
				hide_side_menu: false,
				hide_login_btn: true,
				hide_logout_btn: false,
				content_name: 'main-content'
			}
		);
		this.route.queryParams
			.subscribe(params => {
			this.fin_member_payments['sysid'] = params.id;
		});
		this.ref_select();
		this.ref_select_attribs();
		this.select_fin_member_payments();
		this.fin_member_payments['payment_date'] = this.ds.getJsonDate(this.fin_member_payments['payment_date']);
		this.fin_member_payments['from_date'] = this.ds.getJsonDate(this.fin_member_payments['from_date']);
		this.fin_member_payments['to_date'] = this.ds.getJsonDate(this.fin_member_payments['to_date']);
		this.select_fin_member_payments_attribs();

		this.bc_options = {
			format: "pharmacode",
  			lineColor: "#0aa",
  			width:4,
  			height:40,
  			displayValue: false
		}
	}


	ref_select(){
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: {action: 'REF_SELECT'},
				proc: 'fin_member_paymentsOps'
			}
		})
		.subscribe(res => {
			this.crm_membersList = res['data'][0];
			this.fin_member_pay_demandList = res['data'][1];
			this.fin_cost_headsList = res['data'][2];
		});
	}

	select_fin_member_payments(){
		this.fin_member_payments['action']='SELECT_FIN_MEMBER_PAYMENTS';
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.fin_member_payments,
				proc: 'fin_member_paymentsOps'
			}
		})
		.subscribe(res => {
			this.fin_member_paymentsList = res['data'][0];
			if (+this.fin_member_payments['sysid'] > 0){
				this.fin_member_payments = this.fin_member_paymentsList[0];
			}
			else
				this.fin_member_payments = {};
		});
	}

	save_fin_member_payments(frm){
		if (!frm.form.valid){
			this.fin_member_payments_status = 'Fields indicated by * are mandatory.';
			return;
		}
		this.fin_member_payments['action']='SAVE_FIN_MEMBER_PAYMENTS';
		this.fin_member_payments['payment_date'] = this.ds.getStringDate(this.fin_member_payments['payment_date']);
		this.fin_member_payments['from_date'] = this.ds.getStringDate(this.fin_member_payments['from_date']);
		this.fin_member_payments['to_date'] = this.ds.getStringDate(this.fin_member_payments['to_date']);
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.fin_member_payments,
				proc: 'fin_member_paymentsOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.fin_member_payments_status = res['data'][0][0].msg;
				this.fin_member_payments = {};
				this.select_fin_member_payments();
			}
			else
				this.fin_member_payments_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	delete_fin_member_payments(sysid){
		this.fin_member_payments['action']='DELETE_FIN_MEMBER_PAYMENTS';
		this.fin_member_payments['sysid']=sysid;
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.fin_member_payments,
				proc: 'fin_member_paymentsOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.fin_member_payments_status = res['data'][0][0].msg;
				this.fin_member_payments = {};
				this.select_fin_member_payments();
			}
			else
				this.fin_member_payments_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	current_record_fin_member_payments(rec){
		this.fin_member_payments = rec;
		this.fin_member_payments_status = '';
	}

	clear_fin_member_payments(){
		this.fin_member_payments = {};
		this.fin_member_payments_status = '';
	}

	ref_select_attribs(){
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: {action: 'REF_SELECT'},
				proc: 'fin_member_payments_attribsOps'
			}
		})
		.subscribe(res => {
			this.crm_membersList = res['data'][0];
			this.fin_member_pay_demandList = res['data'][1];
			this.fin_cost_headsList = res['data'][2];
			this.fin_member_paymentsList = res['data'][3];
		});
	}

	select_fin_member_payments_attribs(){
		this.fin_member_payments_attribs['action']='SELECT_FIN_MEMBER_PAYMENTS_ATTRIBS';
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.fin_member_payments_attribs,
				proc: 'fin_member_payments_attribsOps'
			}
		})
		.subscribe(res => {
			this.fin_member_payments_attribsList = res['data'][0];
			if (+this.fin_member_payments_attribs['sysid'] > 0){
				this.fin_member_payments_attribs = this.fin_member_payments_attribsList[0];
			}
			else
				this.fin_member_payments_attribs = {};
		});
	}

	save_fin_member_payments_attribs(frm){
		if (!frm.form.valid){
			this.fin_member_payments_attribs_status = 'Fields indicated by * are mandatory.';
			return;
		}
		this.fin_member_payments_attribs['action']='SAVE_FIN_MEMBER_PAYMENTS_ATTRIBS';

		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.fin_member_payments_attribs,
				proc: 'fin_member_payments_attribsOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.fin_member_payments_attribs_status = res['data'][0][0].msg;
				this.fin_member_payments_attribs = {};
				this.select_fin_member_payments_attribs();
			}
			else
				this.fin_member_payments_attribs_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	delete_fin_member_payments_attribs(sysid){
		this.fin_member_payments_attribs['action']='DELETE_FIN_MEMBER_PAYMENTS_ATTRIBS';
		this.fin_member_payments_attribs['sysid']=sysid;
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.fin_member_payments_attribs,
				proc: 'fin_member_payments_attribsOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.fin_member_payments_attribs_status = res['data'][0][0].msg;
				this.fin_member_payments_attribs = {};
				this.select_fin_member_payments_attribs();
			}
			else
				this.fin_member_payments_attribs_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	current_record_fin_member_payments_attribs(rec){
		this.fin_member_payments_attribs = rec;
		this.fin_member_payments_attribs_status = '';
	}

	clear_fin_member_payments_attribs(){
		this.fin_member_payments_attribs = {};
		this.fin_member_payments_attribs_status = '';
	}

}