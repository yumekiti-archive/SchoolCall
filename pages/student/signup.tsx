// model Student {
//   id               Int         @id @default(autoincrement())
//   name             String
//   studentNumber    Int
//   attendanceNumber Int
//   classId          Int?
//   createdAt        DateTime    @default(now())
//   updatedAt        DateTime    @updatedAt
//   Desk             Desk[]
//   CallOrder        CallOrder[]
//   Class            Class?      @relation(fields: [classId], references: [id])
// }

import Layout from "@/components/template/Layout"

import { useState } from "react"

import { useRouter } from "next/router"

import { useCreateStudent } from "@/hooks/useStudent"

import { useReadClassByName } from "@/hooks/useClass"

const StudentRegister = () => {
  const { createStudent } = useCreateStudent()
  const { readClassByName } = useReadClassByName()
  const router = useRouter()

  const [ name, setName ] = useState<string>('山田 太郎')
  const [ studentNumber, setStudentNumber ] = useState<number>(220000)
  const [ attendanceNumber, setAttendanceNumber ] = useState<number>(1)
  const [ className, setClassName ] = useState<string>('IE3A')

  const handleClick = () => {
    readClassByName(className).then((data) => {
      if (!data) alert('クラス名が間違っているか、存在しません')
      else {
        const body = {
          name,
          studentNumber,
          attendanceNumber,
          classId: data.id,
        }

        createStudent(body).then((data) => {
          localStorage.setItem('studentNumber', data.studentNumber)
          router.push('/student')
        })
      }
    })
  }

  return (
    <Layout title='順番管理' href='/student'>
      <div className='w-full h-full flex justify-center items-center'>
        <div className='w-11/12 h-4/6 md:w-1/2 md:h-1/2 bg-white rounded-lg shadow-lg flex flex-col justify-evenly items-center'>
          <div className='flex justify-evenly items-center bg-gray-200 w-8/12 h-1/6 rounded-lg'>
            <span>名前</span>
            <input type="text" className='w-1/2 rounded-lg p-1' defaultValue={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className='flex justify-evenly items-center bg-gray-200 w-8/12 h-1/6 rounded-lg'>
            <span>クラス名</span>
            <input type="text" className='w-1/2 rounded-lg p-1' defaultValue={className} onChange={(e) => setClassName(e.target.value)} />
          </div>
          <div className='flex justify-evenly items-center bg-gray-200 w-8/12 h-1/6 rounded-lg'>
            <span>学籍番号</span>
            <input type="number" className='w-1/2 rounded-lg p-1' min="1" defaultValue={studentNumber} onChange={(e) => setStudentNumber(Number(e.target.value))} />
          </div>
          <div className='flex justify-evenly items-center bg-gray-200 w-8/12 h-1/6 rounded-lg'>
            <span>出席番号</span>
            <input type="number" className='w-1/2 rounded-lg p-1' min="1" defaultValue={attendanceNumber} onChange={(e) => setAttendanceNumber(Number(e.target.value))} />
          </div>
          <div className='flex justify-end items-center w-8/12 rounded-lg'>
            <button className='w-1/2 rounded-lg p-2 bg-blue-400 text-white' onClick={handleClick}>
              作成
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default StudentRegister