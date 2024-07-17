import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent  implements OnInit {
  name: string | undefined;
  email: string | undefined;
  constructor(private Router: Router) {
  }
  ngOnInit(): void {
    console.log("ngOnInit");
    const token = localStorage.getItem('Fb-pA4lBUfsqVAWFN78eWDF');
    if (!token) {
      console.log("No token found");
      this.Router.navigate(['/login']);
      return;
    }
    fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 401) {
          console.log("Unauthorized");
          this.Router.navigate(['/login']);
          return;
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          console.log("Data: ", data);
          this.name = data.name;
          this.email = data.email;
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }
}