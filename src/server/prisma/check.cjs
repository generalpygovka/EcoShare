const assert = require('node:assert/strict');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const expected = {
    'listing-drill': 'available',
    'listing-book': 'reserved',
    'listing-hidden': 'hidden',
    'listing-closed': 'closed',
  };

  const listings = await prisma.listing.findMany({
    where: { id: { in: Object.keys(expected) } },
    include: {
      owner: { select: { id: true } },
      category: { select: { name: true } },
      building: {
        select: { dormitory: { select: { name: true } } },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  assert.equal(listings.length, 4);
  for (const item of listings) {
    assert.equal(item.status, expected[item.id]);
    assert.equal(item.owner.id, 'resident-demo');
    assert.ok(item.category.name);
    assert.ok(item.building.dormitory.name);
  }

  const roles = {
    'resident-demo': 'resident',
    'resident-other': 'resident',
    'moderator-demo': 'moderator',
    'admin-demo': 'admin',
  };
  const users = await prisma.user.findMany({
    where: { id: { in: Object.keys(roles) } },
    select: { id: true, role: true, active: true, passwordHash: true },
  });

  assert.equal(users.length, 4);
  for (const user of users) {
    assert.equal(user.role, roles[user.id]);
    assert.equal(user.active, true);
    assert.equal(await bcrypt.compare('EcoShareDemo123!', user.passwordHash), true);
  }

  console.table(listings.map(({ title, status }) => ({ title, status })));
  console.log('Перевірки даних PostgreSQL пройдено.');
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());