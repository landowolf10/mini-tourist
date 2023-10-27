import { Component } from '@angular/core';
import { DownloadButtonService } from '../services/download-button.service';

@Component({
  selector: 'app-about-mt-cards',
  templateUrl: './about-mt-cards.component.html',
  styleUrls: ['./about-mt-cards.component.css']
})
export class AboutMtCardsComponent {
  constructor(
    private downloadButtonService: DownloadButtonService
  ) {}


  ngOnInit() {
    this.downloadButtonService.setButtonVisibility(false);
  }
}
