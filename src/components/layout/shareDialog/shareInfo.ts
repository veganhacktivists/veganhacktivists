import type { Asset } from 'contentful';

/**
 * The information to share through the dialog.
 */
export default interface ShareInfo {
  /** URL to share. */
  url: string;
  /** Title of the information to share. */
  title: string;
  /** Non mandatory description of the information to share. */
  description?: string;
  image: Asset;
}
