import { PortableText, type PortableTextComponents } from '@portabletext/react';
import { Heading, Text } from '@okshaun/components';
import { VStack } from '@styled-system/jsx';
import { link } from '@styled-system/recipes';

/**
 * Renders the block content coming out of Sanity — program descriptions,
 * artist bios, exhibition copy. Every mark maps onto a design-system
 * component so CMS text cannot introduce styling the rest of the site
 * does not have.
 */
const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <Text>{children}</Text>,
    h2: ({ children }) => <Heading as="h2">{children}</Heading>,
    h3: ({ children }) => <Heading as="h3">{children}</Heading>,
    h4: ({ children }) => <Heading as="h4">{children}</Heading>,
    blockquote: ({ children }) => <Text fontStyle="italic">{children}</Text>,
  },
  marks: {
    link: ({ children, value }) => {
      const href = String(value?.href ?? '');
      // Anything off-site opens with the usual safety attributes; an
      // internal link should not carry them.
      const external = /^https?:\/\//.test(href);
      return (
        <a
          href={href}
          className={link()}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {children}
        </a>
      );
    },
  },
  list: {
    bullet: ({ children }) => <VStack alignItems="flex-start" gap="2">{children}</VStack>,
    number: ({ children }) => <VStack alignItems="flex-start" gap="2">{children}</VStack>,
  },
  listItem: {
    bullet: ({ children }) => <Text>• {children}</Text>,
    number: ({ children }) => <Text>{children}</Text>,
  },
};

export function RichText({ value }: { value?: unknown }) {
  if (!Array.isArray(value) || value.length === 0) return null;
  return (
    <VStack alignItems="flex-start" gap="4">
      <PortableText value={value} components={components} />
    </VStack>
  );
}
