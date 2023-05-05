import type { NextApiHandler } from "next"
import prisma from "../../libs/prisma"

const handler: NextApiHandler = async (req, res) => {
  const { method, body, query: { id, classroomId } } = req;

  switch (method) {
    case "POST": {
      try {
        const newCallOrder = await prisma.callOrder.create({ data: { ...body } })
        res.status(200).json(newCallOrder);
      } catch (error) {
        console.log(error)
        res.status(500).json(error)
      }
      break;
    }
    case "GET": {
      try {
        if (classroomId) {
          const callOrders = await prisma.callOrder.findMany({ where: { classroomId: Number(classroomId) }, include: { student: true } })
          res.status(200).json(callOrders);
        } else if (id) {
          const callOrder = await prisma.callOrder.findUnique({ where: { id: Number(id) } })
          res.status(200).json(callOrder);
        } else {
          const callOrders = await prisma.callOrder.findMany();
          res.status(200).json(callOrders);
        }
      } catch (error) {
        console.log(error)
        res.status(500).json(error)
      }
      break;
    }
    case "PUT": {
      try {
        const updatedCallOrder = await prisma.callOrder.update({
          where: { id: Number(id) },
          data: { ...body }
        });
        res.status(200).json(updatedCallOrder);
      } catch (error) {
        console.log(error)
        res.status(500).json(error)
      }
      break;
    }
    case "DELETE": {
      try {
        const deletedCallOrder = await prisma.callOrder.delete({ where: { id: Number(id) } });
        res.status(200).json(deletedCallOrder);
      } catch (error) {
        console.log(error)
        res.status(500).json(error)
      }
      break;
    }
    default:
      res.setHeader("Allow", ["POST", "GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export default handler
