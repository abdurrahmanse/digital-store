import { PrismaClient, ProductType, DeliveryType, ProductStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

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
      name: 'ChatGPT Plus (1 Month)',
      slug: 'chatgpt-plus',
      shortDescription: 'Access to OpenAI\'s most advanced AI model.',
      description: 'Experience the power of GPT-4, faster response times, and exclusive access to new features like Advanced Data Analysis and Plugins. Monthly subscription.',
      price: 2000,
      discountPrice: null,
      imageUrl: '/images/demo-chatgpt.png',
      categoryId: subscriptions.id,
      productType: ProductType.SUBSCRIPTION,
      deliveryType: DeliveryType.SUBSCRIPTION_ACCESS,
      status: ProductStatus.PUBLISHED,
      isActive: true,
      isFeatured: true,
      stock: null
    },
    {
      name: 'Claude Pro (1 Month)',
      slug: 'claude-pro',
      shortDescription: 'Advanced reasoning and larger context windows.',
      description: 'Upgrade to Claude Pro for 5x more usage than the free tier. Enjoy priority access during high-traffic periods and early access to new features. Monthly subscription.',
      price: 2000,
      discountPrice: null,
      imageUrl: '/images/demo-claude.png',
      categoryId: subscriptions.id,
      productType: ProductType.SUBSCRIPTION,
      deliveryType: DeliveryType.SUBSCRIPTION_ACCESS,
      status: ProductStatus.PUBLISHED,
      isActive: true,
      isFeatured: false,
      stock: null
    },
    {
      name: 'Cursor Pro (1 Month)',
      slug: 'cursor-pro',
      shortDescription: 'The AI-first code editor for extreme productivity.',
      description: 'Get unlimited fast premium requests (GPT-4, Claude 3.5 Sonnet) to auto-write, refactor, and debug your code seamlessly in your editor. Monthly subscription.',
      price: 2000,
      discountPrice: 1600,
      imageUrl: '/images/demo-cursor.png',
      categoryId: subscriptions.id,
      productType: ProductType.SUBSCRIPTION,
      deliveryType: DeliveryType.SUBSCRIPTION_ACCESS,
      status: ProductStatus.PUBLISHED,
      isActive: true,
      isFeatured: true,
      stock: null
    },
    {
      name: 'Google AI Pro (Gemini)',
      slug: 'google-ai-pro',
      shortDescription: 'Gemini Advanced + 2TB Google Cloud Storage.',
      description: 'Access Google\'s most capable AI model, Gemini Advanced, integrated directly into Gmail, Docs, and more, plus 2TB of secure cloud storage. Monthly subscription.',
      price: 1999,
      discountPrice: null,
      imageUrl: '/images/demo-gemini.png',
      categoryId: subscriptions.id,
      productType: ProductType.SUBSCRIPTION,
      deliveryType: DeliveryType.SUBSCRIPTION_ACCESS,
      status: ProductStatus.PUBLISHED,
      isActive: true,
      isFeatured: false,
      stock: null
    },
    {
      name: 'Canva Pro (1 Year)',
      slug: 'canva-pro',
      shortDescription: 'Unlock premium templates, tools, and assets.',
      description: 'Design like a professional with Canva Pro. Access millions of premium photos, videos, and templates, plus advanced tools like Magic Resize and Background Remover. Yearly subscription.',
      price: 11999,
      discountPrice: 9999,
      imageUrl: '/images/demo-canva.png',
      categoryId: creativeLearning.id,
      productType: ProductType.SUBSCRIPTION,
      deliveryType: DeliveryType.SUBSCRIPTION_ACCESS,
      status: ProductStatus.PUBLISHED,
      isActive: true,
      isFeatured: true,
      stock: null
    },
    {
      name: 'CapCut Pro (1 Month)',
      slug: 'capcut-pro',
      shortDescription: 'Advanced video editing features and effects.',
      description: 'Elevate your videos with CapCut Pro. Unlock premium transitions, filters, text effects, and pro-level editing tools without watermarks. Monthly subscription.',
      price: 999,
      discountPrice: 799,
      imageUrl: '/images/demo-capcut.png',
      categoryId: creativeLearning.id,
      productType: ProductType.SUBSCRIPTION,
      deliveryType: DeliveryType.SUBSCRIPTION_ACCESS,
      status: ProductStatus.PUBLISHED,
      isActive: true,
      isFeatured: false,
      stock: null
    },
    {
      name: 'Adobe Creative Cloud All Apps',
      slug: 'adobe-cc-all-apps',
      shortDescription: 'The ultimate toolkit for creative professionals.',
      description: 'Get 20+ creative apps including Photoshop, Illustrator, Premiere Pro, and After Effects. Includes 100GB of cloud storage and Adobe Fonts. Yearly subscription.',
      price: 65988,
      discountPrice: 59900,
      imageUrl: '/images/demo-adobe-cc.png',
      categoryId: creativeLearning.id,
      productType: ProductType.SUBSCRIPTION,
      deliveryType: DeliveryType.SUBSCRIPTION_ACCESS,
      status: ProductStatus.PUBLISHED,
      isActive: true,
      isFeatured: true,
      stock: null
    },
    {
      name: 'Adobe Premiere Pro',
      slug: 'adobe-premiere-pro',
      shortDescription: 'Industry-standard pro video and film editing.',
      description: 'Edit your videos with precision using Adobe Premiere Pro. Features powerful AI tools, seamless integration with other Adobe apps, and robust format support. Yearly subscription.',
      price: 25188,
      discountPrice: null,
      imageUrl: '/images/demo-premiere.png',
      categoryId: creativeLearning.id,
      productType: ProductType.SUBSCRIPTION,
      deliveryType: DeliveryType.SUBSCRIPTION_ACCESS,
      status: ProductStatus.PUBLISHED,
      isActive: true,
      isFeatured: false,
      stock: null
    },
    {
      name: 'Microsoft 365 Personal',
      slug: 'microsoft-365-personal',
      shortDescription: 'Premium Office apps and 1TB cloud storage.',
      description: 'Enhance your productivity with premium versions of Word, Excel, PowerPoint, and Outlook. Includes 1TB of OneDrive cloud storage and advanced security. Yearly subscription.',
      price: 6999,
      discountPrice: 5999,
      imageUrl: '/images/demo-m365.png',
      productType: ProductType.SUBSCRIPTION,
      deliveryType: DeliveryType.SUBSCRIPTION_ACCESS,
      status: ProductStatus.PUBLISHED,
      isActive: true,
      isFeatured: false,
      stock: null
    },
    {
      name: 'Windows 11 Pro',
      slug: 'windows-11-pro',
      shortDescription: 'Lifetime license for Windows 11 Professional.',
      description: 'Upgrade your PC with Windows 11 Pro. Experience enhanced security, productivity tools, and a beautiful new interface. Genuine lifetime license for 1 PC.',
      price: 19900,
      discountPrice: 4900,
      imageUrl: '/images/demo-win11.png',
      productType: ProductType.LICENSE,
      deliveryType: DeliveryType.LICENSE_KEY,
      status: ProductStatus.PUBLISHED,
      isActive: true,
      isFeatured: true,
      stock: 500
    }
  ];

  for (const product of products) {
    await prisma.product.create({
      data: product
    });
  }

  console.log('10 Demo products created successfully!');

  // 3. Create Bangladeshi Demo Users (Development Only)
  if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
    console.log('Creating Bangladeshi demo users...');

    const demoUsers = [
      { name: 'Abdur Rahman', email: 'learn.abdurrahman@gmail.com', role: 'ADMIN' },
      { name: 'Tanvir Hasan', email: 'tanvir.hasan@example.com', role: 'USER' },
      { name: 'Mahmudul Hasan', email: 'mahmudul.hasan@example.com' },
      { name: 'Nusrat Jahan', email: 'nusrat.jahan@example.com' },
      { name: 'Mehedi Hasan', email: 'mehedi.hasan@example.com' },
    ];

    const hashedPassword = await bcrypt.hash('Test@1234', 10);

    for (const user of demoUsers) {
      await prisma.user.upsert({
        where: { email: user.email },
        update: {
          name: user.name,
          password: hashedPassword,
          emailVerified: new Date(),
          role: user.role === 'ADMIN' ? 'ADMIN' : 'USER',
        },
        create: {
          name: user.name,
          email: user.email,
          password: hashedPassword,
          emailVerified: new Date(),
          role: user.role === 'ADMIN' ? 'ADMIN' : 'USER',
        },
      });
    }
    console.log('5 Bangladeshi demo users created successfully!');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
