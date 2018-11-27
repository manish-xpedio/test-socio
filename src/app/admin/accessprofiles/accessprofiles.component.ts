import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-accessprofiles',
	templateUrl: './accessprofiles.component.html',
	styleUrls: ['./accessprofiles.component.css']
})

export class AccessprofilesComponent implements OnInit {
	@Output() parent_flag = new EventEmitter();


	admin_access_profile_status: string = '';
	admin_access_profile: any = {};
	admin_access_profileList: any = [];

	constructor( private ds: DataService, private route: ActivatedRoute, private router: Router ){
	}

	ngOnInit() {
		this.parent_flag.emit(
			{
				comp_name: 'accessprofiles',
				hide_side_menu: false,
				hide_login_btn: true,
				hide_logout_btn: false,
				content_name: 'main-content'
			}
		);
		this.route.queryParams
			.subscribe(params => {
			this.admin_access_profile['sysid'] = params.id;
		});
		this.ref_select();
		this.select_admin_access_profile();


	}


	ref_select(){
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: {action: 'REF_SELECT'},
				proc: 'admin_access_profileOps'
			}
		})
		.subscribe(res => {
		});
	}

	select_admin_access_profile(){
		this.admin_access_profile['action']='SELECT_ADMIN_ACCESS_PROFILE';
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.admin_access_profile,
				proc: 'admin_access_profileOps'
			}
		})
		.subscribe(res => {
			this.admin_access_profileList = res['data'][0];
			if (+this.admin_access_profile['sysid'] > 0){
				this.admin_access_profile = this.admin_access_profileList[0];
			}
			else
				this.admin_access_profile = {};
		});
	}

	save_admin_access_profile(frm){
		if (!frm.form.valid){
			this.admin_access_profile_status = 'Fields indicated by * are mandatory.';
			return;
		}
		this.admin_access_profile['action']='SAVE_ADMIN_ACCESS_PROFILE';

		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.admin_access_profile,
				proc: 'admin_access_profileOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.admin_access_profile_status = res['data'][0][0].msg;
				this.admin_access_profile = {};
				this.select_admin_access_profile();
			}
			else
				this.admin_access_profile_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	delete_admin_access_profile(sysid){
		this.admin_access_profile['action']='DELETE_ADMIN_ACCESS_PROFILE';
		this.admin_access_profile['sysid']=sysid;
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.admin_access_profile,
				proc: 'admin_access_profileOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.admin_access_profile_status = res['data'][0][0].msg;
				this.admin_access_profile = {};
				this.select_admin_access_profile();
			}
			else
				this.admin_access_profile_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	current_record_admin_access_profile(rec){
		this.admin_access_profile = rec;
		this.admin_access_profile_status = '';
	}

	clear_admin_access_profile(){
		this.admin_access_profile = {};
		this.admin_access_profile_status = '';
	}

}