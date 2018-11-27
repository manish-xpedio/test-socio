import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-smsc',
	templateUrl: './smsc.component.html',
	styleUrls: ['./smsc.component.css']
})

export class SmscComponent implements OnInit {
	@Output() parent_flag = new EventEmitter();


	admin_sms_conf_status: string = '';
	admin_sms_conf: any = {};
	admin_sms_confList: any = [];

	constructor( private ds: DataService, private route: ActivatedRoute, private router: Router ){
	}

	ngOnInit() {
		this.parent_flag.emit(
			{
				comp_name: 'smsc',
				hide_side_menu: false,
				hide_login_btn: true,
				hide_logout_btn: false,
				content_name: 'main-content'
			}
		);
		this.route.queryParams
			.subscribe(params => {
			this.admin_sms_conf['sysid'] = params.id;
		});
		this.ref_select();
		this.select_admin_sms_conf();


	}


	ref_select(){
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: {action: 'REF_SELECT'},
				proc: 'admin_sms_confOps'
			}
		})
		.subscribe(res => {
		});
	}

	select_admin_sms_conf(){
		this.admin_sms_conf['action']='SELECT_ADMIN_SMS_CONF';
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.admin_sms_conf,
				proc: 'admin_sms_confOps'
			}
		})
		.subscribe(res => {
			this.admin_sms_confList = res['data'][0];
			if (+this.admin_sms_conf['sysid'] > 0){
				this.admin_sms_conf = this.admin_sms_confList[0];
			}
			else
				this.admin_sms_conf = {};
		});
	}

	save_admin_sms_conf(frm){
		if (!frm.form.valid){
			this.admin_sms_conf_status = 'Fields indicated by * are mandatory.';
			return;
		}
		this.admin_sms_conf['action']='SAVE_ADMIN_SMS_CONF';

		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.admin_sms_conf,
				proc: 'admin_sms_confOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.admin_sms_conf_status = res['data'][0][0].msg;
				this.admin_sms_conf = {};
				this.select_admin_sms_conf();
			}
			else
				this.admin_sms_conf_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	delete_admin_sms_conf(sysid){
		this.admin_sms_conf['action']='DELETE_ADMIN_SMS_CONF';
		this.admin_sms_conf['sysid']=sysid;
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.admin_sms_conf,
				proc: 'admin_sms_confOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.admin_sms_conf_status = res['data'][0][0].msg;
				this.admin_sms_conf = {};
				this.select_admin_sms_conf();
			}
			else
				this.admin_sms_conf_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	current_record_admin_sms_conf(rec){
		this.admin_sms_conf = rec;
		this.admin_sms_conf_status = '';
	}

	clear_admin_sms_conf(){
		this.admin_sms_conf = {};
		this.admin_sms_conf_status = '';
	}

}