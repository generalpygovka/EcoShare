
const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');

const { createApp } = require(
    path.join(__dirname, '..', 'src', 'server', 'dist', 'create-app.js')
);

let app;
let base;

before(async () => {
    app = await createApp();
    await app.listen(0, '127.0.0.1');
    base = await app.getUrl();
});

after(async () => {
    if (app) {
        await app.close();
    }
});

// Тест 1. Перевірка стану сервера
test('Health endpoint returns OK', async () => {
    const response = await fetch(`${base}/api/health`);
    const data = await response.json();

    assert.equal(response.status, 200);
    assert.equal(data.status, 'ok');
    assert.equal(data.project, 'EcoShare');
});

// Тест 2. Перевірка списку оголошень
test('Listings API returns visible listings', async () => {
    const response = await fetch(`${base}/api/listings`);
    const data = await response.json();

    assert.equal(response.status, 200);
    assert.equal(data.length, 2);

    assert.deepEqual(
        data.map(item => item.status),
        ['available', 'reserved']
    );
});

// Тест 3. Перевірка пошуку
test('Search is case insensitive', async () => {
    const response = await fetch(
        `${base}/api/listings?search=${encodeURIComponent('ДРИЛЬ')}`
    );

    const data = await response.json();

    assert.equal(response.status, 200);
    assert.equal(data.length, 1);
    assert.equal(data[0].title, 'Дриль Bosch');
});

// Тест 4. Перевірка публічних полів
test('Listings expose only public fields', async () => {
    const response = await fetch(`${base}/api/listings`);
    const data = await response.json();

    const expectedFields = [
        'category',
        'description',
        'dormitory',
        'id',
        'ownerName',
        'status',
        'title'
    ];

    assert.deepEqual(
        Object.keys(data[0]).sort(),
        expectedFields
    );
});

// Тест 5. Захист контактних даних
test('Demo user does not expose private data', async () => {
    const response = await fetch(`${base}/api/users/demo`);
    const data = await response.json();

    assert.equal(response.status, 200);
    assert.equal(data.displayName, 'Демо мешканець');

    assert.equal('email' in data, false);
    assert.equal('contact' in data, false);
});

// Тест 6. Перевірка некоректного запиту
test('Repeated search parameter returns 400', async () => {
    const response = await fetch(
        `${base}/api/listings?search=one&search=two`
    );

    assert.equal(response.status, 400);
});
