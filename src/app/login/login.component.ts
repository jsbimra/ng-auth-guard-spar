import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { tap, shareReplay, first } from 'rxjs/operators';
import { AuthService } from './../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public errorStatus: boolean = false;;

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { }

  ngOnInit() { }

  onLogin() {
    console.log('onLogin trigger : ', this.loginForm.value);

    if (this.loginForm.status === "VALID") {
      const { username, password } = this.loginForm.value;

      console.log('on valid login condition : ', username, password);

      return this.auth.login(username, password)
        .pipe(first())
        .subscribe(result => {
          this.errorStatus = false;
          this.router.navigate(['/home']);
        },
          errResp => {
            console.log(errResp);
            console.log(this.errorStatus);
            this.errorStatus = true;
            console.log(this.errorStatus);
          },
          () => console.log('complete login'));
    }
  }
}
