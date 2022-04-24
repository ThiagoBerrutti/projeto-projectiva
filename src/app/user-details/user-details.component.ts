import { Component, Input, OnInit } from '@angular/core';
import { User } from '../shared/models/user';

@Component({
  selector: 'user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit 
{
  @Input() public user!: User;

  constructor() { }

  ngOnInit(): void {
  }

}
