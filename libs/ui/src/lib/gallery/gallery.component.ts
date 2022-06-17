import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ui-gallery',
  templateUrl: './gallery.component.html',
})
export class GalleryComponent implements OnInit {
  selectedImage = '';

  @Input() images: string[] | undefined = [];

  constructor() {}

  ngOnInit(): void {
    if(this.images?.length) {
      this.selectedImage = this.images[0];
    }
  }

  selectImage(image: string) {
    if(this.images?.length) {
      this.selectedImage = this.images[ this.images?.indexOf(image) ];
    }
  }

  get hasImages() {
    return (this.images?.length) ? this.images.length > 0 :false;
  }
}
