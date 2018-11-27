import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-incidentvisit',
	templateUrl: './incidentvisit.component.html',
	styleUrls: ['./incidentvisit.component.css']
})

export class IncidentvisitComponent implements OnInit {
	@Output() parent_flag = new EventEmitter();
	crm_membersList: any = [];
	supp_visitor_incident_status: string = '';
	supp_visitor_incident: any = {};
	supp_visitor_incidentList: any = [];


	constructor( private ds: DataService, private route: ActivatedRoute, private router: Router ){
	}

	ngOnInit() {
		this.parent_flag.emit(
			{
				comp_name: 'incidentvisit',
				hide_side_menu: false,
				hide_login_btn: true,
				hide_logout_btn: false,
				content_name: 'main-content'
			}
		);

		this.route.queryParams
			.subscribe(params => {
				this.supp_visitor_incident['sysid'] = params.id;
			});

		this.ref_select();
		this.select_supp_visitor_incident();
	}

	ref_select(){
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: {action: 'REF_SELECT'},
				proc: 'supp_visitor_incidentOps'
			}
		})
		.subscribe(res => {
			this.crm_membersList = res['data'][0];
		});
	}

	select_supp_visitor_incident(){
		this.supp_visitor_incident['action']='SELECT_SUPP_VISITOR_INCIDENT';
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.supp_visitor_incident,
				proc: 'supp_visitor_incidentOps'
			}
		})
		.subscribe(res => {
			this.supp_visitor_incidentList = res['data'][0];
			if (+this.supp_visitor_incident['sysid'] > 0){
		this.supp_visitor_incident['inc_date'] = this.ds.getJsonDate(this.supp_visitor_incident['inc_date']);
				this.supp_visitor_incident = this.supp_visitor_incidentList[0];
			}
			else
				this.supp_visitor_incident = {};
		});
	}

	save_supp_visitor_incident(frm){
		if (!frm.form.valid){
			this.supp_visitor_incident_status = 'Fields indicated by * are mandatory.';
			return;
		}
		this.supp_visitor_incident['action']='SAVE_SUPP_VISITOR_INCIDENT';
		this.supp_visitor_incident['inc_date'] = this.ds.getStringDate(this.supp_visitor_incident['inc_date']);
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.supp_visitor_incident,
				proc: 'supp_visitor_incidentOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.supp_visitor_incident_status = res['data'][0][0].msg;
				this.supp_visitor_incident = {};
				this.select_supp_visitor_incident();
			}
			else
				this.supp_visitor_incident_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	delete_supp_visitor_incident(sysid){
		this.supp_visitor_incident['action']='DELETE_SUPP_VISITOR_INCIDENT';
		this.supp_visitor_incident['sysid']=sysid;
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.supp_visitor_incident,
				proc: 'supp_visitor_incidentOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.supp_visitor_incident_status = res['data'][0][0].msg;
				this.supp_visitor_incident = {};
				this.select_supp_visitor_incident();
			}
			else
				this.supp_visitor_incident_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	current_record_supp_visitor_incident(rec){
		this.supp_visitor_incident = rec;
		this.supp_visitor_incident_status = '';
	}

	clear_supp_visitor_incident(){
		this.supp_visitor_incident = {};
		this.supp_visitor_incident_status = '';
	}

}