import type { NextApiHandler } from 'next';
import prisma from '../../libs/prisma';

const handler: NextApiHandler = async (req, res) => {
  const {
    method,
    body,
    query: { id, classroomId },
  } = req;

  switch (method) {
    case 'POST': {
      try {
        const newDesk = await prisma.desk.create({ data: { ...body } });
        const callbySeatNumber = await prisma.callOrder.findMany({
          where: {
            classroomId: Number(newDesk.classroomId),
            seatNumber: Number(newDesk.seatNumber),
          },
        });
        if (callbySeatNumber) {
          await prisma.callOrder.deleteMany({
            where: {
              classroomId: Number(newDesk.classroomId),
              seatNumber: Number(newDesk.seatNumber),
            },
          });
        }
        res.status(200).json(newDesk);
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
      }
      break;
    }
    case 'GET': {
      try {
        if (classroomId) {
          const desks = await prisma.desk.findMany({
            where: {
              classroomId: Number(classroomId),
            },
            include: {
              student: true,
            },
            orderBy: {
              id: 'desc',
            },
          });
          res.status(200).json(desks);
        } else if (id) {
          const desk = await prisma.desk.findUnique({
            where: { id: Number(id) },
          });
          res.status(200).json(desk);
        } else {
          const desks = await prisma.desk.findMany();
          res.status(200).json(desks);
        }
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
      }
      break;
    }
    case 'PUT': {
      try {
        const updatedDesk = await prisma.desk.update({
          where: { id: Number(id) },
          data: { ...body },
        });
        res.status(200).json(updatedDesk);
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
      }
      break;
    }
    case 'DELETE': {
      try {
        const deletedDesk = await prisma.desk.delete({
          where: { id: Number(id) },
        });
        res.status(200).json(deletedDesk);
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
      }
      break;
    }
    default:
      res.setHeader('Allow', ['POST', 'GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
