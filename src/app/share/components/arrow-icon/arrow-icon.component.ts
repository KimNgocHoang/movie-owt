import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-arrow-icon',
  templateUrl: './arrow-icon.component.html',
  styleUrls: ['./arrow-icon.component.scss'],
})
export class ArrowIconComponent {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      'arrow',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '/assets/image/arrow.svg'
      )
    );
  }
}
