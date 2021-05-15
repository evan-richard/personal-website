import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ComputerScreenComponent, LandingPageComponent, TravelPageComponent, WelcomeLetterComponent } from '@landing/components';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IonicModule } from '@ionic/angular';
import { AnimatedStoryComponent, AnimatedTextComponent, AnimatedTransitionBarsComponent } from '@shared/components';

@NgModule({
  declarations: [
    AppComponent,
    ComputerScreenComponent,
    LandingPageComponent,
    WelcomeLetterComponent,
    AnimatedTextComponent,
    AnimatedTransitionBarsComponent,
    TravelPageComponent,
    AnimatedStoryComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FlexLayoutModule,
    IonicModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
