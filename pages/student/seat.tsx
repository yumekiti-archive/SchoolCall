import Link from "next/link"
import { useState } from "react"

import Layout from "@/components/template/Layout"

import { useRouter } from "next/router"

import { useReadStudentByStudentNumber } from "@/hooks/useStudent"
import { useReadClassroomByName } from "@/hooks/useClassroom"
import { useCreateDesk } from "@/hooks/useDesk"

const StudentRegister = () => {
  const { readStudentByStudentNumber } = useReadStudentByStudentNumber()
  const { readClassroomByName } = useReadClassroomByName()
  const { createDesk } = useCreateDesk()

  const router = useRouter()

  const [ seatNumber, setSeatNumber ] = useState<number>(1)
  const [ classroomName, setClassroomName ] = useState<string>('3601')

  const handleClick = () => {
    readClassroomByName(classroomName).then((classroom) => {
      if (!classroom) alert('教室名が間違っています')
      else {
        readStudentByStudentNumber(localStorage.getItem('studentNumber')).then((student) => {
          if (student) {
            const body = {
              seatNumber,
              classroomId: classroom.id,
              studentId: student.id,
              classId: student.classId,
            }

            createDesk(body).then((data) => {
              if (data) {
                alert('登録しました')
                router.push('/student')
              } else alert('登録に失敗しました')
            })
          }
        })
      }
    })
  }

  return (
    <Layout title='順番管理' href='/student'>
      <div className='w-full h-full flex justify-center items-center'>
        <div className='w-1/2 h-1/2 bg-white rounded-lg shadow-lg flex flex-col justify-evenly items-center'>
          <div className='flex justify-evenly items-center bg-gray-200 w-8/12 h-2/6 rounded-lg'>
            <span>教室名</span>
            <input type="text" className='w-1/2 rounded-lg p-1' min="1" defaultValue={classroomName} onChange={(e) => setClassroomName(e.target.value)} />
          </div>
          <div className='flex justify-evenly items-center bg-gray-200 w-8/12 h-2/6 rounded-lg'>
            <span>座席番号</span>
            <input type="number" className='w-1/2 rounded-lg p-1' min="1" defaultValue={seatNumber} onChange={(e) => setSeatNumber(Number(e.target.value))} />
          </div>
          <div className='flex justify-end items-center w-8/12 rounded-lg'>
            <button className='w-1/4 rounded-lg p-2 bg-blue-400 text-white text-center' onClick={handleClick}>
              登録
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default StudentRegister