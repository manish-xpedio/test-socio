import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-carousel',
	templateUrl: './carousel.component.html',
	styleUrls: ['./carousel.component.css']
})

export class CarouselComponent implements OnInit {
	@Output() parent_flag = new EventEmitter();
	m_file_name1: File;
	m_file_name2: File;
	m_file_name3: File;
	m_file_name4: File;
	img_name1: string = '/assets/caro1.png?';
	img_name2: string = '/assets/caro2.png?';
	img_name3: string = '/assets/caro3.png?';
	img_name4: string = '/assets/caro4.png?';
	img1_status: string = '';
	img2_status: string = '';
	img3_status: string = '';
	img4_status: string = '';
	btn1_disable: boolean = true;
	btn2_disable: boolean = true;
	btn3_disable: boolean = true;
	btn4_disable: boolean = true;
	lb_color1: string = '#000';
	lb_color2: string = '#000';
	lb_color3: string = '#000';
	lb_color4: string = '#000';


	constructor( private ds: DataService, private route: ActivatedRoute, private router: Router ){
	}

	ngOnInit() {
		this.parent_flag.emit(
			{
				comp_name: 'carousel',
				hide_side_menu: false,
				hide_login_btn: true,
				hide_logout_btn: false,
				content_name: 'main-content'
			}
		);
		this.img_name1 += + new Date().getTime();
		this.img_name2 += + new Date().getTime();
		this.img_name3 += + new Date().getTime();
		this.img_name4 += + new Date().getTime();
	}
	
	selected_file_1(file_name){
    	this.m_file_name1 = file_name;
		if (this.m_file_name1[0] == undefined){
			this.btn1_disable = true;
			return;
		}
		
		if (this.m_file_name1[0].name == '' || this.m_file_name1[0].name == undefined){
			this.btn1_disable = true;
			return;
		}

		if (Math.round(this.m_file_name1[0].size/1024) > 500){
			this.img1_status = 'Maximum allowed size is 500KB. Current size is ' + Math.round(this.m_file_name1[0].size/1024) + ' KB';
			this.lb_color1 = '#ff0000';
			return;
		}
		var reader = new FileReader();
		reader.onload = (event: any) => {
			this.img_name1 = event.target.result;
		}
		reader.readAsDataURL(this.m_file_name1[0]);
		this.img1_status = 'Size: ' + Math.round(this.m_file_name1[0].size/1024)+' KB';
		this.btn1_disable = false;
		this.lb_color1 = '#000';
  	}

  	upload_file_1(){
    	this.ds.pushFileToStorage(this.m_file_name1[0], { img_name: 'caro1.png' }).subscribe(event => {
			this.img1_status = 'Image was uploaded successfully.';
			setTimeout(()=> { this.img1_status = ''; }, 5000);
     	});
  	}

	selected_file_2(file_name){
    	this.m_file_name2 = file_name;
		if (this.m_file_name2[0] == undefined){
			this.btn2_disable = true;
			return;
		}
		
		if (this.m_file_name2[0].name == '' || this.m_file_name2[0].name == undefined){
			this.btn2_disable = true;
			return;
		}

		if (Math.round(this.m_file_name2[0].size/1024) > 500){
			this.img2_status = 'Maximum allowed size is 500KB. Current size is ' + Math.round(this.m_file_name2[0].size/1024) + ' KB';
			this.lb_color1 = '#ff0000';
			return;
		}
		var reader = new FileReader();
		reader.onload = (event: any) => {
			this.img_name2 = event.target.result;
		}
		reader.readAsDataURL(this.m_file_name2[0]);
		this.img2_status = 'Size: ' + Math.round(this.m_file_name2[0].size/1024)+' KB';
		this.btn2_disable = false;
		this.lb_color1 = '#000';
  	}

  	upload_file_2(){
    	this.ds.pushFileToStorage(this.m_file_name2[0], { img_name: 'caro2.png' }).subscribe(event => {
			this.img2_status = 'Image was uploaded successfully.';
			setTimeout(()=> { this.img2_status = ''; }, 5000);
     	});
  	}

	selected_file_3(file_name){
    	this.m_file_name3 = file_name;
		if (this.m_file_name3[0] == undefined){
			this.btn3_disable = true;
			return;
		}
		
		if (this.m_file_name3[0].name == '' || this.m_file_name3[0].name == undefined){
			this.btn3_disable = true;
			return;
		}

		if (Math.round(this.m_file_name3[0].size/1024) > 500){
			this.img3_status = 'Maximum allowed size is 500KB. Current size is ' + Math.round(this.m_file_name3[0].size/1024) + ' KB';
			this.lb_color1 = '#ff0000';
			return;
		}
		var reader = new FileReader();
		reader.onload = (event: any) => {
			this.img_name3 = event.target.result;
		}
		reader.readAsDataURL(this.m_file_name3[0]);
		this.img3_status = 'Size: ' + Math.round(this.m_file_name3[0].size/1024)+' KB';
		this.btn3_disable = false;
		this.lb_color1 = '#000';
  	}

  	upload_file_3(){
    	this.ds.pushFileToStorage(this.m_file_name3[0], { img_name: 'caro3.png' }).subscribe(event => {
			this.img3_status = 'Image was uploaded successfully.';
			setTimeout(()=> { this.img3_status = ''; }, 5000);
     	});
  	}

	selected_file_4(file_name){
    	this.m_file_name4 = file_name;
		if (this.m_file_name4[0] == undefined){
			this.btn4_disable = true;
			return;
		}
		
		if (this.m_file_name4[0].name == '' || this.m_file_name4[0].name == undefined){
			this.btn4_disable = true;
			return;
		}

		if (Math.round(this.m_file_name4[0].size/1024) > 500){
			this.img4_status = 'Maximum allowed size is 500KB. Current size is ' + Math.round(this.m_file_name4[0].size/1024) + ' KB';
			this.lb_color1 = '#ff0000';
			return;
		}
		var reader = new FileReader();
		reader.onload = (event: any) => {
			this.img_name4 = event.target.result;
		}
		reader.readAsDataURL(this.m_file_name4[0]);
		this.img4_status = 'Size: ' + Math.round(this.m_file_name4[0].size/1024)+' KB';
		this.btn4_disable = false;
		this.lb_color1 = '#000';
  	}

  	upload_file_4(){
    	this.ds.pushFileToStorage(this.m_file_name4[0], { img_name: 'caro4.png' }).subscribe(event => {
			this.img4_status = 'Image was uploaded successfully.';
			setTimeout(()=> { this.img4_status = ''; }, 5000);
     	});
  	}

}