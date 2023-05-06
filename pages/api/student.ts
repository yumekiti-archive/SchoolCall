import type { NextApiHandler } from 'next';
import prisma from '../../libs/prisma';

const handler: NextApiHandler = async (req, res) => {
  const {
    method,
    body,
    query: { id, studentNumber },
  } = req;

  switch (method) {
    case 'POST': {
      try {
        const newStudent = await prisma.student.create({ data: { ...body } });
        res.status(200).json(newStudent);
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
      }
      break;
    }
    case 'GET': {
      try {
        if (studentNumber) {
          const student = await prisma.student.findUnique({
            where: { studentNumber: Number(studentNumber) },
          });
          res.status(200).json(student);
        } else if (id) {
          const student = await prisma.student.findUnique({
            where: { id: Number(id) },
          });
          res.status(200).json(student);
        } else {
          const students = await prisma.student.findMany();
          res.status(200).json(students);
        }
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
      }
      break;
    }
    case 'PUT': {
      try {
        const updatedStudent = await prisma.student.update({
          where: { id: Number(id) },
          data: { ...body },
        });
        res.status(200).json(updatedStudent);
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
      }
      break;
    }
    case 'DELETE': {
      try {
        const deletedStudent = await prisma.student.delete({
          where: { id: Number(id) },
        });
        res.status(200).json(deletedStudent);
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
