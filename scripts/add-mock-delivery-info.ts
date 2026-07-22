import { PrismaClient, DeliveryType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const products = await prisma.product.findMany();

  for (const product of products) {
    let deliveryInfo = {};
    
    switch (product.deliveryType) {
      case DeliveryType.LICENSE_KEY:
        deliveryInfo = {
          productKey: "ABCD-EFGH-IJKL-MNOP",
          instructions: "Please enter this key during the installation process to activate your product."
        };
        break;
      case DeliveryType.ACCOUNT_CREDENTIALS:
      case DeliveryType.SUBSCRIPTION_ACCESS:
        deliveryInfo = {
          loginEmail: "demo_user@example.com",
          password: "SuperSecretPassword123!",
          duration: "1 Year",
          notes: "Please do not share these credentials. Changing the password will void your warranty."
        };
        break;
      case DeliveryType.DOWNLOAD_FILE:
        deliveryInfo = {
          downloadLink: "https://example.com/download/file.zip",
          instructions: "Click the link above to download your file. Extract the ZIP archive using WinRAR or 7-Zip."
        };
        break;
      default:
        deliveryInfo = {
          notes: "Access granted."
        };
    }

    await prisma.product.update({
      where: { id: product.id },
      data: { deliveryInfo }
    });
    console.log(`Updated ${product.name} with mock delivery info`);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
