import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/shared/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  loading:boolean = false;
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }
  login(){
    this.loading = true;
  }
}
