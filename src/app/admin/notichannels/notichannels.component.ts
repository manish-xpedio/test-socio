import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-notichannels',
	templateUrl: './notichannels.component.html',
	styleUrls: ['./notichannels.component.css']
})

export class NotichannelsComponent implements OnInit {
	@Output() parent_flag = new EventEmitter();


	admin_noti_channels_status: string = '';
	admin_email_templateList: any = [];
	admin_sms_templateList: any = [];
	admin_noti_channels: any = {};
	admin_noti_channelsList: any = [];

	constructor( private ds: DataService, private route: ActivatedRoute, private router: Router ){
	}

	ngOnInit() {
		this.parent_flag.emit(
			{
				comp_name: 'notichannels',
				hide_side_menu: false,
				hide_login_btn: true,
				hide_logout_btn: false,
				content_name: 'main-content'
			}
		);
		this.route.queryParams
			.subscribe(params => {
			this.admin_noti_channels['sysid'] = params.id;
		});
		this.ref_select();
		this.select_admin_noti_channels();


	}


	ref_select(){
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: {action: 'REF_SELECT'},
				proc: 'admin_noti_channelsOps'
			}
		})
		.subscribe(res => {
			this.admin_email_templateList = res['data'][0];
			this.admin_sms_templateList = res['data'][1];
		});
	}

	select_admin_noti_channels(){
		this.admin_noti_channels['action']='SELECT_ADMIN_NOTI_CHANNELS';
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.admin_noti_channels,
				proc: 'admin_noti_channelsOps'
			}
		})
		.subscribe(res => {
			this.admin_noti_channelsList = res['data'][0];
			if (+this.admin_noti_channels['sysid'] > 0){
				this.admin_noti_channels = this.admin_noti_channelsList[0];
			}
			else
				this.admin_noti_channels = {};
		});
	}

	save_admin_noti_channels(frm){
		if (!frm.form.valid){
			this.admin_noti_channels_status = 'Fields indicated by * are mandatory.';
			return;
		}
		this.admin_noti_channels['action']='SAVE_ADMIN_NOTI_CHANNELS';

		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.admin_noti_channels,
				proc: 'admin_noti_channelsOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.admin_noti_channels_status = res['data'][0][0].msg;
				this.admin_noti_channels = {};
				this.select_admin_noti_channels();
			}
			else
				this.admin_noti_channels_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	delete_admin_noti_channels(sysid){
		this.admin_noti_channels['action']='DELETE_ADMIN_NOTI_CHANNELS';
		this.admin_noti_channels['sysid']=sysid;
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.admin_noti_channels,
				proc: 'admin_noti_channelsOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.admin_noti_channels_status = res['data'][0][0].msg;
				this.admin_noti_channels = {};
				this.select_admin_noti_channels();
			}
			else
				this.admin_noti_channels_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	current_record_admin_noti_channels(rec){
		this.admin_noti_channels = rec;
		this.admin_noti_channels_status = '';
	}

	clear_admin_noti_channels(){
		this.admin_noti_channels = {};
		this.admin_noti_channels_status = '';
	}

}