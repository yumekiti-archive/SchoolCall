import type { NextApiHandler } from 'next';
import prisma from '../../libs/prisma';

const handler: NextApiHandler = async (req, res) => {
  const {
    method,
    body,
    query: { id, classroomId, seatNumber },
  } = req;

  switch (method) {
    case 'POST': {
      try {
        const existingDesk = await prisma.desk.findFirst({
          where: {
            seatNumber: body.seatNumber,
            classroomId: body.classroomId,
          },
          orderBy: {
            id: 'desc',
          },
        });

        if (!existingDesk) return res.status(200).json({ status: 'noDesk' });
        else if (existingDesk.studentId !== body.studentId) return res.status(200).json({ status: 'noStudent' });

        const existingCallOrder = await prisma.callOrder.findFirst({
          where: {
            status: false,
            seatNumber: body.seatNumber,
            classroomId: body.classroomId,
            createdAt: { gte: new Date(new Date().setHours(0, 0, 0, 0)) },
          },
        });

        if (existingCallOrder) {
          if (existingCallOrder.studentId !== body.studentId) {
            await prisma.callOrder.update({
              where: { id: existingCallOrder.id },
              data: { status: true },
            });
          } else {
            res.status(200).json({ status: 'already' });
            return;
          }
        }

        const newCallOrder = await prisma.callOrder.create({
          data: { ...body },
        });

        res.status(200).json(newCallOrder);
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
      }
      break;
    }
    case 'GET': {
      try {
        if (seatNumber) {
          const callOrder = await prisma.callOrder.findFirst({
            where: {
              status: false,
              seatNumber: Number(seatNumber),
              createdAt: { gte: new Date(new Date().setHours(0, 0, 0, 0)) },
            },
          });
          res.status(200).json(callOrder);
        } else if (classroomId) {
          const callOrders = await prisma.callOrder.findMany({
            where: { classroomId: Number(classroomId), createdAt: { gte: new Date(new Date().setHours(0, 0, 0, 0)) } },
            include: { student: true },
            orderBy: {
              id: 'desc',
            },
          });
          res.status(200).json(callOrders);
        } else if (id) {
          const callOrder = await prisma.callOrder.findUnique({
            where: { id: Number(id) },
          });
          res.status(200).json(callOrder);
        } else {
          const callOrders = await prisma.callOrder.findMany({
            where: { createdAt: { gte: new Date(new Date().setHours(0, 0, 0, 0)) } },
          });
          res.status(200).json(callOrders);
        }
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
      }
      break;
    }
    case 'PUT': {
      try {
        const updatedCallOrder = await prisma.callOrder.update({
          where: { id: Number(id) },
          data: { ...body },
        });
        res.status(200).json(updatedCallOrder);
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
      }
      break;
    }
    case 'DELETE': {
      try {
        const deletedCallOrder = await prisma.callOrder.delete({
          where: { id: Number(id) },
        });
        res.status(200).json(deletedCallOrder);
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
