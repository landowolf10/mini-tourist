import { Component, ElementRef, OnInit, ViewChild  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ImageModalComponent } from '../image-modal/image-modal.component';
import { SelectedImageService } from '../services/selected-image.service';
import { DownloadButtonService } from '../services/download-button.service';


declare var $: any;

interface Card {
  cardName: string;
  category: string;
  city: string;
  clientId: number;
  creationDate: string;
  image: string;
  premium: string;
  updateDate: string | null;
}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit  {
  imageNames: string[] = [];
  socialMedia: string[] = ['facebook.png', 'whats.png', 'instagram.png', 'twitter.png'];
  isExpanded = false;
  selectedItem: string = 'Premium';
  hasImages: boolean = false;

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private selectedImageService: SelectedImageService,
    private downloadButtonService: DownloadButtonService
  ) {}

  ngOnInit() {
    this.fetchPremiumImages();
    //this.initializeCarousel();
    this.downloadButtonService.setButtonVisibility(false);
  }
  

  fetchPremiumImages() {
    const apiUrl = `http://localhost:9090/api/client/category/premium?isPremium=Yes`;
    this.http.get<Card[]>(apiUrl).subscribe(data => {
      this.imageNames = data.map(item => item.image);
      console.log('Premium names: ', this.imageNames);
      console.log('Premium array length: ', this.imageNames.length);

      if(this.imageNames.length > 0)
      { 
        this.hasImages = true;
        this.initializeCarousel();
      }
    });
  }

  fetchImageNames() {
    const apiUrl = `http://localhost:9090/api/client/category?category=${this.selectedItem}`;
    this.http.get<Card[]>(apiUrl).subscribe(data => {
      this.imageNames = data.map(item => item.image);
      console.log('Image names: ', this.imageNames);
      console.log('Images array length: ', this.imageNames.length);

      if(this.imageNames.length > 0)
      { 
        this.hasImages = true;
        this.initializeCarousel();
      }
    });
  }

  toggleMenu() {
    this.isExpanded = !this.isExpanded;
  }

  menuItemClicked(event: Event, item: string) {
    event.preventDefault();
    this.selectedItem = item;

    //If premium, call premium, if not, call other
    console.log('Selected category: ', this.selectedItem);

    if (this.selectedItem == 'premium')
      this.fetchPremiumImages();
    else
      this.fetchImageNames();
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

    console.log('Selected image name: ', imageName);

    const dialogRef = this.dialog.open(ImageModalComponent, {
      //This is used in the image-modal.component.html file
      data: { 
        frontImageSrc: imageName,
        backImageSrc: `assets/cards/${this.selectedItem}/Fishers.jpg`
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.downloadButtonService.setButtonVisibility(false);
    });
  }
}
