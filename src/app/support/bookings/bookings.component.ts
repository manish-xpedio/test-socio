import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import * as $ from 'jquery';
import { _ } from 'underscore';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})

export class BookingsComponent implements OnInit {
  @Output() parent_flag = new EventEmitter();
  calendarOptions: Options;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  @ViewChild('d5') d5_dlg: ElementRef;
  @ViewChild('all_bookings') ab: any;
  displayEvent: any;
  booking_data: any = [];
  selected_event: any = [];

	crm_event_bookings_status: string = '';
	crm_membersList: any = [];
	crm_event_bookings: any = {};
	crm_event_bookingsList: any = [];
	

  constructor(private ds: DataService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.parent_flag.emit(
      {
        comp_name: 'bookings',
        hide_side_menu: false,
        hide_login_btn: true,
        hide_logout_btn: false,
        content_name: 'main-content'
      }
    );

    this.calendarOptions = {
      editable: true,
      eventLimit: false,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay,listMonth'
      },
      selectable: true,
      events: this.booking_data
    };
		this.route.queryParams
			.subscribe(params => {
			this.crm_event_bookings['sysid'] = params.id;
		});
		this.ref_select();
		this.select_crm_event_bookings();
		this.crm_event_bookings['from_date'] = this.ds.getJsonDate(this.crm_event_bookings['from_date']);
		this.crm_event_bookings['to_date'] = this.ds.getJsonDate(this.crm_event_bookings['to_date']);
	
  }

  eventClick(model: any) {
    model = {
      event: {
        id: model.event.id,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title,
        allDay: model.event.allDay
        // other params
      },
      duration: {}
    }
    this.displayEvent = model;
    console.log(model);
    (<any>jQuery(this.d5_dlg.nativeElement)).modal('show');
    this.selected_event = _.where(this.crm_event_bookingsList, {sysid: model.event.id});
  }

  clickButton(model: any) {
    this.displayEvent = model;
    console.log('Button clicked..');
    console.log(model);
  }
  
  updateEvent(model: any){
  	console.log(model);
  }
  
  dayClick(model: any) {
    console.log(model.date.format('YYYY-MM-DD'));
    this.addEvent();
  }
  
  addEvent() {
  	let e = {
  		start: '2018-11-14',
  		end: '2018-11-15',
  		title: 'Clubhouse events'
  	}
  	//this.ucCalendar.fullCalendar('renderEvent', e);
  }


	ref_select(){
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: {action: 'REF_SELECT'},
				proc: 'crm_event_bookingsOps'
			}
		})
		.subscribe(res => {
			this.crm_membersList = res['data'][0];
		});
	}

	select_crm_event_bookings(){
		this.crm_event_bookings['action']='SELECT_CRM_EVENT_BOOKINGS';
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.crm_event_bookings,
				proc: 'crm_event_bookingsOps'
			}
		})
		.subscribe(res => {
			this.crm_event_bookingsList = res['data'][0];
			for(var i=0; i<this.crm_event_bookingsList.length; i++){
				this.booking_data.push(
					{
						id: this.crm_event_bookingsList[i]['sysid'],
						title: this.crm_event_bookingsList[i]['event_name'],
						start: this.crm_event_bookingsList[i]['from_date'],
						end: this.crm_event_bookingsList[i]['to_date']
					}
				);
				console.log(this.booking_data);
			}
			$('#ucCalendar').fullCalendar('renderEvents', this.booking_data, true);
			if (+this.crm_event_bookings['sysid'] > 0){
				this.crm_event_bookings = this.crm_event_bookingsList[0];
			}
			else
				this.crm_event_bookings = {};
		});
	}

	save_crm_event_bookings(frm){
		if (!frm.form.valid){
			this.crm_event_bookings_status = 'Fields indicated by * are mandatory.';
			return;
		}
		this.crm_event_bookings['action']='SAVE_CRM_EVENT_BOOKINGS';
		this.crm_event_bookings['from_date'] = this.ds.getStringDate(this.crm_event_bookings['from_date']);
		this.crm_event_bookings['to_date'] = this.ds.getStringDate(this.crm_event_bookings['to_date']);
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.crm_event_bookings,
				proc: 'crm_event_bookingsOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.crm_event_bookings_status = res['data'][0][0].msg;
				this.crm_event_bookings = {};
				this.select_crm_event_bookings();
			}
			else
				this.crm_event_bookings_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	delete_crm_event_bookings(sysid){
		this.crm_event_bookings['action']='DELETE_CRM_EVENT_BOOKINGS';
		this.crm_event_bookings['sysid']=sysid;
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.crm_event_bookings,
				proc: 'crm_event_bookingsOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.crm_event_bookings_status = res['data'][0][0].msg;
				this.crm_event_bookings = {};
				this.select_crm_event_bookings();
			}
			else
				this.crm_event_bookings_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	current_record_crm_event_bookings(rec){
		this.crm_event_bookings = rec;
		this.crm_event_bookings_status = '';
	}

	clear_crm_event_bookings(){
		this.crm_event_bookings = {};
		this.crm_event_bookings_status = '';
	}
	
}

