import { Component, ElementRef, OnInit, ViewChild  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ImageModalComponent } from '../image-modal/image-modal.component';
import { SelectedImageService } from '../services/selected-image.service';
import { DownloadButtonService } from '../services/download-button.service';
import { StatusService } from '../services/card-status.service';


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
  cards: Card[] = [];
  socialMedia: string[] = ['facebook.png', 'whats.png', 'instagram.png', 'twitter.png'];
  isExpanded = false;
  selectedItem: string = 'Premium';
  hasImages: boolean = false;
  //clientId: number = 0;

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private selectedImageService: SelectedImageService,
    private downloadButtonService: DownloadButtonService,
    private statusService: StatusService
  ) {}

  ngOnInit() {
    this.fetchPremiumImages();
    //this.initializeCarousel();
    this.downloadButtonService.setButtonVisibility(false);
  }
  

  fetchPremiumImages() {
    const apiUrl = `http://localhost:9090/api/client/category/premium?isPremium=Yes`;
    this.http.get<Card[]>(apiUrl).subscribe(data => {
      this.cards = data;
      console.log('Premium cards: ', this.cards);

      if (this.cards.length > 0) { 
        this.hasImages = true;
        this.initializeCarousel();
      }
    });
  }
  
  fetchImageNames() {
    const apiUrl = `http://localhost:9090/api/client/category?category=${this.selectedItem}`;
    this.http.get<Card[]>(apiUrl).subscribe(data => {
      this.cards = data;
      console.log('Cards: ', this.cards);

      if (this.cards.length > 0) { 
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

  openImageModal(event: Event, card: Card): void {
    event.preventDefault();
    this.selectedImageService.setSelectedImageName(card.image);
    this.downloadButtonService.setButtonVisibility(true);

    console.log('Selected image name: ', card);

    const dialogRef = this.dialog.open(ImageModalComponent, {
      //This is used in the image-modal.component.html file
      data: { 
        card: card,
        frontImageSrc: card.image,
        backImageSrc: card.image
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.downloadButtonService.setButtonVisibility(false);
    });

    //Call status API (Visited)
    const status = 'Visited';
    const date = new Date().toISOString();
    //this.clientId = card.clientId;

    console.log('Client Id: ', card.clientId);

    this.statusService.registerStatus(card.clientId, status, card.city, date).subscribe(
      data => {
        console.log('Status registered: ', data);
      },
      error => {
        console.error('Error registering status: ', error);
      }
    );
  }
}
