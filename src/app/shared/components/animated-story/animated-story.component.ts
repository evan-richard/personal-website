import { Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { TravelStory } from '@landing/models';

@Component({
  selector: 'app-animated-story',
  templateUrl: './animated-story.component.html',
  styleUrls: ['./animated-story.component.scss']
})
export class AnimatedStoryComponent implements OnInit, OnChanges {

  @ViewChild('containerRef') containerRef: ElementRef;

  @Input() story: TravelStory;
  @Input() scrollPosition: number;
  @Input() storyIndex: number;

  upwardSlideAnimation(scrollDiff: number, leftElementRef, rightElementRef): void {
    leftElementRef.style.marginTop = `${500 - scrollDiff < 10 ? 10 : 500 - scrollDiff}px`;
    rightElementRef.style.marginTop = `${-100 + scrollDiff > 0 ? 0 : -100 + scrollDiff}px`;
  }

  crossDiagonalSlideAnimation(scrollDiff: number, leftElementRef, rightElementRef): void {
    leftElementRef.style.marginLeft = `${-500 + scrollDiff > 0 ? 0 : -500 + scrollDiff}px`;
    rightElementRef.style.marginTop = `${-1000 + (2 * scrollDiff) > 0 ? 0 : -1000 + (2 * scrollDiff)}px`;
    rightElementRef.style.marginLeft = `${1000 - (2 * scrollDiff) < 0 ? 0 : 1000 - (2 * scrollDiff)}px`;
    rightElementRef.style.marginRight = `${-500 + scrollDiff > 0 ? 0 : -500 + scrollDiff}px`;
  }

  crossHorizontalSlideAnimation(scrollDiff: number, leftElementRef, rightElementRef): void {
    leftElementRef.style.marginTop = `${-500 + scrollDiff > 0 ? 0 : -500 + scrollDiff}px`;
    leftElementRef.style.marginLeft = `${-500 + scrollDiff > 0 ? 0 : -500 + scrollDiff}px`;
    rightElementRef.style.marginTop = `${500 - scrollDiff < 0 ? 0 : 500 - scrollDiff}px`;
    rightElementRef.style.marginLeft = `${500 - scrollDiff < 0 ? 0 : 500 - scrollDiff}px`;
  }

  constructor() { }

  ngOnInit(): void {}

  ngOnChanges(): void {
    const desktopImageRef: any = document.getElementsByClassName(`story__image-container-${this.storyIndex}--gt-sm`);
    const desktopTextRef: any = document.getElementsByClassName(`story__text-${this.storyIndex}--gt-sm`);
    const mobileImageRef: any = document.getElementsByClassName(`story__image-container-${this.storyIndex}--lt-md`);
    const mobileTextRef: any = document.getElementsByClassName(`story__text-${this.storyIndex}--lt-md`);

    const scrollTop: number = this.containerRef.nativeElement.offsetParent.offsetTop + this.containerRef.nativeElement.offsetTop - 700;
    if (this.scrollPosition > scrollTop) {
      let animationFunc;
      const scrollDiff: number = this.scrollPosition - scrollTop;
      const opacity: number = (scrollDiff/1000) * 2;

      if (desktopTextRef.length && desktopImageRef.length) {
        switch(this.storyIndex) {
          case 0:
            animationFunc = this.upwardSlideAnimation;
            break;
          case 1:
            animationFunc = this.crossDiagonalSlideAnimation;
            break;
          case 2:
            animationFunc = this.crossHorizontalSlideAnimation;
            break;
          default:
            animationFunc = this.crossDiagonalSlideAnimation;
            break;
        }
        animationFunc(scrollDiff, desktopTextRef[0], desktopImageRef[0]);

        desktopTextRef[0].style.opacity = opacity > 1 ? 1 : opacity;
        desktopImageRef[0].style.opacity = opacity > 1 ? 1 : opacity;
      }
    }
  }

}
