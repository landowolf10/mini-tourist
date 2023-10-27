import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mini-tourist';
  selectedItem: string = 'spanish';
  isExpanded = false;

  toggleMenu() {
    this.isExpanded = !this.isExpanded;
  }

  menuItemClicked(event: Event, item: string) {
    event.preventDefault();
    this.selectedItem = item;
  }
}
