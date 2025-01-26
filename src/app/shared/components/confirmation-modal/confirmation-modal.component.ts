import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
})
export class ConfirmationModalComponent {
  @Input() title = 'Confirmação';
  @Input() message = 'Você tem certeza?';
  @Input() confirmButtonText = 'Sim';
  @Input() cancelButtonText = 'Não';

  @Output() confirm = new EventEmitter<void>();
  @Output() dismiss = new EventEmitter<void>();

  onConfirm(): void {
    this.confirm.emit();
  }

  onDismiss(): void {
    this.dismiss.emit();
  }
}
