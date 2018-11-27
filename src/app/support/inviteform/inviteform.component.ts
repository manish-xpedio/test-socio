import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-inviteform',
	templateUrl: './inviteform.component.html',
	styleUrls: ['./inviteform.component.css']
})

export class InviteformComponent implements OnInit {
	@Output() parent_flag = new EventEmitter();
	side_menu_list: any = [];


	supp_visitor_invitation_status: string = '';
	crm_membersList: any = [];
	supp_visitor_invitation: any = {};
	supp_visitor_invitationList: any = [];
	supp_visitor_master_listList: any = [];
	vlist: any = [];
	visitor: any = {};
	supp_invited_visitors_status: string = '';
	supp_invited_visitors: any = {};
	supp_invited_visitorsList: any = [];

	constructor( private ds: DataService, private route: ActivatedRoute, private router: Router ){
	}

	ngOnInit() {
		this.parent_flag.emit(
			{
				comp_name: 'inviteform',
				hide_side_menu: false,
				hide_login_btn: true,
				hide_logout_btn: false,
				content_name: 'main-content'
			}
		);
		this.side_menu_list = this.ds.getSidemenus(337);
		this.route.queryParams
			.subscribe(params => {
			console.log(params);
			this.supp_visitor_invitation['sysid'] = params.sysid;
		});
		this.ref_select();
		this.select_supp_visitor_invitation();
		this.supp_visitor_invitation['request_date'] = this.ds.getJsonDate(this.supp_visitor_invitation['request_date']);
		this.supp_visitor_invitation['from_date'] = this.ds.getJsonDate(this.supp_visitor_invitation['from_date']);
		this.supp_visitor_invitation['to_date'] = this.ds.getJsonDate(this.supp_visitor_invitation['to_date']);

	}
	
	add_to_vlist(rec){
		if (this.supp_visitor_invitation['sysid']==undefined){
			this.supp_invited_visitors_status = 'Please create invite before adding visitors. No saving visitors..';
			return;
		}
		this.supp_invited_visitors['req_id'] = this.supp_visitor_invitation['sysid'];
		this.supp_invited_visitors['person_name'] = rec['person_name'];
		this.supp_invited_visitors['phone1'] = rec['phone1']; 		
		console.log(this.supp_invited_visitors);
	}
	
	select_supp_invited_visitors(id){
		this.supp_invited_visitors['req_id']= id;
		this.supp_invited_visitors['action']= 'SELECT_SUPP_INVITED_VISITORS';
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.supp_invited_visitors,
				proc: 'supp_invited_visitorsOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				console.log(res['data'][0]);
				this.supp_invited_visitorsList = res['data'][0];
			}
			else
				this.supp_invited_visitors_status = res['error']['sqlMessage'].substring(0,99);
		});
		this.supp_invited_visitors_status = '';
	}
	
	save_supp_invited_visitors() {
		this.supp_invited_visitors['status']= 'Requested';
		this.supp_invited_visitors['action']= 'SAVE_SUPP_INVITED_VISITORS';
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.supp_invited_visitors,
				proc: 'supp_invited_visitorsOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.supp_invited_visitors = {};
				this.select_supp_invited_visitors(this.supp_visitor_invitation['sysid']);
				this.supp_invited_visitors_status = res['data'][0][0].msg;
			}
			else
				this.supp_invited_visitors_status = res['error']['sqlMessage'].substring(0,99);
		});
	}
	
	delete_supp_invited_visitors(sysid){
		console.log(sysid);
		this.supp_invited_visitors['sysid']= sysid;
		this.supp_invited_visitors['action']= 'DELETE_SUPP_INVITED_VISITORS';
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.supp_invited_visitors,
				proc: 'supp_invited_visitorsOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.supp_invited_visitors_status = res['data'][0][0].msg;
				this.supp_invited_visitors = {};
				this.select_supp_invited_visitors(this.supp_visitor_invitation['sysid']);
			}
			else
				this.supp_invited_visitors_status = res['error']['sqlMessage'].substring(0,99);
		});
	}


	ref_select(){
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: {action: 'REF_SELECT'},
				proc: 'supp_visitor_invitationOps'
			}
		})
		.subscribe(res => {
			this.crm_membersList = res['data'][0];
			this.supp_visitor_master_listList = res['data'][1];
		});
	}

	select_supp_visitor_invitation(){
		this.supp_visitor_invitation['action']='SELECT_SUPP_VISITOR_INVITATION';
		console.log(this.supp_visitor_invitation);
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.supp_visitor_invitation,
				proc: 'supp_visitor_invitationOps'
			}
		})
		.subscribe(res => {
			this.supp_visitor_invitationList = res['data'][0];
			if (+this.supp_visitor_invitation['sysid'] > 0){
				this.supp_visitor_invitation = this.supp_visitor_invitationList[0];
				this.supp_invited_visitorsList = res['data'][1];
			}
			else
				this.supp_visitor_invitation = {};
		});
	}

	save_supp_visitor_invitation(frm){
		if (!frm.form.valid){
			this.supp_visitor_invitation_status = 'Fields indicated by * are mandatory.';
			return;
		}
		this.supp_visitor_invitation['action']='SAVE_SUPP_VISITOR_INVITATION';
		this.supp_visitor_invitation['request_date'] = this.ds.getStringDate(this.supp_visitor_invitation['request_date']);
		this.supp_visitor_invitation['from_date'] = this.ds.getStringDate(this.supp_visitor_invitation['from_date']);
		this.supp_visitor_invitation['to_date'] = this.ds.getStringDate(this.supp_visitor_invitation['to_date']);
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.supp_visitor_invitation,
				proc: 'supp_visitor_invitationOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.supp_visitor_invitation_status = res['data'][0][0].msg;
				this.supp_visitor_invitation = {};
				this.select_supp_visitor_invitation();
			}
			else
				this.supp_visitor_invitation_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	delete_supp_visitor_invitation(sysid){
		this.supp_visitor_invitation['action']='DELETE_SUPP_VISITOR_INVITATION';
		this.supp_visitor_invitation['sysid']=sysid;
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.supp_visitor_invitation,
				proc: 'supp_visitor_invitationOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.supp_visitor_invitation_status = res['data'][0][0].msg;
				this.supp_visitor_invitation = {};
				this.select_supp_visitor_invitation();
			}
			else
				this.supp_visitor_invitation_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	current_record_supp_visitor_invitation(rec){
		this.supp_visitor_invitation = rec;
		this.supp_visitor_invitation_status = '';
	}

	clear_supp_visitor_invitation(){
		this.supp_visitor_invitation = {};
		this.supp_visitor_invitation_status = '';
	}

}