import type { NextApiHandler } from 'next';
import prisma from '../../libs/prisma';

const handler: NextApiHandler = async (req, res) => {
  const {
    method,
    body,
    query: { id },
  } = req;

  switch (method) {
    case 'POST': {
      try {
        const newPlacement = await prisma.placement.create({
          data: { ...body },
        });
        res.status(200).json(newPlacement);
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
      }
      break;
    }
    case 'GET': {
      try {
        if (id) {
          const Placement = await prisma.placement.findUnique({
            where: { id: Number(id) },
          });
          res.status(200).json(Placement);
        } else {
          const Placements = await prisma.placement.findMany();
          res.status(200).json(Placements);
        }
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
      }
      break;
    }
    case 'PUT': {
      try {
        const updatedPlacement = await prisma.placement.update({
          where: { id: Number(id) },
          data: { ...body },
        });
        res.status(200).json(updatedPlacement);
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
      }
      break;
    }
    case 'DELETE': {
      try {
        const deletedPlacement = await prisma.placement.delete({
          where: { id: Number(id) },
        });
        res.status(200).json(deletedPlacement);
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
