import { Component } from '@angular/core';

import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterModule]
})
export class AppComponent {
  
  showMenu:boolean=true;

  constructor(private router:Router){
  }
  
  navegarLista(){
    this.router.navigate(['todoList']);
    this.showMenu = !this.showMenu;
  }
 

}
