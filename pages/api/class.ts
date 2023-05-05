import type { NextApiHandler } from "next"
import prisma from "../../libs/prisma"

const handler: NextApiHandler = async (req, res) => {
  const { method, body, query: { id, className } } = req;

  switch (method) {
    case "POST": {
      try {
        const newClass = await prisma.class.create({ data: { ...body } })
        res.status(200).json(newClass);
      } catch (error) {
        console.log(error)
        res.status(500).json(error)
      }
      break;
    }
    case "GET": {
      try {
        if (className) {
          const Class = await prisma.class.findUnique({ where: { name: String(className) } })
          res.status(200).json(Class);
        } else if (id) {
          const Class = await prisma.class.findUnique({ where: { id: Number(id) } })
          res.status(200).json(Class);
        } else {
          const classes = await prisma.class.findMany();
          res.status(200).json(classes);
        }
      } catch (error) {
        console.log(error)
        res.status(500).json(error)
      }
      break;
    }
    case "PUT": {
      try {
        if (className) {
          const updatedClass = await prisma.class.update({
            where: { id: Number(id) },
            data: { ...body, class: { connectOrCreate: { where: { name: className }, create: { name: className } } } }
          })
          return res.status(200).json(updatedClass);
        } else {
          const updatedClass = await prisma.class.update({ where: { id: Number(id) }, data: { ...body } })
          return res.status(200).json(updatedClass);
        }
      } catch (error) {
        console.log(error)
        res.status(500).json(error)
      }
      break;
    }
    case "DELETE": {
      try {
        const deletedClass = await prisma.class.delete({ where: { id: Number(id) } });
        res.status(200).json(deletedClass);
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

