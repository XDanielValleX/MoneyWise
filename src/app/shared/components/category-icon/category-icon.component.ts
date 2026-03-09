import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-category-icon',
  templateUrl: './category-icon.component.html',
  styleUrls: ['./category-icon.component.scss'],
  standalone: false
})
export class CategoryIconComponent {
  @Input() categoria: string = 'Otros';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
}