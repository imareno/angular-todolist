import { Component } from '@angular/core';

import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterModule, MatToolbarModule, MatButtonModule]
})
export class AppComponent {
  
  constructor(private router:Router){
  }
  
}
