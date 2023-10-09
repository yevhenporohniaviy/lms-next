const { PrismaClient } = require('@prisma/client');

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: 'Computer science' },
        { name: 'Music' },
        { name: 'Fitnes' },
        { name: 'Photography' },
        { name: 'Accounting ' },
        { name: 'Enginnering' },
        { name: 'Filming' },
      ]
    })
    console.log('success')
  } catch (error) {
    console.log("Error seeding the database categories", error)
  } finally {
    await database.$disconnect();
  }
}

main();