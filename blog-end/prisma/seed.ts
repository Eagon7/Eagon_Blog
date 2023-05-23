import { PrismaClient } from '@prisma/client';
import { hash } from 'argon2';
import { Random } from 'mockjs';

const psm = new PrismaClient();
async function run() {
  await psm.user.create({
    data: {
      name: 'admin',
      password: await hash('admin888'),
    },
  });
  for (let i = 0; i < 50; i++) {
    await psm.article.create({
      data: {
        title: Random.ctitle(10, 30),
        content: Random.cparagraph(30, 50),
      },
    });
  }
}
run();
