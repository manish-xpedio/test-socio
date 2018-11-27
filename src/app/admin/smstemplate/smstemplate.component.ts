import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { _ } from '../../../../node_modules/underscore';

@Component({
	selector: 'app-smstemplate',
	templateUrl: './smstemplate.component.html',
	styleUrls: ['./smstemplate.component.css']
})

export class SmstemplateComponent implements OnInit {
	@Output() parent_flag = new EventEmitter();


	admin_sms_template_status: string = '';
	admin_sms_template: any = {};
	admin_sms_templateList: any = [];
	admin_email_sms_fieldsList: any = [];
	admin_email_sms_fields: any = {};

	constructor( private ds: DataService, private route: ActivatedRoute, private router: Router ){
	}

	ngOnInit() {
		this.parent_flag.emit(
			{
				comp_name: 'smstemplate',
				hide_side_menu: false,
				hide_login_btn: true,
				hide_logout_btn: false,
				content_name: 'main-content'
			}
		);
		this.route.queryParams
			.subscribe(params => {
			this.admin_sms_template['sysid'] = params.id;
		});
		this.ref_select();
		this.select_admin_sms_template();


	}


	ref_select(){
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: {action: 'REF_SELECT'},
				proc: 'admin_sms_templateOps'
			}
		})
		.subscribe(res => {
			this.admin_email_sms_fieldsList = res['data'][0];
		});
	}

	select_admin_sms_template(){
		this.admin_sms_template['action']='SELECT_ADMIN_SMS_TEMPLATE';
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.admin_sms_template,
				proc: 'admin_sms_templateOps'
			}
		})
		.subscribe(res => {
			this.admin_sms_templateList = res['data'][0];
			if (+this.admin_sms_template['sysid'] > 0){
				this.admin_sms_template = this.admin_sms_templateList[0];
			}
			else
				this.admin_sms_template = {};
		});
	}

	save_admin_sms_template(frm){
		if (!frm.form.valid){
			this.admin_sms_template_status = 'Fields indicated by * are mandatory.';
			return;
		}
		this.admin_sms_template['action']='SAVE_ADMIN_SMS_TEMPLATE';

		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.admin_sms_template,
				proc: 'admin_sms_templateOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.admin_sms_template_status = res['data'][0][0].msg;
				this.admin_sms_template = {};
				this.select_admin_sms_template();
			}
			else
				this.admin_sms_template_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	delete_admin_sms_template(sysid){
		if (sysid == undefined)
			return;
		this.admin_sms_template['action']='DELETE_ADMIN_SMS_TEMPLATE';
		this.admin_sms_template['sysid']=sysid;
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.admin_sms_template,
				proc: 'admin_sms_templateOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.admin_sms_template_status = res['data'][0][0].msg;
				this.admin_sms_template = {};
				this.select_admin_sms_template();
			}
			else
				this.admin_sms_template_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	current_record_admin_sms_template(id){
		this.admin_sms_template = _.where(this.admin_sms_templateList, {sysid: +id})[0];
		this.admin_sms_template['sms_verb'] = this.ds.textareaFormat(this.admin_sms_template['sms_verb']);
		this.admin_sms_template_status = '';
	}

	clear_admin_sms_template(){
		this.admin_sms_template = {};
		this.admin_sms_template_status = '';
	}

}