import type {
  NodeRenderer,
  Options,
} from '@contentful/rich-text-react-renderer';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import type { Document } from '@contentful/rich-text-types';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import Link from 'next/link';
import React from 'react';
import type {
  CONTENT_TYPE,
  ICodeBlockFields,
} from '../../types/generated/contentful';
import ContentfulImage from '../layout/contentfulImage';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import getThemeColor from '../../lib/helpers/theme';

interface RichTextProps {
  document: Document;
  overrides?: Partial<Options>;
}

const embeddedAssetRenderer: Partial<Record<CONTENT_TYPE, NodeRenderer>> = {
  codeBlock: (node) => {
    const { language, content }: ICodeBlockFields = node.data.target.fields;
    const backgroundColor = getThemeColor('grey-background');

    return (
      <div className="w-min border-2 border-grey-lighter">
        <SyntaxHighlighter
          showLineNumbers
          language={language}
          customStyle={{ backgroundColor }}
        >
          {documentToPlainTextString(content, '\n')}
        </SyntaxHighlighter>
      </div>
    );
  },
};

const defaultRichTextOptions: Options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ENTRY]: (node, children) => {
      const contentType: CONTENT_TYPE = node.data.target.sys.contentType.sys.id;
      return <>{embeddedAssetRenderer?.[contentType]?.(node, children)}</>;
    },
    [BLOCKS.EMBEDDED_ASSET]: (node) => (
      <div>
        <ContentfulImage
          image={node.data?.target}
          alt={node.data?.target?.fields?.title}
        />
      </div>
    ),
    [BLOCKS.HEADING_1]: (node, children) => (
      <h1 className="text-3xl pt-10">{children}</h1>
    ),
    [BLOCKS.HEADING_2]: (node, children) => (
      <h2 className="text-2xl pt-7">{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (node, children) => (
      <h2 className="text-xl pt-5">{children}</h2>
    ),
    [BLOCKS.UL_LIST]: (node, children) => (
      <ul className="list-disc ml-5 mt-5">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (node, children) => (
      <ul className="list-disc ml-5 mt-5">{children}</ul>
    ),
    [BLOCKS.LIST_ITEM]: (node, children) => (
      <li className="mt-2">{children}</li>
    ),
    [BLOCKS.QUOTE]: (node, children) => (
      <div className="border-l-4 border-l-grey-light mt-5 bg-grey-over-background px-3 max-w-fit">
        {children}
      </div>
    ),
    [BLOCKS.HR]: () => <hr className="mt-5" />,
    [INLINES.HYPERLINK]: (node, children) => (
      <Link href={node.data.uri}>
        <a className="underline font-semibold hover:text-grey visited:text-grey">
          {children}
        </a>
      </Link>
    ),
    [BLOCKS.PARAGRAPH]: (node, children) => (
      <p className="mt-5 first:mt-0">{children}</p>
    ),
  },
  renderMark: {},
};

const RichText: React.FC<RichTextProps> = ({ document, overrides }) => {
  const options = {
    renderNode: {
      ...defaultRichTextOptions.renderNode,
      ...overrides?.renderNode,
    },
    renderMark: {
      ...defaultRichTextOptions.renderMark,
      ...overrides?.renderMark,
    },
  };

  return <>{documentToReactComponents(document, options)}</>;
};

export default RichText;
