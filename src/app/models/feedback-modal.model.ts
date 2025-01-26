export interface FeedbackModalModel {
  isOpen: boolean;
  type: 'success' | 'error';
  message: string;
  close: VoidFunction;
}
