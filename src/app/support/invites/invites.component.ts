import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-invites',
	templateUrl: './invites.component.html',
	styleUrls: ['./invites.component.css']
})

export class InvitesComponent implements OnInit {
	@Output() parent_flag = new EventEmitter();


	supp_visitor_invitation_status: string = '';
	crm_membersList: any = [];
	supp_visitor_invitation: any = {};
	supp_visitor_invitationList: any = [];
	side_menu_list: any = [];
	selected_invite = [];
	guests_list = [];

	constructor( private ds: DataService, private route: ActivatedRoute, private router: Router ){
	}

	ngOnInit() {
		this.parent_flag.emit(
			{
				comp_name: 'invites',
				hide_side_menu: false,
				hide_login_btn: true,
				hide_logout_btn: false,
				content_name: 'main-content'
			}
		);
		this.route.queryParams
			.subscribe(params => {
			this.supp_visitor_invitation['sysid'] = params.id;
		});
		this.side_menu_list = this.ds.getSidemenus(337);
		this.ref_select();
		this.select_supp_visitor_invitation();
		this.supp_visitor_invitation['request_date'] = this.ds.getJsonDate(this.supp_visitor_invitation['request_date']);
		this.supp_visitor_invitation['from_date'] = this.ds.getJsonDate(this.supp_visitor_invitation['from_date']);
		this.supp_visitor_invitation['to_date'] = this.ds.getJsonDate(this.supp_visitor_invitation['to_date']);

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
			this.guests_list = res['data'][1];
		});
	}
	
	get_selected_invite(rec) {
		//this.selected_invite = [];
		//this.selected_invite.push(rec);
		this.supp_visitor_invitation = rec;
		this.select_supp_visitor_invitation();
	}

	select_supp_visitor_invitation(){
		this.supp_visitor_invitation['action']='SELECT_SUPP_VISITOR_INVITATION';
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
				this.guests_list = res['data'][1];
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