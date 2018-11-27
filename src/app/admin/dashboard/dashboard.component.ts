import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart } from 'chart.js';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
	@Output() parent_flag = new EventEmitter();
	sr_list: any = [];
	chart = [];
	el_chart = [];

	constructor( private ds: DataService, private route: ActivatedRoute, private router: Router ){
	}

	ngOnInit() {
		this.parent_flag.emit(
			{
				comp_name: 'dashboard',
				hide_side_menu: false,
				hide_login_btn: true,
				hide_logout_btn: false,
				content_name: 'main-content'
			}
		);
		
		this.sr_list = [
			{
				sr_no: 12354,
				sr_descr: 'Water leakage from terrace in B6-403',
				sr_type: 'Complaint'
			},
			{
				sr_no: 12355,
				sr_descr: 'Please share my maintenence account details for year 2016-17',
				sr_type: 'Request'
			},
			{
				sr_no: 12356,
				sr_descr: 'No hot water for B1, B2, B3 and B4 since last week',
				sr_type: 'Complaint'
			},
			{
				sr_no: 12357,
				sr_descr: 'What is club house booking policy? Please update',
				sr_type: 'Enquiry'
			},
			{
				sr_no: 12358,
				sr_descr: 'Can I make volutenry payments to my account for this year?',
				sr_type: 'Enquiry'
			},
		]
		
		this.chart = new Chart('myChart', {
			type: 'bar',
			data: {
				labels: ['Jun-18','Jul-18','Aug-18','Sep-18','Oct-18','Nov-18'],
				datasets: [
					{
						label: 'Tickets raised',
						data: [43,104,78,30,17,231],
						borderColor: '#2E86C1',
						backgroundColor: '#2E86C1',
						fill: false
					}
				]
			},
			options: {
				legend: {
					display: true
				}
			}
		
		});
		
		this.el_chart = new Chart('elChart', {
			type: 'line',
			data: {
				labels: ['Jun-18','Jul-18','Aug-18','Sep-18','Oct-18','Nov-18'],
				datasets: [
					{
						label: 'Bills received',
						data: [43112,39512, 38996, 44129, 45200, 36703],
						borderColor: '#c70039'
					}
				]
			},
			options: {
				legend: {
					display: true
				}
			}
		
		});
	}

}