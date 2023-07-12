import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, delay } from 'rxjs';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: 
  [CommonModule],
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent {
  /**
   *
   */
  constructor(private router: Router) {    

  }

}
