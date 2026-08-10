import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { services, packages, team } from "../src/lib/site-data";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.SEED_ADMIN_EMAIL;
  const password = process.env.SEED_ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error(
      "Set SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD in your .env before seeding."
    );
  }

  const passwordHash = await bcrypt.hash(password, 12);
  await prisma.adminUser.upsert({
    where: { email },
    update: {},
    create: { email, passwordHash, name: "Bonface Otieno Odhiambo" },
  });
  console.log(`Admin account ready: ${email}`);

  for (const [i, s] of services.entries()) {
    await prisma.service.upsert({
      where: { id: `seed-service-${i}` },
      update: { name: s.name, description: s.description, order: i },
      create: { id: `seed-service-${i}`, name: s.name, description: s.description, order: i },
    });
  }
  console.log(`Seeded ${services.length} services.`);

  for (const [i, p] of packages.entries()) {
    await prisma.partnershipPackage.upsert({
      where: { id: `seed-package-${i}` },
      update: { tier: p.tier, priceKsh: p.priceKsh, benefits: p.benefits.join("\n"), order: i },
      create: {
        id: `seed-package-${i}`,
        tier: p.tier,
        priceKsh: p.priceKsh,
        benefits: p.benefits.join("\n"),
        order: i,
      },
    });
  }
  console.log(`Seeded ${packages.length} partnership packages.`);

  for (const [i, m] of team.entries()) {
    await prisma.teamMember.upsert({
      where: { id: `seed-team-${i}` },
      update: { name: m.name, role: m.role, bio: m.bio, order: i },
      create: { id: `seed-team-${i}`, name: m.name, role: m.role, bio: m.bio, order: i },
    });
  }
  console.log(`Seeded ${team.length} team members.`);

  await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: {},
    create: { id: "singleton" },
  });

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
