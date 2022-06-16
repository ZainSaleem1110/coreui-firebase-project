import React, { useState, useEffect } from 'react'
import AddUserEditUser from './addUser-editUser';
import { useForm } from "react-hook-form";
import { db } from '../../firebase';
import { collection, addDoc, Timestamp, query, orderBy, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore';

import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilDelete,
  cilColorBorder,
} from '@coreui/icons'


const Dashboard = () => {
  const [visible, setVisible] = useState(false)
  const [tasks, setTasks] = useState([])
  const [updateData, setUpdateData] = useState("")
  const {
    setValue,
    formState: { errors }
  } = useForm();


  const handleDelete = async (id) => {
    const taskDocRef = doc(db, 'tasks', id)
    try {
      await deleteDoc(taskDocRef)
    } catch (err) {
      alert(err)
    }
  }

  const handleUpdate = async (id, data) => {
    setVisible(!visible)
    setUpdateData(data)
  }

  useEffect(() => {
    const q = query(collection(db, 'tasks'), orderBy('created', 'desc'))
    onSnapshot(q, (querySnapshot) => {
      setTasks(querySnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    })
  }, [])

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell className="text-center">First Name</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Last Name</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Address</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Email</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Phone Number</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {tasks.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell className="text-center">
                        <div>{item.data.firstName}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div>{item.data.lastName}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div>{item.data.address}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div>{item.data.email}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div>{item.data.phoneNumber}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className='d-flex justify-content-evenly'>
                          <CIcon width={18} icon={cilDelete} size="xl" onClick={() => { handleDelete(item.id) }} />
                          <CIcon width={18} icon={cilColorBorder} size="xl" onClick={() => {
                            handleUpdate(item.id, item)
                          }} />
                        </div>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
            <CCol xs={3}>
              <CButton onClick={() => setVisible(!visible)}>Add User</CButton>
            </CCol>
            {visible && (
              <AddUserEditUser
                visible={visible}
                dataToUpdate={updateData}
                setVisible={(check) => {
                  setVisible(check)
                }
                }
                clearData={() => { setUpdateData('') }}

              />
            )
            }
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
