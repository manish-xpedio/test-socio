import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
 import { Chart } from 'chart.js';

@Component({
	selector: 'app-srmgmt',
	templateUrl: './srmgmt.component.html',
	styleUrls: ['./srmgmt.component.css']
})

export class SrmgmtComponent implements OnInit {
	@Output() parent_flag = new EventEmitter();
	
	chart: any = [];


	constructor( private ds: DataService, private route: ActivatedRoute, private router: Router ){
	}

	ngOnInit() {
		this.parent_flag.emit(
			{
				comp_name: 'srmgmt',
				hide_side_menu: false,
				hide_login_btn: true,
				hide_logout_btn: false,
				content_name: 'main-content'
			}
		);
		
		this.chart = new Chart('myChart', {
			type: 'line',
			data: {
				labels: ['Jun-18','Jul-18','Aug-18','Sep-18','Oct-18','Nov-18'],
				datasets: [
					{
						label: 'Tickets raised',
						data: [3,9,8,0,7,4,3],
						borderColor: '#c70039',
						fill: false
					},
					{
						label: 'Closed tickets',
						data: [1,9,5,0,2,1,2],
						borderColor: '#ffcc00',
						fill: false
					},
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