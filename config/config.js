const { PrismaPg } = require("@prisma/adapter-pg");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();

const pg = new PrismaPg({
  connectionString: process.env.DATABASE_URL
});

const Prisma = new PrismaClient({
  adapter: pg
});

module.exports = { Prisma };
