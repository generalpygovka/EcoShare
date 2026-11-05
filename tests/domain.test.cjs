
const { test } = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');

const dist = path.join(__dirname, '..', 'src', 'server', 'dist');

const { Guest, Resident } = require(
    path.join(dist, 'modules/auth-users/user.entity.js')
);

const { Listing } = require(
    path.join(dist, 'modules/listings/listing.entity.js')
);

const { ListingsService } = require(
    path.join(dist, 'modules/listings/listings.service.js')
);

// Тест 1. Перевірка наслідування класів
test('Resident inherits Guest behavior', () => {
    const resident = new Resident(
        'resident-1',
        'Олена',
        'olena@example.com',
        '1',
        '@olena'
    );

    assert.ok(resident instanceof Guest);
    assert.equal(resident.getDisplayName(), 'Олена');
});

// Тест 2. Перевірка назви оголошення
test('Listing rejects empty title', () => {
    assert.throws(() => {
        new Listing(
            'listing-1',
            'resident-1',
            '   ',
            'Опис',
            'Інструменти',
            'Гуртожиток №1'
        );
    }, /Назва/);
});

// Тест 3. Робота з підставним репозиторієм
test('Service works with repository contract', () => {
    const repository = {
        findAll() {
            return [
                new Listing(
                    'listing-1',
                    'resident-1',
                    'Дриль Bosch',
                    'Опис дриля',
                    'Інструменти',
                    'Гуртожиток №1',
                    'available'
                )
            ];
        }
    };

    const users = {
        findPublicById(id) {
            return {
                id,
                displayName: 'Олена',
                dormitory: '1'
            };
        }
    };

    const service = new ListingsService(repository, users);
    const result = service.list();

    assert.equal(result.length, 1);
    assert.equal(result[0].title, 'Дриль Bosch');
    assert.equal(result[0].ownerName, 'Олена');
});

// Тест 4. Перевірка фільтрації станів
test('Service excludes hidden and closed listings', () => {
    const statuses = [
        'available',
        'reserved',
        'hidden',
        'closed'
    ];

    const repository = {
        findAll() {
            return statuses.map((status, index) =>
                new Listing(
                    `listing-${index}`,
                    'resident-1',
                    `Оголошення ${index}`,
                    'Тестовий опис',
                    'Інше',
                    'Гуртожиток №1',
                    status
                )
            );
        }
    };

    const users = {
        findPublicById(id) {
            return {
                id,
                displayName: 'Олена',
                dormitory: '1'
            };
        }
    };

    const service = new ListingsService(repository, users);
    const result = service.list();

    assert.deepEqual(
        result.map(item => item.status),
        ['available', 'reserved']
    );
});
