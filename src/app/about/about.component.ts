import { Component } from '@angular/core';
import { DownloadButtonService } from '../services/download-button.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  constructor(private downloadButtonService: DownloadButtonService) {}

  ngOnInit() {
    this.onHideDownloadButton();
  }

  onHideDownloadButton() {
    this.downloadButtonService.setButtonVisibility(false);
  }
}
