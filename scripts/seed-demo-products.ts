import { PrismaClient, ProductType, DeliveryType, ProductStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed process...');

  // First, clear existing categories and products
  console.log('Cleaning up existing demo data...');
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});

  // 1. Create Categories
  console.log('Creating categories...');

  const subscriptions = await prisma.category.create({
    data: { name: 'Subscriptions', slug: 'subscriptions', imageUrl: '/images/cat-subscriptions.jpg' }
  });
  const webHosting = await prisma.category.create({
    data: { name: 'Web & Hosting', slug: 'web-hosting', imageUrl: '/images/cat-hosting.jpg' }
  });
  const creativeLearning = await prisma.category.create({
    data: { name: 'Creative & Learning', slug: 'creative-learning', imageUrl: '/images/cat-creative.jpg' }
  });

  console.log('Categories created successfully.');

  // 2. Create 10 Demo Products
  console.log('Creating 10 demo products...');
  const products = [
    {
      name: 'Windows 11 Pro',
      slug: 'windows-11-pro',
      shortDescription: 'Instant delivery of genuine Windows 11 Professional license key.',
      description: 'Upgrade your PC with Windows 11 Pro. Experience enhanced security, productivity tools, and a beautiful new interface. Genuine lifetime license for 1 PC.',
      price: 2900,
      discountPrice: 19900,
      imageUrl: '/images/p1.jpg',
      productType: ProductType.LICENSE,
      deliveryType: DeliveryType.LICENSE_KEY,
      status: ProductStatus.PUBLISHED,
      isActive: true,
      stock: 100
    },
    {
      name: 'JetBrains All Products Pack (1 Year)',
      slug: 'jetbrains-pack',
      shortDescription: '1-year subscription for all JetBrains desktop tools.',
      description: 'Get full access to IntelliJ IDEA, WebStorm, PyCharm, and all other JetBrains IDEs. Perfect for full-stack developers.',
      price: 14900,
      discountPrice: null,
      imageUrl: '/images/p2.jpg',
      productType: ProductType.SUBSCRIPTION,
      deliveryType: DeliveryType.SUBSCRIPTION_ACCESS,
      status: ProductStatus.PUBLISHED,
      isActive: true,
      stock: null
    },
    {
      name: 'Premium VPS Hosting - 8GB RAM',
      slug: 'vps-8gb',
      shortDescription: 'High-performance VPS with NVMe storage.',
      description: 'Supercharge your web applications with our 8GB RAM, 4 vCPU, and 160GB NVMe storage VPS. Includes 1 dedicated IP and full root access.',
      price: 1200,
      discountPrice: 2400,
      imageUrl: '/images/p3.jpg',
      categoryId: webHosting.id,
      productType: ProductType.SUBSCRIPTION,
      deliveryType: DeliveryType.ACCOUNT_CREDENTIALS,
      status: ProductStatus.PUBLISHED,
      isActive: true,
      stock: null
    },
    {
      name: 'Adobe Creative Cloud (1 Year)',
      slug: 'adobe-cc',
      shortDescription: '1-year subscription to Photoshop, Illustrator, Premiere Pro, and more.',
      description: 'Unlock your creative potential with the complete Adobe Creative Cloud suite. Includes cloud storage and Adobe Fonts.',
      price: 29900,
      discountPrice: 59900,
      imageUrl: '/images/p1.jpg',
      categoryId: creativeLearning.id,
      productType: ProductType.SUBSCRIPTION,
      deliveryType: DeliveryType.SUBSCRIPTION_ACCESS,
      status: ProductStatus.PUBLISHED,
      isActive: true,
      stock: 50
    },
    {
      name: 'ExpressVPN 12-Month Subscription',
      slug: 'expressvpn-1yr',
      shortDescription: 'Fast and secure VPN service for 1 year.',
      description: 'Protect your online privacy and access blocked content anywhere with ExpressVPN. Connect up to 5 devices simultaneously.',
      price: 9900,
      discountPrice: null,
      imageUrl: '/images/p2.jpg',
      categoryId: subscriptions.id,
      productType: ProductType.SUBSCRIPTION,
      deliveryType: DeliveryType.SUBSCRIPTION_ACCESS,
      status: ProductStatus.PUBLISHED,
      isActive: true,
      stock: null
    },
    {
      name: 'Mastering React 19 E-Book',
      slug: 'react-ebook',
      shortDescription: 'The ultimate guide to modern React development.',
      description: 'Learn React 19 from scratch, including Server Components, Actions, and concurrent rendering. Includes code examples and projects.',
      price: 4900,
      discountPrice: null,
      imageUrl: '/images/p3.jpg',
      categoryId: creativeLearning.id,
      productType: ProductType.DOWNLOAD,
      deliveryType: DeliveryType.SUBSCRIPTION_ACCESS,
      status: ProductStatus.PUBLISHED,
      isActive: true,
      stock: null
    },
    {
      name: 'Microsoft Office 2021 Professional Plus',
      slug: 'office-2021',
      shortDescription: 'Lifetime license for Office 2021 apps.',
      description: 'Includes Word, Excel, PowerPoint, Outlook, Publisher, and Access. One-time purchase for 1 PC.',
      price: 4900,
      discountPrice: 34900,
      imageUrl: '/images/p1.jpg',
      productType: ProductType.LICENSE,
      deliveryType: DeliveryType.SUBSCRIPTION_ACCESS,
      status: ProductStatus.PUBLISHED,
      isActive: true,
      stock: 500
    },
    {
      name: 'Figma Professional (1 Year)',
      slug: 'figma-pro',
      shortDescription: 'Collaborative interface design tool.',
      description: 'Upgrade to Figma Pro for advanced team collaboration, unlimited version history, and custom file permissions.',
      price: 14400,
      discountPrice: null,
      imageUrl: '/images/p2.jpg',
      categoryId: creativeLearning.id,
      productType: ProductType.SUBSCRIPTION,
      deliveryType: DeliveryType.SUBSCRIPTION_ACCESS,
      status: ProductStatus.PUBLISHED,
      isActive: true,
      stock: null
    },
    {
      name: 'Node.js API Masterclass',
      slug: 'nodejs-masterclass',
      shortDescription: 'Learn to build robust APIs with Node.js and Express.',
      description: 'A comprehensive video course and project files to teach you everything about building secure, scalable backend services.',
      price: 3900,
      discountPrice: null,
      imageUrl: '/images/p3.jpg',
      categoryId: creativeLearning.id,
      productType: ProductType.DOWNLOAD,
      deliveryType: DeliveryType.SUBSCRIPTION_ACCESS,
      status: ProductStatus.PUBLISHED,
      isActive: true,
      stock: null
    },
    {
      name: 'NordVPN 2-Year Plan',
      slug: 'nordvpn-2yr',
      shortDescription: 'Secure your internet with a 2-year VPN plan.',
      description: 'Advanced security features, malware protection, and high-speed servers in over 60 countries.',
      price: 8900,
      discountPrice: 19900,
      imageUrl: '/images/p1.jpg',
      categoryId: subscriptions.id,
      productType: ProductType.SUBSCRIPTION,
      deliveryType: DeliveryType.SUBSCRIPTION_ACCESS,
      status: ProductStatus.PUBLISHED,
      isActive: true,
      stock: null
    }
  ];

  for (const product of products) {
    await prisma.product.create({
      data: product
    });
  }

  console.log('10 Demo products created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
