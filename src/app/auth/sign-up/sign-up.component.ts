import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/shared/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  loading: boolean = false;
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }
  signup(){
    this.loading = true;
  }
}
