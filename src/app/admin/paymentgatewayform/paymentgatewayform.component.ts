import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-paymentgatewayform',
	templateUrl: './paymentgatewayform.component.html',
	styleUrls: ['./paymentgatewayform.component.css']
})

export class PaymentgatewayformComponent implements OnInit {
	@Output() parent_flag = new EventEmitter();


	admin_payment_gateway_status: string = '';
	admin_payment_gateway: any = {};
	admin_payment_gatewayList: any = [];

	constructor( private ds: DataService, private route: ActivatedRoute, private router: Router ){
	}

	ngOnInit() {
		this.parent_flag.emit(
			{
				comp_name: 'paymentgatewayform',
				hide_side_menu: false,
				hide_login_btn: true,
				hide_logout_btn: false,
				content_name: 'main-content'
			}
		);
		this.route.queryParams
			.subscribe(params => {
			this.admin_payment_gateway['sysid'] = params.id;
		});
		this.ref_select();
		this.select_admin_payment_gateway();


	}


	ref_select(){
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: {action: 'REF_SELECT'},
				proc: 'admin_payment_gatewayOps'
			}
		})
		.subscribe(res => {
		});
	}

	select_admin_payment_gateway(){
		this.admin_payment_gateway['action']='SELECT_ADMIN_PAYMENT_GATEWAY';
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.admin_payment_gateway,
				proc: 'admin_payment_gatewayOps'
			}
		})
		.subscribe(res => {
			this.admin_payment_gatewayList = res['data'][0];
			if (+this.admin_payment_gateway['sysid'] > 0){
				this.admin_payment_gateway = this.admin_payment_gatewayList[0];
			}
			else
				this.admin_payment_gateway = {};
		});
	}

	save_admin_payment_gateway(frm){
		if (!frm.form.valid){
			this.admin_payment_gateway_status = 'Fields indicated by * are mandatory.';
			return;
		}
		this.admin_payment_gateway['action']='SAVE_ADMIN_PAYMENT_GATEWAY';

		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.admin_payment_gateway,
				proc: 'admin_payment_gatewayOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.admin_payment_gateway_status = res['data'][0][0].msg;
				this.admin_payment_gateway = {};
				this.select_admin_payment_gateway();
			}
			else
				this.admin_payment_gateway_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	delete_admin_payment_gateway(sysid){
		this.admin_payment_gateway['action']='DELETE_ADMIN_PAYMENT_GATEWAY';
		this.admin_payment_gateway['sysid']=sysid;
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.admin_payment_gateway,
				proc: 'admin_payment_gatewayOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.admin_payment_gateway_status = res['data'][0][0].msg;
				this.admin_payment_gateway = {};
				this.select_admin_payment_gateway();
			}
			else
				this.admin_payment_gateway_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	current_record_admin_payment_gateway(rec){
		this.admin_payment_gateway = rec;
		this.admin_payment_gateway_status = '';
	}

	clear_admin_payment_gateway(){
		this.admin_payment_gateway = {};
		this.admin_payment_gateway_status = '';
	}

}