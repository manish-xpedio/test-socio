import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-emailserverform',
	templateUrl: './emailserverform.component.html',
	styleUrls: ['./emailserverform.component.css']
})

export class EmailserverformComponent implements OnInit {
	@Output() parent_flag = new EventEmitter();


	admin_email_conf_status: string = '';
	admin_email_conf: any = {};
	admin_email_confList: any = [];

	constructor( private ds: DataService, private route: ActivatedRoute, private router: Router ){
	}

	ngOnInit() {
		this.parent_flag.emit(
			{
				comp_name: 'emailserverform',
				hide_side_menu: false,
				hide_login_btn: true,
				hide_logout_btn: false,
				content_name: 'main-content'
			}
		);
		this.route.queryParams
			.subscribe(params => {
			this.admin_email_conf['sysid'] = params.id;
		});
		this.select_admin_email_conf();
	}

	select_admin_email_conf(){
		this.admin_email_conf['action']='SELECT_ADMIN_EMAIL_CONF';
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.admin_email_conf,
				proc: 'admin_email_confOps'
			}
		})
		.subscribe(res => {
			this.admin_email_confList = res['data'][0];
			if (+this.admin_email_conf['sysid'] > 0){
				this.admin_email_conf = this.admin_email_confList[0];
			}
			else
				this.admin_email_conf = {};
		});
	}

	save_admin_email_conf(frm){
		if (!frm.form.valid){
			this.admin_email_conf_status = 'Fields indicated by * are mandatory.';
			return;
		}
		this.admin_email_conf['action']='SAVE_ADMIN_EMAIL_CONF';

		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.admin_email_conf,
				proc: 'admin_email_confOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.admin_email_conf_status = res['data'][0][0].msg;
				this.admin_email_conf = {};
				this.select_admin_email_conf();
			}
			else
				this.admin_email_conf_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	clear_admin_email_conf(){
		this.admin_email_conf = {};
		this.admin_email_conf_status = '';
	}

}