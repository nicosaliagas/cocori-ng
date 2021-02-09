import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToolbarItem } from 'src/app/core/models/Toolbar.model';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Output() toggleSidenav = new EventEmitter<void>();

  menuItems: ToolbarItem[] = [
    { label: 'Démos', linkTo: '/lib-demo', newTab: false },
  ];

  constructor() { }

  ngOnInit(): void { }

  trackBy(index: number) {
    return index;
  }
}
