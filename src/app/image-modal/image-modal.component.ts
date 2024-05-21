import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SelectedImageService } from '../services/selected-image.service';
import { DownloadButtonService } from '../services/download-button.service';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.css']
})
export class ImageModalComponent {
  selectedImageName: string = '';
  isDownloadButtonVisible: boolean = false;
  isFlipped: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ImageModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private selectedImageService: SelectedImageService,
    private downloadButtonService: DownloadButtonService
  ) { 
    this.selectedImageService.selectedImageName$.subscribe((imageName) => {
      this.selectedImageName = imageName;
      this.isDownloadButtonVisible = !!imageName;
    });

    this.downloadButtonService.isButtonVisible$.subscribe((isVisible) => {
      this.isDownloadButtonVisible = isVisible;
    });
  }
  
  toggleFlip() {
    this.isFlipped = !this.isFlipped;
  }

  downloadImage(): void {
    if (!this.selectedImageName) {
      console.error("No image URL provided");
      return;
    }
  
    console.log("Downloading image from URL: ", this.selectedImageName);
  
    fetch(this.selectedImageName)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.blob();
      })
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
  
        // Extract filename and provide a default name if undefined
        const filename = this.selectedImageName.split('/').pop() || 'downloaded-image';
        a.download = filename;
  
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
  
        // Clean up
        window.URL.revokeObjectURL(url);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }  

  onCloseModal(): void {
    this.dialogRef.close();
  }
}