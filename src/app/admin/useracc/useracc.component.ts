import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute } from '@angular/router';
@Component({
	selector: 'app-useracc',
	templateUrl: './useracc.component.html',
	styleUrls: ['./useracc.component.css']
})

export class UseraccComponent implements OnInit {
	@Output() parent_flag = new EventEmitter();


	admin_access_login_status: string = '';
	admin_user_typeList: any = [];
	admin_access_login: any = {};
	admin_access_loginList: any = [];

	constructor( private ds: DataService, private route: ActivatedRoute ){
	}

	ngOnInit() {
		this.parent_flag.emit(
			{
				comp_name: 'useracc',
				hide_side_menu: false,
				hide_login_btn: true,
				hide_logout_btn: false,
				content_name: 'main-content'
			}
		);
		this.route.queryParams
			.subscribe(params => {
			this.admin_access_login['sysid'] = params.id;
		});
		this.ref_select();
		this.select_admin_access_login();
		this.admin_access_login['password_modified_date'] = this.ds.getJsonDate(this.admin_access_login['password_modified_date']);
		this.admin_access_login['password_reset_date'] = this.ds.getJsonDate(this.admin_access_login['password_reset_date']);

	}


	ref_select(){
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: {action: 'REF_SELECT'},
				proc: 'admin_access_loginOps'
			}
		})
		.subscribe(res => {
			this.admin_user_typeList = res['data'][0];
		});
	}

	select_admin_access_login(){
		this.admin_access_login['action']='SELECT_ADMIN_ACCESS_LOGIN';
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.admin_access_login,
				proc: 'admin_access_loginOps'
			}
		})
		.subscribe(res => {
			this.admin_access_loginList = res['data'][0];
			if (+this.admin_access_login['sysid'] > 0){
				this.admin_access_login = this.admin_access_loginList[0];
			}
			else
				this.admin_access_login = {};
		});
	}

	save_admin_access_login(){
		this.admin_access_login['action']='SAVE_ADMIN_ACCESS_LOGIN';
		this.admin_access_login['password_modified_date'] = this.ds.getStringDate(this.admin_access_login['password_modified_date']);
		this.admin_access_login['password_reset_date'] = this.ds.getStringDate(this.admin_access_login['password_reset_date']);
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.admin_access_login,
				proc: 'admin_access_loginOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.admin_access_login_status = res['data'][0][0].msg;
				this.admin_access_login = {};
				this.select_admin_access_login();
			}
			else
				this.admin_access_login_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	delete_admin_access_login(sysid){
		this.admin_access_login['action']='DELETE_ADMIN_ACCESS_LOGIN';
		this.admin_access_login['sysid']=sysid;
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.admin_access_login,
				proc: 'admin_access_loginOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.admin_access_login_status = res['data'][0][0].msg;
				this.admin_access_login = {};
				this.select_admin_access_login();
			}
			else
				this.admin_access_login_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	current_record_admin_access_login(rec){
		this.admin_access_login = rec;
		this.admin_access_login_status = '';
	}

	clear_admin_access_login(){
		this.admin_access_login = {};
		this.admin_access_login_status = '';
	}

}