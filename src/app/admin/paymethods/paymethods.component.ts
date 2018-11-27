import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-paymethods',
	templateUrl: './paymethods.component.html',
	styleUrls: ['./paymethods.component.css']
})

export class PaymethodsComponent implements OnInit {
	@Output() parent_flag = new EventEmitter();


	admin_payment_methods_status: string = '';
	admin_payment_methods: any = {};
	admin_payment_methodsList: any = [];

	constructor( private ds: DataService, private route: ActivatedRoute, private router: Router ){
	}

	ngOnInit() {
		this.parent_flag.emit(
			{
				comp_name: 'paymethods',
				hide_side_menu: false,
				hide_login_btn: true,
				hide_logout_btn: false,
				content_name: 'main-content'
			}
		);
		this.route.queryParams
			.subscribe(params => {
			this.admin_payment_methods['sysid'] = params.id;
		});
		this.ref_select();
		this.select_admin_payment_methods();


	}


	ref_select(){
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: {action: 'REF_SELECT'},
				proc: 'admin_payment_methodsOps'
			}
		})
		.subscribe(res => {
		});
	}

	select_admin_payment_methods(){
		this.admin_payment_methods['action']='SELECT_ADMIN_PAYMENT_METHODS';
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.admin_payment_methods,
				proc: 'admin_payment_methodsOps'
			}
		})
		.subscribe(res => {
			this.admin_payment_methodsList = res['data'][0];
			if (+this.admin_payment_methods['sysid'] > 0){
				this.admin_payment_methods = this.admin_payment_methodsList[0];
			}
			else
				this.admin_payment_methods = {};
		});
	}

	save_admin_payment_methods(frm){
		if (!frm.form.valid){
			this.admin_payment_methods_status = 'Fields indicated by * are mandatory.';
			return;
		}
		this.admin_payment_methods['action']='SAVE_ADMIN_PAYMENT_METHODS';

		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.admin_payment_methods,
				proc: 'admin_payment_methodsOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.admin_payment_methods_status = res['data'][0][0].msg;
				this.admin_payment_methods = {};
				this.select_admin_payment_methods();
			}
			else
				this.admin_payment_methods_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	delete_admin_payment_methods(sysid){
		this.admin_payment_methods['action']='DELETE_ADMIN_PAYMENT_METHODS';
		this.admin_payment_methods['sysid']=sysid;
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.admin_payment_methods,
				proc: 'admin_payment_methodsOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.admin_payment_methods_status = res['data'][0][0].msg;
				this.admin_payment_methods = {};
				this.select_admin_payment_methods();
			}
			else
				this.admin_payment_methods_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	current_record_admin_payment_methods(rec){
		this.admin_payment_methods = rec;
		this.admin_payment_methods_status = '';
	}

	clear_admin_payment_methods(){
		this.admin_payment_methods = {};
		this.admin_payment_methods_status = '';
	}

}