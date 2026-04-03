import { Metadata } from 'next';

// This function creates the 'Social Card' for WhatsApp
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const property = await prisma.property.findUnique({
    where: { id: params.id },
  });

  if (!property) return { title: 'Property Not Found - AVH' };

  const priceFormatted = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(property.price);

  return {
    title: `${property.title} - ${priceFormatted}`,
    description: `Verified listing in ${property.location}. View 10+ photos and video tour on AbujaVerifiedHomes.`,
    openGraph: {
      title: `${property.title} | ${property.location}`,
      description: `Price: ${priceFormatted}. Click to view full details on AVH.`,
      images: [
        {
          url: property.images[0], // WhatsApp uses the first image in your array
          width: 1200,
          height: 630,
          alt: property.title,
        },
      ],
    },
  };
}