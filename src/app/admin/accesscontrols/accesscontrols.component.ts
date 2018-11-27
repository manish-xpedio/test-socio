import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
 import { _ } from '../../../../node_modules/underscore';

@Component({
	selector: 'app-accesscontrols',
	templateUrl: './accesscontrols.component.html',
	styleUrls: ['./accesscontrols.component.css']
})

export class AccesscontrolsComponent implements OnInit {
	@Output() parent_flag = new EventEmitter();
	
	access_control_status: string = '';
	admin_access_control: any = {};
	access: any = {};
	admin_access_profileList: any = [];
	sys_menusList: any = [];
	temp_sys_menusList: any = [];
	main_menu_id: any;
	main_menu_name: string;
	
	profile_menuList: any = [];
	profile_main_menuList: any = [];
	profile_sub_menuList: any = [];

	hideMainButton: boolean = true;
	hideSubButton: boolean = true;


	constructor( private ds: DataService, private route: ActivatedRoute ){
	}

	ngOnInit() {
		this.parent_flag.emit(
			{
				comp_name: 'accesscontrols',
				hide_side_menu: false,
				hide_login_btn: true,
				hide_logout_btn: false,
				content_name: 'main-content'
			}
		);
		this.select_ref_record();
	}

	select_ref_record(){
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: {action: 'REF_SELECT'},
				proc: 'admin_access_controlOps'
			}
		})
		.subscribe(res => {
			this.admin_access_profileList = res['data'][0];
			this.sys_menusList = res['data'][1];
			this.temp_sys_menusList = res['data'][1];
			console.log(this.sys_menusList);
		});
	}
		
	getProfileDetails(prof_id){
		this.getProfileMenus(prof_id);
		this.main_menu_id = '';
		this.main_menu_name = '';
		this.hideSubButton = true;
		this.profile_sub_menuList = [];
		this.access_control_status = '';
	}

	getProfileMenus(prof_id){
		if (prof_id > 0){
			this.hideMainButton = false;
			this.admin_access_control['profile_id'] = prof_id;
		}
		else {
			this.hideMainButton = true;
			this.admin_access_control['profile_id'] = -1;
		}
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: {action: 'PROFILE_MENUS', profile_id: prof_id},
				proc: 'admin_access_controlOps'
			}
		})
		.subscribe(res => {
			this.profile_menuList = res['data'][0];
			this.profile_main_menuList = _.where(this.profile_menuList, {menu_type: 0});
			if (this.main_menu_id > 0)
				this.profile_sub_menuList = _.where(this.profile_menuList, {parent_id: +this.main_menu_id, menu_type: 1}); 
		});
	}

	addMainMenu(){
		this.admin_access_control = { profile_id: this.access.profile_id };
		this.access_control_status = '';
		this.sys_menusList = _.where(this.temp_sys_menusList, {menu_type: 0});
	}

	addSubMenu(){
		this.admin_access_control = { profile_id: this.access.profile_id };
		this.access_control_status = '';
		this.sys_menusList = _.where(this.temp_sys_menusList, {parent_id: this.main_menu_id, menu_type: 1});
	}

	save_admin_access_control(){
		if (this.admin_access_control['profile_id'] == undefined || this.admin_access_control['profile_id'] == ''){
			this.access_control_status = 'Profile ID is mandetory. Please select correct profile';
			return;
		}
		if (this.admin_access_control['menu_id'] == undefined || this.admin_access_control['menu_id'] == ''){
			this.access_control_status = 'Menu name is mandetory. Please select correct menu';
			return;
		}
		if (this.admin_access_control['access_type'] == undefined || this.admin_access_control['access_type'] == ''){
			this.access_control_status = 'Access type is mandetory. Please select correct access type';
			return;
		}
		this.admin_access_control['action'] = 'SAVE_ADMIN_ACCESS_CONTROL';
		
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.admin_access_control,
				proc: 'admin_access_controlOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.access_control_status = res['data'][0][0].msg;
				this.admin_access_control = { 
					profile_id: this.admin_access_control['profile_id'],
					access_type: this.admin_access_control['access_type']
				};
				this.getProfileMenus(this.admin_access_control['profile_id']);
			}
			else
				this.access_control_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	selectMainMenu(rec){
		this.main_menu_id = rec['menu_id'];
		this.main_menu_name = rec['menu_name'];
		this.admin_access_control = rec;
		this.sys_menusList = _.where(this.temp_sys_menusList, {parent_id: +rec['menu_id'], menu_type: 1});
		this.profile_sub_menuList = _.where(this.profile_menuList, {parent_id: +rec['menu_id'], menu_type: 1}); 

		if (this.main_menu_id == '' || this.main_menu_id == undefined || this.main_menu_id == 0)
			this.hideSubButton = true;
		else
			this.hideSubButton = false;
	}

	delete_admin_access_control(id){
		this.admin_access_control['sysid'] = id;
		this.admin_access_control['action'] = 'DELETE_ADMIN_ACCESS_CONTROL';
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.admin_access_control,
				proc: 'admin_access_controlOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.access_control_status = res['data'][0][0].msg;
				this.getProfileMenus(this.admin_access_control['profile_id']);
			}
			else
				this.access_control_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

}