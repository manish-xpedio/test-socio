import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-visitorparkbook',
	templateUrl: './visitorparkbook.component.html',
	styleUrls: ['./visitorparkbook.component.css']
})

export class VisitorparkbookComponent implements OnInit {
	@Output() parent_flag = new EventEmitter();


	supp_parking_bookings_status: string = '';
	crm_membersList: any = [];
	supp_visitor_invitationList: any = [];
	admin_parkingsList: any = [];
	supp_parking_bookings: any = {};
	supp_parking_bookingsList: any = [];

	constructor( private ds: DataService, private route: ActivatedRoute, private router: Router ){
	}

	ngOnInit() {
		this.parent_flag.emit(
			{
				comp_name: 'visitorparkbook',
				hide_side_menu: false,
				hide_login_btn: true,
				hide_logout_btn: false,
				content_name: 'main-content'
			}
		);
		this.route.queryParams
			.subscribe(params => {
			this.supp_parking_bookings['sysid'] = params.id;
		});
		this.ref_select();
		this.select_supp_parking_bookings();
		this.supp_parking_bookings['from_date'] = this.ds.getJsonDate(this.supp_parking_bookings['from_date']);
		this.supp_parking_bookings['to_date'] = this.ds.getJsonDate(this.supp_parking_bookings['to_date']);

	}


	ref_select(){
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: {action: 'REF_SELECT'},
				proc: 'supp_parking_bookingsOps'
			}
		})
		.subscribe(res => {
			this.crm_membersList = res['data'][0];
			this.supp_visitor_invitationList = res['data'][1];
			this.admin_parkingsList = res['data'][2];
		});
	}
	
	update_status_booking(rec, m_status, frm) {
		this.supp_parking_bookings = rec;
		this.supp_parking_bookings['status'] = m_status;
		this.save_supp_parking_bookings(frm);
	}

	select_supp_parking_bookings(){
		this.supp_parking_bookings['action']='SELECT_SUPP_PARKING_BOOKINGS';
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.supp_parking_bookings,
				proc: 'supp_parking_bookingsOps'
			}
		})
		.subscribe(res => {
			this.supp_parking_bookingsList = res['data'][0];
			if (+this.supp_parking_bookings['sysid'] > 0){
				this.supp_parking_bookings = this.supp_parking_bookingsList[0];
			}
			else
				this.supp_parking_bookings = {};
		});
	}

	save_supp_parking_bookings(frm){
		if (!frm.form.valid){
			this.supp_parking_bookings_status = 'Fields indicated by * are mandatory.';
			return;
		}
		this.supp_parking_bookings['action']='SAVE_SUPP_PARKING_BOOKINGS';
		this.supp_parking_bookings['from_date'] = this.ds.getStringDate(this.supp_parking_bookings['from_date']);
		this.supp_parking_bookings['to_date'] = this.ds.getStringDate(this.supp_parking_bookings['to_date']);
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.supp_parking_bookings,
				proc: 'supp_parking_bookingsOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.supp_parking_bookings_status = res['data'][0][0].msg;
				this.supp_parking_bookings = {};
				this.select_supp_parking_bookings();
			}
			else
				this.supp_parking_bookings_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	delete_supp_parking_bookings(sysid){
		this.supp_parking_bookings['action']='DELETE_SUPP_PARKING_BOOKINGS';
		this.supp_parking_bookings['sysid']=sysid;
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.supp_parking_bookings,
				proc: 'supp_parking_bookingsOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.supp_parking_bookings_status = res['data'][0][0].msg;
				this.supp_parking_bookings = {};
				this.select_supp_parking_bookings();
			}
			else
				this.supp_parking_bookings_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	current_record_supp_parking_bookings(rec){
		this.supp_parking_bookings = rec;
		this.supp_parking_bookings_status = '';
	}

	clear_supp_parking_bookings(){
		this.supp_parking_bookings = {};
		this.supp_parking_bookings_status = '';
	}

}