## Quick Start

1. Clone the repository

```
git clone git@github.com:jenaym/Project-3.git
cd Project-3
```

2. Install dependencies

```
npm install
npm install sequelize sequelize-cli mysql2 -g
```

3. Run `schema.sql`

4. Edit `config.js` with database configs

5. Run migration and seeding

```
sequelize db:migrate
sequelize db:seed:all
```

6. Launch Project-3

```
node server
```

---

Troubleshooting

To undo a migration or seeding, run the following:

```
sequelize db:migrate:undo:all
sequelize db:seed:undo:all
```
