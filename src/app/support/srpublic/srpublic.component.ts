import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-srpublic',
	templateUrl: './srpublic.component.html',
	styleUrls: ['./srpublic.component.css']
})

export class SrpublicComponent implements OnInit {
	@Output() parent_flag = new EventEmitter();
	public_srList: any = [];


	constructor( private ds: DataService, private route: ActivatedRoute, private router: Router ){
	}

	ngOnInit() {
		this.parent_flag.emit(
			{
				comp_name: 'srpublic',
				hide_side_menu: false,
				hide_login_btn: true,
				hide_logout_btn: false,
				content_name: 'main-content'
			}
		);
		
		this.public_srList = [
			{
				sr_title: 'Security guard not found post midnight at main gate',
				sr_create_date: '2018-11-01 16:41',
				sr_text: 'It is found that security guard at main gate was missing when I entered the premised yesterday midnight. This is big security lapse and needs to be handled atmost priority'
			},
			{
				sr_title: 'No hot water in B8 building',
				sr_create_date: '2018-10-29 11:06',
				sr_text: 'Since last two days we are not getting hot water. Sometime we get cold water in that outlet and that too with very low pressure. This might be issue with solar system of the building. Request to look into this.'
			},
		]
	}

}