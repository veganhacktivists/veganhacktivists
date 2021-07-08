import ExternalLinkButton from './externalLinkButton';
import SubmitButton from './submitButton';

export interface IButton {
  linkUrl?: string;
  label?: string;
  style?: string;
}

export default { ExternalLinkButton, SubmitButton };
