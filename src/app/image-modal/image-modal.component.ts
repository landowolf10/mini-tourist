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
    // Now you can use the imageName parameter as the selected image name
    // For example, you can include it in the filename when downloading
    const downloadFilename = this.selectedImageName; // Use imageName in the filename

    console.log("Downloaded image name: ", downloadFilename);

    const a = document.createElement('a');
    a.href = this.data.frontImageSrc;
    a.download = downloadFilename; // Set the download filename
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  onCloseModal(): void {
    this.dialogRef.close();
  }
}