import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = "Home";

  constructor(private http: HttpClient) { }


  ngOnInit() {
    this.getUsersData().subscribe(
      data => {
        console.log(data);
        if (data)
          this.usersData = data;
      },
      error => console.error(error),
      () => console.log('done loading users'));
  }

  getUsersData() {

    // const USERS_ENDPOINT = 'https://api.github.com/users';
    const USERS_ENDPOINT = 'https://jsonplaceholder.typicode.com/users';

    return this.http.get(USERS_ENDPOINT); //.then(resp => resp.json()).then(data => data)
  }

  usersData: any;

  columnDefs = [
    { headerName: 'Name', field: 'name', sortable: true, filter: true },
    { headerName: 'Username', field: 'username', sortable: true },
    { headerName: 'Email', field: 'email', sortable: true },
    { headerName: 'Phone no', field: 'phone', sortable: true },
    {
      headerName: 'Address', cellRenderer: function (params) {
        return `${params.data.address.suite}, ${params.data.address.street}, ${params.data.address.city},  ${params.data.address.zipcode}`
      }, sortable: true
    }
  ];

}
