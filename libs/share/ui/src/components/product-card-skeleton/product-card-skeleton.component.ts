import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'ctr-product-card-skeleton',
  standalone: true,
  imports: [CommonModule, NgxSkeletonLoaderModule],
  templateUrl: './product-card-skeleton.component.html',
  styleUrl: './product-card-skeleton.component.scss',
})
export class ProductCardSkeletonComponent {}
