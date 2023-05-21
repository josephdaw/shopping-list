const express = require('express');
const app = express();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.use(express.json());

// Define your API routes here

async function main() {
// await prisma.item.create({
//     data: {
//         name: 'Apple',
//         locations: {
//             create: {
//                 location: 'Fruit Section',
//                 store: {
//                     create: {
//                         name: 'Marion Coles',
//                         address: 'Level 2, Westfield Marion, SA'
//                     }
//                 }
//             }
//         }
//     }
// })

await prisma.item.update({
    where: {id: '3cb8cae3-62a7-4bf7-972a-421ea024e7a3'},
    data: {
        locations: {
            create: {
                location: 'Fresh Food Section',
                store: {
                    create: {
                        name: 'Coles Waradale',
                        address: 'Diagonal Road, Waradale'
                    }
                }
            }
        }
    }
})

const allItems = await prisma.item.findMany({
    include: {
        locations: true,
    }
})
console.dir(allItems, {depth: null})
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })

app.listen(PORT, async () => {
    // await prisma.$connect();
    console.log(`Server is running on http://localhost:${PORT}`);
});
