import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import  "./output.css"
import { CONSTANTS } from "./App"

const currentStatus = {
    0:"Contacted",
    1:"Interview Scheduled",
    2:"Offer Extended",
    3:"Hired",
    4:"Rejected"

}

function Home(){

    const [studentList, setStudentList] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        
        fetchData()
    },[])

    const fetchData = async ()=>{
        console.log("fetching the data")
        const url = CONSTANTS.BASE_URL+"/fetch"
        await fetch(url, {
        
        method: "POST",
        headers:{
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials":"true"
        }
        }).then(async response=>{
            let result = await response.json()
            setStudentList(result)
        }).catch(err=>console.log(err))
        // response.then((response)=>{
        //   setStudentList(response.studentlist)
        // }).catch(error=>console.log(error))
    }

  const editStudent = (props) => {
    console.log(props)
    let studentObj = {...props}
    navigate('edit',{ state: { studentObj }})
  }

  const addStudent = async (props) =>{
    let studentObj =null
    navigate('edit',{ state: { studentObj }})
    // navigate('add')
  }

    return(
        <div className="min-h-full">
        <header className="bg-white shadow">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Students</h1>
                <button onClick={addStudent}>Add New</button>
            </div>
        </header>
                <div className="container mx-auto pb-10">
                    
                    
                    <table className="table-fixed tablefix">
                        <thead>
                        <tr>
                            <th>S.No.</th>
                            <th>Name</th>
                            <th>Contact Details</th>
                            <th>Skills Qualification</th>
                            <th>Current Status</th>
                            <th>Expected Salary</th>
                            <th>Node Js Experience</th>
                            <th>React Js Experience</th>
                            <th>Total Score</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            studentList.map((student,index)=>{
                                return (
                                <tr key={index}>
                                    <td>{index}</td>
                                    <td>{student.name}</td>
                                    <td>{student.phone}{student.email}</td>
                                    <td>{student.qualification}</td>
                                    <td>{currentStatus[student.currentstatus]}</td>
                                    <td>{student.expectedsalary}</td>
                                    <td>{student.nodejs}</td>
                                    <td>{student.reactjs}</td>
                                    <td>{student.totalscore}</td>
                                    <td><button onClick={()=>editStudent(student)}>Edit</button></td>

                                </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
        </div>
    )
}

export default Home;