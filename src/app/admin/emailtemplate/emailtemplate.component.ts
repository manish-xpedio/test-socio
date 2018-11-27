import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { _ } from '../../../../node_modules/underscore';

@Component({
	selector: 'app-emailtemplate',
	templateUrl: './emailtemplate.component.html',
	styleUrls: ['./emailtemplate.component.css']
})

export class EmailtemplateComponent implements OnInit {
	@Output() parent_flag = new EventEmitter();


	admin_email_template_status: string = '';
	admin_email_template: any = {};
	admin_email_templateList: any = [];
	admin_email_sms_fieldsList: any = [];
	admin_email_sms_fields: any = {};

	constructor( private ds: DataService, private route: ActivatedRoute, private router: Router ){
	}

	ngOnInit() {
		this.parent_flag.emit(
			{
				comp_name: 'emailtemplate',
				hide_side_menu: false,
				hide_login_btn: true,
				hide_logout_btn: false,
				content_name: 'main-content'
			}
		);
		
		this.route.queryParams
			.subscribe(params => {
			this.admin_email_template['sysid'] = params.id;
		});
		this.ref_select();
		this.select_admin_email_template();


	}


	ref_select(){
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: {action: 'REF_SELECT'},
				proc: 'admin_email_templateOps'
			}
		})
		.subscribe(res => {
			this.admin_email_sms_fieldsList = res['data'][0];
		});
	}

	select_admin_email_template(){
		this.admin_email_template['action']='SELECT_ADMIN_EMAIL_TEMPLATE';
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.admin_email_template,
				proc: 'admin_email_templateOps'
			}
		})
		.subscribe(res => {
			this.admin_email_templateList = res['data'][0];
			if (+this.admin_email_template['sysid'] > 0){
				this.admin_email_template = this.admin_email_templateList[0];
			}
			else
				this.admin_email_template = {};
		});
	}
	

	save_admin_email_template(frm){
		if (!frm.form.valid){
			this.admin_email_template_status = 'Fields indicated by * are mandatory.';
			return;
		}
		this.admin_email_template['action']='SAVE_ADMIN_EMAIL_TEMPLATE';
		this.admin_email_template['temp_data'] = this.ds.textareaFormat(this.admin_email_template['temp_data']);

		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.admin_email_template,
				proc: 'admin_email_templateOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.admin_email_template_status = res['data'][0][0].msg;
				this.admin_email_template = {};
				this.select_admin_email_template();
			}
			else
				this.admin_email_template_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	delete_admin_email_template(sysid){
		this.admin_email_template['action']='DELETE_ADMIN_EMAIL_TEMPLATE';
		this.admin_email_template['sysid']=sysid;
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.admin_email_template,
				proc: 'admin_email_templateOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.admin_email_template_status = res['data'][0][0].msg;
				this.admin_email_template = {};
				this.select_admin_email_template();
			}
			else
				this.admin_email_template_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	current_record_admin_email_template(id){
		this.admin_email_template = _.where(this.admin_email_templateList, {sysid: +id})[0];
		this.admin_email_template['temp_data'] = this.ds.textareaFormat(this.admin_email_template['temp_data']);
		this.admin_email_template_status = '';
	}

	clear_admin_email_template(){
		this.admin_email_template = {};
		this.admin_email_template_status = '';
	}

}