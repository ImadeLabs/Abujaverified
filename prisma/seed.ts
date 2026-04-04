const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient(); // <--- THIS WAS THE MISSING KEY!

async function main() {
  console.log("Starting to put elite houses in the box...");

  const properties = [
    {
      title: "5 Bed Fully Detached + Penthouse - Elite Residence",
      price: 75000000,
      location: "Asokoro Extension, Abuja",
      description: "FCDA Approved. Luxury living behind NAF Valley. Landmarks: Army Estate, NAF Valley Estate. Estate Facilities: Perimeter Fence, 24hr Security, Asphalt Road Network, Underground Power Supply.",
      status: "VERIFIED",
      images: ["https://placehold.co/600x400?text=Elite+Asokoro"]
    },
    {
      title: "3 Bedroom Terrace Duplex - Solaris Court",
      price: 14000000,
      location: "Lifecamp, Abuja",
      description: "FCDA Approved 150SQM Terrace Duplex in the heart of Lifecamp. Outright price N14M.",
      status: "VERIFIED",
      images: ["https://placehold.co/600x400?text=Solaris+Lifecamp"]
    },
    {
      title: "5 Bedroom Fully Detached - Downtown Golf Resort",
      price: 4400000,
      location: "Kuje, Abuja",
      description: "After Handmaids Girls Secondary School. Gated community with Polo Golf Resort access, recreational areas, and schools.",
      status: "VERIFIED",
      images: ["https://placehold.co/600x400?text=Kuje+Golf+Resort"]
    },
    {
        title: "4/5 Bedroom Fully Detached Duplex - Monarch Residence",
        price: 7000000,
        location: "Kuje, Abuja",
        description: "Special giveaway promo at Kuchiyako Layout. 50% Mega Promo on every plot. Close to Navy Estate Kuje.",
        status: "VERIFIED",
        images: ["https://placehold.co/600x400?text=Monarch+Kuje"]
    }
  ];

  for (const p of properties) {
    await prisma.property.create({ data: p });
  }

  console.log("Mission Accomplished! All new Elite properties are in the box.");
}

main()
  .catch((e) => {
    console.error("ALARM! Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });