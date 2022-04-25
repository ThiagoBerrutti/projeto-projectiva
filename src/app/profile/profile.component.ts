import { Component, OnInit } from '@angular/core';
import { User } from '../shared/models/user';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public currentUser: User | undefined;

  constructor(private _authService: AuthService) { }

  ngOnInit(): void 
  {
    this.currentUser = this._authService.getCurrentUser();
  }

}
