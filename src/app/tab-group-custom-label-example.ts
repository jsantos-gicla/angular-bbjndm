import {AfterViewInit, Component, HostListener, ViewChild} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { MatTable } from '@angular/material/table';

export interface PeriodicElement {
  id: number,
  concepto: string;
  proveedor: string;
  costo: number;
  valor: number;
  disabled: boolean;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id:1,concepto: 'Desconsolidación', proveedor: 'Bomport', costo: 1200.79, valor: 1500, disabled: true},
  {id:1,concepto: 'Desconsolidación', proveedor: 'Bomport', costo: 800, valor: 300, disabled: false},
];

const SERVICIOS_DISPONIBLES: PeriodicElement[] = [
  {id:2,concepto: 'Almacenaje', proveedor: 'Bomport', costo: 600, valor: 0, disabled: false},
  {id:3,concepto: 'Almacenaje tipo 2', proveedor: 'Bomport', costo: 1201, valor: 0, disabled: false},
  {id:3,concepto: 'Almacenaje tipo 1', proveedor: 'Bomport', costo: 100, valor: 0, disabled: false},
];

/**
 * @title Using tabs with a custom label template
 */
@Component({
  selector: 'tab-group-custom-label-example',
  templateUrl: 'tab-group-custom-label-example.html',
  styleUrls: ['tab-group-custom-label-example.css'],
})
export class TabGroupCustomLabelExample implements AfterViewInit {
  displayedColumns: string[] = ['concepto', 'proveedor', 'costo', 'valor'];
  dataSource = ELEMENT_DATA;
  dataServDisponibles=SERVICIOS_DISPONIBLES;

  ngAfterViewInit() {
    this.onResize();
  }

//public innerWidth : Object = 0;
@ViewChild('myname') input; 
 @ViewChild('table') table: MatTable<PeriodicElement>;

@HostListener('window:resize', ['$event'])
onResize() {
   window.innerWidth;
  console.log(window.innerWidth);
  if(window.innerWidth<=800)
    this.input.headerPosition="below";
  else
    this.input.headerPosition="up";
}

drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

   dropTable(event: CdkDragDrop<PeriodicElement[]>) {
    if (this.isInvalidDragEvent) {
            this.isInvalidDragEvent = false;
            return;
        }
    const prevIndex = this.dataSource.findIndex((d) => d === event.item.data);
    moveItemInArray(this.dataSource, prevIndex, event.currentIndex);
    this.table.renderRows();
  }
  isInvalidDragEvent:boolean=false;
  onInvalidDragEventMouseDown(){
    this.isInvalidDragEvent=true;
  }
  dragStarted(event){
    if(this.isInvalidDragEvent){
       document.dispatchEvent(new Event('mouseup'));
    }
  }
}


/**  Copyright 2020 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */