import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { AboutMtCardsComponent } from './about-mt-cards/about-mt-cards.component';
import { CarouselComponent } from './carousel/carousel.component';
import { RateComponent } from './rate/rate.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WhereIsMtComponent } from './where-is-mt/where-is-mt.component';
import { MoreAboutMtComponent } from './more-about-mt/more-about-mt.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: CarouselComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'about-mt', component: AboutMtCardsComponent },
  { path: 'rate', component: RateComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'where-is-mt', component: WhereIsMtComponent },
  { path: 'more-about-mt', component: MoreAboutMtComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
