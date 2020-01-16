import { Component, OnInit } from '@angular/core';
import { Params,Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-projectdetail',
  templateUrl: './projectdetail.page.html',
  styleUrls: ['./projectdetail.page.scss'],
})
export class ProjectdetailPage implements OnInit {
  project
  constructor(private router: Router,  private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
  		this.project = params;
  	});
  }
  

}
