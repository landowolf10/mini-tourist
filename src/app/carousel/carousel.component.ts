import { Component, ElementRef, OnInit, ViewChild  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ImageModalComponent } from '../image-modal/image-modal.component';
import { SelectedImageService } from '../services/selected-image.service';
import { DownloadButtonService } from '../services/download-button.service';


declare var $: any;

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit  {
  imageNames: string[] = ['Barra de Potosí frente.jpg', 'FISHERS1 SP.jpg', 'La Isla Ixtapa.jpg', 'La Ropa frente.jpg', 'Las Gatas frente.jpg'];
  socialMedia: string[] = ['facebook.png', 'whats.png', 'instagram.png', 'twitter.png'];
  isExpanded = false;
  selectedItem: string = 'premium';
  hasImages: boolean = true;//Change back to false when calling images from API

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private selectedImageService: SelectedImageService,
    private downloadButtonService: DownloadButtonService
  ) {}

  ngOnInit() {
    //this.fetchImageNames();
    this.initializeCarousel();
    this.downloadButtonService.setButtonVisibility(false);
  }

  /*fetchImageNames() {
    const apiUrl = `http://localhost:9090/api/card/list/${this.selectedItem}`;
    this.http.get<string[]>(apiUrl).subscribe(data => {
      this.imageNames = data;
      console.log('Image names: ', this.imageNames);
      console.log('Images array length: ', this.imageNames.length);

      if(this.imageNames.length > 0)
      { 
        this.hasImages = true;
        this.initializeCarousel();
      }
    });
  }*/

  toggleMenu() {
    this.isExpanded = !this.isExpanded;
  }

  menuItemClicked(event: Event, item: string) {
    event.preventDefault();
    this.selectedItem = item;
    //this.fetchImageNames();
  }

  rotateLeft() {
    $('.carousel').carousel('prev');
  }

  rotateRight() {
    $('.carousel').carousel('next');
  }

  private initializeCarousel() {
    setTimeout(() => {
      // Initialize the carousel here using jQuery
      $('.carousel').carousel({
        padding: 200
      });
      //this.autoplay();
    }, 0);
  }

  private autoplay() {
    $('.carousel').carousel('next');
    setTimeout(() => this.autoplay(), 4500);
  }

  openImageModal(event: Event, imageName: string): void {
    event.preventDefault();
    this.selectedImageService.setSelectedImageName(imageName);
    this.downloadButtonService.setButtonVisibility(true);

    const dialogRef = this.dialog.open(ImageModalComponent, {
      //This is used in the image-modal.component.html file
      data: { 
        frontImageSrc: `assets/cards/${this.selectedItem}/${imageName}`,
        backImageSrc: `assets/cards/${this.selectedItem}/FISHERS1 SP.jpg`
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.downloadButtonService.setButtonVisibility(false);
    });
  }
}
