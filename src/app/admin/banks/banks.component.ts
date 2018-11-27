import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-banks',
	templateUrl: './banks.component.html',
	styleUrls: ['./banks.component.css']
})

export class BanksComponent implements OnInit {
	@Output() parent_flag = new EventEmitter();
	admin_banks_status: string = '';
	admin_banks: any = {};
	admin_banksList: any = [];


	constructor( private ds: DataService, private route: ActivatedRoute, private router: Router ){
	}

	ngOnInit() {
		this.parent_flag.emit(
			{
				comp_name: 'banks',
				hide_side_menu: false,
				hide_login_btn: true,
				hide_logout_btn: false,
				content_name: 'main-content'
			}
		);

		this.route.queryParams
			.subscribe(params => {
				this.admin_banks['sysid'] = params.id;
			});

		this.ref_select();
		this.select_admin_banks();
	}

	ref_select(){
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: {action: 'REF_SELECT'},
				proc: 'admin_banksOps'
			}
		})
		.subscribe(res => {
		});
	}

	select_admin_banks(){
		this.admin_banks['action']='SELECT_ADMIN_BANKS';
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.admin_banks,
				proc: 'admin_banksOps'
			}
		})
		.subscribe(res => {
			this.admin_banksList = res['data'][0];
			if (+this.admin_banks['sysid'] > 0){

				this.admin_banks = this.admin_banksList[0];
			}
			else
				this.admin_banks = {};
		});
	}

	save_admin_banks(frm){
		if (!frm.form.valid){
			this.admin_banks_status = 'Fields indicated by * are mandatory.';
			return;
		}
		this.admin_banks['action']='SAVE_ADMIN_BANKS';

		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.admin_banks,
				proc: 'admin_banksOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.admin_banks_status = res['data'][0][0].msg;
				this.admin_banks = {};
				this.select_admin_banks();
			}
			else
				this.admin_banks_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	delete_admin_banks(sysid){
		this.admin_banks['action']='DELETE_ADMIN_BANKS';
		this.admin_banks['sysid']=sysid;
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.admin_banks,
				proc: 'admin_banksOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.admin_banks_status = res['data'][0][0].msg;
				this.admin_banks = {};
				this.select_admin_banks();
			}
			else
				this.admin_banks_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	current_record_admin_banks(rec){
		this.admin_banks = rec;
		this.admin_banks_status = '';
	}

	clear_admin_banks(){
		this.admin_banks = {};
		this.admin_banks_status = '';
	}

}