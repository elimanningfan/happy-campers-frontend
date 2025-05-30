'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { 
  Page, 
  ContentBlock, 
  HeroBlockContent, 
  TextBlockContent,
  RVShowcaseBlockContent,
  GalleryBlockContent,
  CTABlockContent,
  FeaturesBlockContent
} from '@/lib/types/page';
import { rvData } from '@/lib/data/rvData';
import { cn } from '@/lib/utils';

// Page Renderer Component
// Renders CMS pages on the frontend

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

  switch (block.type) {
    case 'hero':
      return <HeroBlock key={block.id} block={block} />;
    case 'text':
      return <TextBlock key={block.id} block={block} />;
    case 'rv-showcase':
      return <RVShowcaseBlock key={block.id} block={block} />;
    case 'gallery':
      return <GalleryBlock key={block.id} block={block} />;
    case 'cta':
      return <CTABlock key={block.id} block={block} />;
    default:
      return null;
  }
}

// Hero Block Component
function HeroBlock({ block }: { block: ContentBlock }) {
  const content = block.content as HeroBlockContent;

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
function TextBlock({ block }: { block: ContentBlock }) {
  const content = block.content as TextBlockContent;

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

function RVShowcaseBlock({ block }: { block: ContentBlock }) {
  const content = block.content as RVShowcaseBlockContent;
  
  // For now, we'll show the latest RVs
  const displayRVs = rvData.slice(0, content.limit || 3);
  
  if (content.layout === 'carousel') {
    // Simplified carousel - in production, you'd use a proper carousel component
    return (
      <section className="py-16 px-4">
        <div className="container mx-auto">
          {content.title && (
            <h2 className="text-3xl font-bold text-center mb-4">{content.title}</h2>
          )}
          {content.description && (
            <p className="text-lg text-center text-gray-600 mb-8">{content.description}</p>
          )}
          <div className="flex overflow-x-auto gap-6 pb-4">
            {displayRVs.map((rv) => (
              <div key={rv.id} className="flex-none w-80">
                <RVCard rv={rv} showPricing={content.showPricing} showAvailability={content.showAvailability} />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  
  if (content.layout === 'featured') {
    const [featured, ...others] = displayRVs;
    return (
      <section className="py-16 px-4">
        <div className="container mx-auto">
          {content.title && (
            <h2 className="text-3xl font-bold text-center mb-4">{content.title}</h2>
          )}
          {content.description && (
            <p className="text-lg text-center text-gray-600 mb-8">{content.description}</p>
          )}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="md:col-span-1">
              <RVCard rv={featured} showPricing={content.showPricing} showAvailability={content.showAvailability} featured />
            </div>
            <div className="space-y-4">
              {others.map((rv) => (
                <RVCard key={rv.id} rv={rv} showPricing={content.showPricing} showAvailability={content.showAvailability} compact />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  // Default grid layout
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        {content.title && (
          <h2 className="text-3xl font-bold text-center mb-4">{content.title}</h2>
        )}
        {content.description && (
          <p className="text-lg text-center text-gray-600 mb-8">{content.description}</p>
        )}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayRVs.map((rv) => (
            <RVCard key={rv.id} rv={rv} showPricing={content.showPricing} showAvailability={content.showAvailability} />
          ))}
        </div>
      </div>
    </section>
  );
}

function RVCard({ 
  rv, 
  showPricing, 
  showAvailability, 
  featured = false,
  compact = false 
}: { 
  rv: any;
  showPricing?: boolean;
  showAvailability?: boolean;
  featured?: boolean;
  compact?: boolean;
}) {
  if (compact) {
    return (
      <Link href={`/rvs/${rv.slug}`} className="flex gap-4 p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
        <div className="relative w-24 h-24 flex-shrink-0">
          <Image
            src={rv.images[0]}
            alt={rv.name}
            fill
            className="object-cover rounded"
          />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold">{rv.name}</h4>
          <p className="text-sm text-gray-600">Sleeps {rv.sleeps} • {rv.length}</p>
          {showPricing && (
            <p className="text-lg font-bold text-orange-600 mt-1">${rv.pricePerDay}/night</p>
          )}
        </div>
      </Link>
    );
  }
  
  return (
    <Link href={`/rvs/${rv.slug}`} className={cn(
      "block bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden",
      featured && "h-full"
    )}>
      <div className={cn("relative", featured ? "h-64" : "h-48")}>
        <Image
          src={rv.images[0]}
          alt={rv.name}
          fill
          className="object-cover"
        />
        {showAvailability && (
          <span className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded text-xs">
            Available
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className={cn("font-bold", featured ? "text-xl" : "text-lg")}>{rv.name}</h3>
        <p className="text-gray-600 text-sm">
          {rv.type} • Sleeps {rv.sleeps} • {rv.length}
        </p>
        {featured && <p className="text-gray-600 mt-2">{rv.description}</p>}
        {showPricing && (
          <p className={cn("font-bold text-orange-600 mt-2", featured ? "text-2xl" : "text-xl")}>
            ${rv.pricePerDay}/night
          </p>
        )}
      </div>
    </Link>
  );
}

function GalleryBlock({ block }: { block: ContentBlock }) {
  const content = block.content as GalleryBlockContent;
  
  // Placeholder images until media library integration
  const placeholderImages = [
    '/images/rv-lifestyle-1.jpg',
    '/images/rv-lifestyle-2.jpg',
    '/images/rv-lifestyle-3.jpg',
    '/images/rv-lifestyle-4.jpg',
    '/images/rv-lifestyle-5.jpg',
    '/images/rv-lifestyle-6.jpg',
  ];
  
  const spacingClasses = {
    none: 'gap-0',
    small: 'gap-2',
    medium: 'gap-4',
    large: 'gap-8',
  };
  
  const columnClasses = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
    5: 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
  };
  
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        {content.title && (
          <h2 className="text-3xl font-bold text-center mb-8">{content.title}</h2>
        )}
        <div className={cn(
          "grid",
          columnClasses[content.columns as keyof typeof columnClasses] || columnClasses[3],
          spacingClasses[content.spacing || 'medium']
        )}>
          {placeholderImages.slice(0, content.columns * 2).map((image, index) => (
            <div key={index} className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src={image}
                alt={`Gallery image ${index + 1}`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTABlock({ block }: { block: ContentBlock }) {
  const content = block.content as CTABlockContent;
  
  const bgStyle: React.CSSProperties = content.backgroundImage 
    ? { backgroundImage: `url(${content.backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : { backgroundColor: content.backgroundColor || '#F59E0B' };
  
  return (
    <section className="py-20 px-4" style={bgStyle}>
      <div className="container mx-auto text-center">
        <div className={cn(
          "max-w-3xl mx-auto",
          content.backgroundImage && "bg-black/50 p-8 rounded-lg"
        )}>
          <h2 className={cn(
            "text-4xl font-bold mb-4",
            content.backgroundImage ? "text-white" : "text-white"
          )}>
            {content.title}
          </h2>
          {content.description && (
            <p className={cn(
              "text-xl mb-8",
              content.backgroundImage ? "text-white" : "text-white/90"
            )}>
              {content.description}
            </p>
          )}
          {content.buttons.map((button, index) => (
            <Button
              key={index}
              size="lg"
              className="bg-white text-orange-600 hover:bg-gray-100"
              asChild
            >
              <Link href={button.link}>{button.text}</Link>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
