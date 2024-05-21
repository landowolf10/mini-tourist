import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  visitedCardsCount: number = 0;

  constructor(
    private http: HttpClient
  ) {}

  countVisitedCards() {
    const apiUrl = `http://localhost:9090/api/card/cards/info/visited?clientId=5`;
    this.http.get<number>(apiUrl).subscribe(data => {
      this.visitedCardsCount = data;
      console.log('Total visited cards: ', data);
    });
  }
}
