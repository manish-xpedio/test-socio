import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-errdict',
	templateUrl: './errdict.component.html',
	styleUrls: ['./errdict.component.css']
})

export class ErrdictComponent implements OnInit {
	@Output() parent_flag = new EventEmitter();


	admin_err_dict_status: string = '';
	admin_err_dict: any = {err_type: 'Custom'};
	admin_err_dictList: any = [];

	constructor( private ds: DataService, private route: ActivatedRoute, private router: Router ){
	}

	ngOnInit() {
		this.parent_flag.emit(
			{
				comp_name: 'errdict',
				hide_side_menu: false,
				hide_login_btn: true,
				hide_logout_btn: false,
				content_name: 'main-content'
			}
		);
		this.route.queryParams
			.subscribe(params => {
			this.admin_err_dict['sysid'] = params.id;
		});
		this.ref_select();
		this.select_admin_err_dict();
		this.admin_err_dict = {err_type: 'Custom'};
	}


	ref_select(){
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: {action: 'REF_SELECT'},
				proc: 'admin_err_dictOps'
			}
		})
		.subscribe(res => {
		});
	}

	select_admin_err_dict(){
		this.admin_err_dict['action']='SELECT_ADMIN_ERR_DICT';
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.admin_err_dict,
				proc: 'admin_err_dictOps'
			}
		})
		.subscribe(res => {
			this.admin_err_dictList = res['data'][0];
			if (+this.admin_err_dict['sysid'] > 0){
				this.admin_err_dict = this.admin_err_dictList[0];
			}
			else
				this.admin_err_dict = {};
		});
	}

	save_admin_err_dict(frm){
		if (!frm.form.valid){
			this.admin_err_dict_status = 'Fields indicated by * are mandatory.';
			return;
		}
		this.admin_err_dict['action']='SAVE_ADMIN_ERR_DICT';

		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.admin_err_dict,
				proc: 'admin_err_dictOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.admin_err_dict_status = res['data'][0][0].msg;
				this.admin_err_dict = {};
				this.select_admin_err_dict();
			}
			else
				this.admin_err_dict_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	delete_admin_err_dict(sysid){
		this.admin_err_dict['action']='DELETE_ADMIN_ERR_DICT';
		this.admin_err_dict['sysid']=sysid;
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.admin_err_dict,
				proc: 'admin_err_dictOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.admin_err_dict_status = res['data'][0][0].msg;
				this.admin_err_dict = {};
				this.select_admin_err_dict();
			}
			else
				this.admin_err_dict_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	current_record_admin_err_dict(rec){
		this.admin_err_dict = rec;
		this.admin_err_dict_status = '';
	}

	clear_admin_err_dict(){
		this.admin_err_dict = {};
		this.admin_err_dict_status = '';
	}

}