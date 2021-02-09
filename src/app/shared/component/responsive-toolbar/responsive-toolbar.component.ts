import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToolbarItem } from 'src/app/core/models/Toolbar.model';

@Component({
  selector: 'responsive-toolbar-ng',
  templateUrl: './responsive-toolbar.component.html',
  styleUrls: ['./responsive-toolbar.component.scss']
})
export class ResponsiveToolbarComponent implements OnInit {

  @Output() toggleSidenav = new EventEmitter<void>();

  menuItems: ToolbarItem[] = [
    { label: 'Documentation', linkTo: '/home', newTab: false },
    { label: 'Démos', linkTo: '/home', newTab: false },
  ];

  constructor() { }

  ngOnInit(): void { }

  trackBy(index: number) {
    return index;
  }
}
