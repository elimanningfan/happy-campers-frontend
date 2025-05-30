// Page Renderer Component
// Renders CMS pages on the frontend

import { cn } from '@/lib/utils';
import { 
  Page, 
  ContentBlock,
  HeroBlockContent,
  TextBlockContent,
  RVShowcaseBlockContent,
  FeaturesBlockContent,
  GalleryBlockContent,
  CTABlockContent
} from '@/lib/types/page';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

interface PageRendererProps {
  page: Page;
}

export function PageRenderer({ page }: PageRendererProps) {
  if (!page || !page.content) {
    return null;
  }

  return (
    <div className="min-h-screen">
      {page.content
        .filter(block => block.isVisible)
        .sort((a, b) => a.order - b.order)
        .map((block) => (
          <BlockRenderer key={block.id} block={block} />
        ))}
    </div>
  );
}

interface BlockRendererProps {
  block: ContentBlock;
}

function BlockRenderer({ block }: BlockRendererProps) {
  const blockClasses = cn(
    block.settings?.fullWidth ? '' : 'container mx-auto',
    block.settings?.customClasses
  );

  const blockStyles: React.CSSProperties = {
    backgroundColor: block.settings?.backgroundColor,
    color: block.settings?.textColor,
    paddingTop: block.settings?.padding?.top ? `${block.settings.padding.top}px` : undefined,
    paddingBottom: block.settings?.padding?.bottom ? `${block.settings.padding.bottom}px` : undefined,
    paddingLeft: block.settings?.padding?.left ? `${block.settings.padding.left}px` : undefined,
    paddingRight: block.settings?.padding?.right ? `${block.settings.padding.right}px` : undefined,
    marginTop: block.settings?.margin?.top ? `${block.settings.margin.top}px` : undefined,
    marginBottom: block.settings?.margin?.bottom ? `${block.settings.margin.bottom}px` : undefined,
  };

  return (
    <section className={blockClasses} style={blockStyles}>
      {block.type === 'hero' && <HeroBlock content={block.content as HeroBlockContent} />}
      {block.type === 'text' && <TextBlock content={block.content as TextBlockContent} />}
      {/* Add more block types as needed */}
    </section>
  );
}

// Hero Block Component
function HeroBlock({ content }: { content: HeroBlockContent }) {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  return (
    <div className="relative min-h-[500px] flex items-center justify-center">
      {/* Background Image */}
      {content.backgroundImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={content.backgroundImage}
            alt=""
            fill
            className="object-cover"
            priority
          />
          {content.overlay && (
            <div 
              className="absolute inset-0 bg-black"
              style={{ opacity: (content.overlayOpacity || 50) / 100 }}
            />
          )}
        </div>
      )}

      {/* Content */}
      <div className={cn(
        "relative z-10 px-6 py-16 max-w-4xl mx-auto",
        alignmentClasses[content.alignment || 'center']
      )}>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 text-white">
          {content.title}
        </h1>
        
        {content.subtitle && (
          <p className="text-xl md:text-2xl mb-8 text-white/90">
            {content.subtitle}
          </p>
        )}

        {content.ctaButtons && content.ctaButtons.length > 0 && (
          <div className={cn(
            "flex gap-4",
            content.alignment === 'center' && 'justify-center',
            content.alignment === 'right' && 'justify-end'
          )}>
            {content.ctaButtons.map((button, index) => (
              <Link 
                key={index} 
                href={button.link}
                target={button.openInNewTab ? '_blank' : undefined}
                rel={button.openInNewTab ? 'noopener noreferrer' : undefined}
              >
                <Button
                  size="lg"
                  variant={button.style === 'primary' ? 'default' : button.style}
                >
                  {button.text}
                </Button>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Text Block Component
function TextBlock({ content }: { content: TextBlockContent }) {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify'
  };

  const columnClasses = {
    1: '',
    2: 'md:columns-2 gap-8',
    3: 'md:columns-3 gap-8'
  };

  return (
    <div className="py-12 px-6">
      <div 
        className={cn(
          "prose prose-lg max-w-none",
          alignmentClasses[content.alignment || 'left'],
          columnClasses[content.columns || 1]
        )}
        dangerouslySetInnerHTML={{ __html: content.text }}
      />
    </div>
  );
}
