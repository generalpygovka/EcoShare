const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const now = new Date();
  const passwordHash = await bcrypt.hash('EcoShareDemo123!', 12);

  await prisma.$transaction(async (db) => {
    for (const [n, letter] of [[1, 'А'], [2, 'Б']]) {
      const dormitoryId = `dorm-${n}`;
      const name = `Гуртожиток №${n}`;
      await db.dormitory.upsert({
        where: { id: dormitoryId },
        update: { name },
        create: { id: dormitoryId, name },
      });

      const id = `building-${n}`;
      const data = { name: `Корпус ${letter}`, dormitoryId };
      await db.building.upsert({
        where: { id }, update: data, create: { id, ...data },
      });
    }

    for (const [id, name] of [
      ['category-tools', 'Інструменти'],
      ['category-books', 'Книги'],
      ['category-other', 'Інше'],
    ]) {
      await db.category.upsert({
        where: { id }, update: { name }, create: { id, name },
      });
    }

    const users = [
      ['resident-demo', 'Демо мешканець', 'demo', 'resident'],
      ['resident-other', 'Інший мешканець', 'other', 'resident'],
      ['moderator-demo', 'Демо модератор', 'moderator', 'moderator'],
      ['admin-demo', 'Демо адміністратор', 'admin', 'admin'],
    ];

    for (const [id, displayName, login, role] of users) {
      const data = {
        displayName,
        email: `${login}@edu.kpi.ua`,
        passwordHash,
        role,
        buildingId: 'building-1',
        active: true,
        blockedUntil: null,
        contact: '@ecoshare_demo',
        notificationsEnabled: true,
      };
      await db.user.upsert({
        where: { id }, update: data, create: { id, ...data },
      });
    }

    const listings = [
      ['listing-drill', 'Дриль Bosch', 'Можу позичити дриль для ремонту.',
        'category-tools', 'building-1', 'available'],
      ['listing-book', 'Книга з програмування', 'Книга для вивчення програмування.',
        'category-books', 'building-2', 'reserved'],
      ['listing-hidden', 'Приховане оголошення', 'Це оголошення не повинно відображатися.',
        'category-other', 'building-1', 'hidden'],
      ['listing-closed', 'Закрите оголошення', 'Це оголошення вже закрите.',
        'category-other', 'building-2', 'closed'],
    ];

    for (const [i, row] of listings.entries()) {
      const [id, title, description, categoryId, buildingId, status] = row;
      const data = {
        title, description, categoryId, buildingId, status,
        ownerId: 'resident-demo',
        quantity: 1,
        condition: 'Добрий',
        createdAt: new Date(now.getTime() - i * 60_000),
        lastActivityAt: now,
      };
      await db.listing.upsert({
        where: { id }, update: data, create: { id, ...data },
      });
    }
  });

  console.log('Демонстраційні дані записано до PostgreSQL.');
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());