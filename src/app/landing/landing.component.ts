import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) { }

  isAuthUser: boolean = false;

  ngOnInit() {
    console.log('Landing init call');

    //if not auth redirect to default
    if (!this.isAuthUser) {
      this.router.navigateByUrl('/');
    }

  }

  authenticateSelf() {
    // if (!this.isAuthUser) {
    //   this.isAuthUser = !this.isAuthUser;
    // }


  }
}
