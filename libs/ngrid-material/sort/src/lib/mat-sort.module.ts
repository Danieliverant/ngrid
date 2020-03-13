import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSortModule, MatSortHeader } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';

import { PblNgridModule, PblNgridRegistryService } from '@pebula/ngrid';
import { PblNgridMatSortDirective } from './mat-sort.directive';
import { MatSortExtension } from './mat-sort-component-extension';

@NgModule({
  imports: [ CommonModule, MatButtonModule, MatSortModule, PblNgridModule ],
  declarations: [ PblNgridMatSortDirective ],
  exports: [ PblNgridMatSortDirective, MatSortModule ],
})
export class PblNgridMatSortModule {
  constructor(private registry: PblNgridRegistryService, cfr: ComponentFactoryResolver) {
    registry.addMulti('dataHeaderExtensions', new MatSortExtension(cfr));
  }
}
