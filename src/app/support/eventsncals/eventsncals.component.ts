import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-eventsncals',
	templateUrl: './eventsncals.component.html',
	styleUrls: ['./eventsncals.component.css']
})

export class EventsncalsComponent implements OnInit {
	@Output() parent_flag = new EventEmitter();


	supp_cultural_events_status: string = '';
	supp_cultural_events: any = {};
	supp_cultural_eventsList: any = [];

	constructor( private ds: DataService, private route: ActivatedRoute, private router: Router ){
	}

	ngOnInit() {
		this.parent_flag.emit(
			{
				comp_name: 'eventsncals',
				hide_side_menu: false,
				hide_login_btn: true,
				hide_logout_btn: false,
				content_name: 'main-content'
			}
		);
		this.route.queryParams
			.subscribe(params => {
			this.supp_cultural_events['sysid'] = params.id;
		});
		this.ref_select();
		this.select_supp_cultural_events();
		this.supp_cultural_events['event_from_date'] = this.ds.getJsonDate(this.supp_cultural_events['event_from_date']);
		this.supp_cultural_events['event_to_date'] = this.ds.getJsonDate(this.supp_cultural_events['event_to_date']);

	}


	ref_select(){
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: {action: 'REF_SELECT'},
				proc: 'supp_cultural_eventsOps'
			}
		})
		.subscribe(res => {
		});
	}

	select_supp_cultural_events(){
		this.supp_cultural_events['action']='SELECT_SUPP_CULTURAL_EVENTS';
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.supp_cultural_events,
				proc: 'supp_cultural_eventsOps'
			}
		})
		.subscribe(res => {
			this.supp_cultural_eventsList = res['data'][0];
			if (+this.supp_cultural_events['sysid'] > 0){
				this.supp_cultural_events = this.supp_cultural_eventsList[0];
			}
			else
				this.supp_cultural_events = {};
		});
	}

	save_supp_cultural_events(frm){
		if (!frm.form.valid){
			this.supp_cultural_events_status = 'Fields indicated by * are mandatory.';
			return;
		}
		this.supp_cultural_events['action']='SAVE_SUPP_CULTURAL_EVENTS';
		this.supp_cultural_events['event_from_date'] = this.ds.getStringDate(this.supp_cultural_events['event_from_date']);
		this.supp_cultural_events['event_to_date'] = this.ds.getStringDate(this.supp_cultural_events['event_to_date']);
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.supp_cultural_events,
				proc: 'supp_cultural_eventsOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.supp_cultural_events_status = res['data'][0][0].msg;
				this.supp_cultural_events = {};
				this.select_supp_cultural_events();
			}
			else
				this.supp_cultural_events_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	delete_supp_cultural_events(sysid){
		this.supp_cultural_events['action']='DELETE_SUPP_CULTURAL_EVENTS';
		this.supp_cultural_events['sysid']=sysid;
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.supp_cultural_events,
				proc: 'supp_cultural_eventsOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.supp_cultural_events_status = res['data'][0][0].msg;
				this.supp_cultural_events = {};
				this.select_supp_cultural_events();
			}
			else
				this.supp_cultural_events_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	current_record_supp_cultural_events(rec){
		this.supp_cultural_events = rec;
		this.supp_cultural_events_status = '';
	}

	clear_supp_cultural_events(){
		this.supp_cultural_events = {};
		this.supp_cultural_events_status = '';
	}

}