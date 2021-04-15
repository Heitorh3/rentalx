export =[
  {
    name: 'default',
    type: 'postgres',
    host: process.env.POSTGRES_URL,
    port: 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASS,
    database: process.env.POSTGRES_DB,
    entities: ['src/modules/entities/**/*.ts'],
    migrations: ['src/shared/typeorm/migrations/*.ts'],
    cli: {
      migrationsDir: 'src/shared/typeorm/migrations/',
    },
  },
  {
    name: 'mongo',
    type: 'mongodb',
    host: process.env.MONGO_URL,
    port: 27017,
    username: process.env.MONGO_USER,
    password: process.env.MONGO_PASS,
    database: process.env.MONGO_DB,
    useUnifiedTopology: true,
    entities: ['src/modules/schemas/*.ts'],
  },
];
