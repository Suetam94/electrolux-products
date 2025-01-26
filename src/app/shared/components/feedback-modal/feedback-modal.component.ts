import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-feedback-modal',
  imports: [NgClass],
  templateUrl: './feedback-modal.component.html',
  styleUrl: './feedback-modal.component.scss',
})
export class FeedbackModalComponent {
  @Input() isOpen = false;
  @Input() type: 'success' | 'error' = 'success';
  @Input() message = '';
  @Output() close = new EventEmitter<void>();

  closeModal(): void {
    this.isOpen = false;
    this.close.emit();
  }
}
