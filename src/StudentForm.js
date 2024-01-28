import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CONSTANTS } from "./App";


const StudentForm = (props)=>{

    const [id,setId] = useState(0)
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [phone,setPhone] = useState("")
    const [qualification,setQualification] = useState("")
    const [currentStatus,setCurrentStatus] = useState(0)
    const [expectedSalary,setExpectedSalary] = useState(0)
    const [nodeJs,setNodeJs] = useState(0)
    const [reactJs,setReactJs] = useState(0)
    const [error,setError]= useState([])
    const navigate = useNavigate()
    const location = useLocation()

    
    

    useEffect(()=>{
        if(location.state){
        const { studentObj } = location.state
        console.log("Student obj changed")
        if(studentObj!=null && studentObj!=undefined){
            
            setName(studentObj.name)
            setId(studentObj.id)
            setPhone(studentObj.phone)
            setEmail(studentObj.email)
            setQualification(studentObj.qualification)
            setCurrentStatus(studentObj.currentstatus)
            setExpectedSalary(studentObj.expectedsalary)
            setNodeJs(studentObj.nodejs)
            setReactJs(studentObj.reactjs)
        }
    }  
    },[])

    const validateName = (props) => {
        console.log(props.target.value)
        setName(props.target.value)
    }
    const validateEmail = (props) => {
        console.log(props.target.value)
        setEmail(props.target.value)
    }
    const validatePhone = (props) => {
        console.log(props.target.value)
        setPhone(props.target.value)
    }

    function submitData(url,obj){
        return new Promise((resolve,reject)=>{
            fetch(url,{
                body:JSON.stringify(obj),
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials":"true"
                }
            }).then(response=>{
                response.json().then(resp=>{
                    if(response.status==200){
                        resolve(resp)
                    } else {
                        reject(resp.errors)
                    }
                })
            }).catch(error=>{
                console.log(error)
                reject(error)
            })
        })
    }

    const submit = async (event) =>{
        event.preventDefault();
        let url = CONSTANTS.BASE_URL+"/insert"
        let obj = {name:name, email:email,phone:phone,qualification:qualification,currentstatus:currentStatus,expectedsalary:expectedSalary,
            nodejs:nodeJs,reactjs:reactJs}
        if(id>0){
            obj.id = id;
            url = CONSTANTS.BASE_URL+"/update"
        }
        await submitData(url,obj).then(response=>{
            navigate('/')
        }).catch(error=>{
            
            setError(error)
        })
        console.log("Submitted")
    }
    useEffect(()=>{
        console.log("Error changed")
        console.log(error)
        
    },[error])

    return (
        <div className="container mx-auto">
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Student Form</h1>
                    
                </div>
            </header>
            <div>
            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div class="sm:col-span-3">
                    <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">First name</label>
                    <div class="mt-2">
                        <input type="text" value={name} onChange={validateName} class="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                    </div>
                </div>
            
                <div class="sm:col-span-3">
                    <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">Email</label>
                    <div class="mt-2">
                        <input type="text" value={email} onChange={validateEmail} class="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                    </div>
                </div>
            
            </div>
            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div class="sm:col-span-3">
                    <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">Phone</label>
                    <div class="mt-2">
                        <input type="text" value={phone} onChange={validatePhone} class="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                    </div>
                </div>

            
                <div class="sm:col-span-3">
                    <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">Qualification</label>
                    <div class="mt-2">
                        <input type="text" value={qualification} onChange={(event)=>{
                            setQualification(event.target.value)
                        }} class="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                    </div>
                </div>
            </div>


            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div class="sm:col-span-3">
                    <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">Current Status</label>
                    <div class="mt-2">
                    <select value={currentStatus} onChange={(event)=>{
                        setCurrentStatus(event.target.value)
                    }} class="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                        <option value="0">Contacted</option>
                        <option value="1">Interview Scheduled</option>
                        <option value="2">Offer Extended</option>
                        <option value="3">Hired</option>
                        <option value="4">Rejected</option>
                    </select>
                    </div>
                </div>
                <div class="sm:col-span-3">
                    <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">Expected Salary</label>
                    <div class="mt-2">
                        <input type="text" value={expectedSalary} onChange={(event)=>{
                            setExpectedSalary(event.target.value)
                        }} class="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                    </div>
                </div>
            </div>

            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                
                <div class="sm:col-span-3">
                    <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">Nodejs</label>
                    <div class="mt-2">
                        <select value={nodeJs} onChange={(event)=>{
                            setNodeJs(event.target.value)
                        }} class="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                            <option value="0">None</option>
                            <option value="1">Less Than 1 year</option>
                            <option value="2">1-2 Years</option>
                            <option value="3">More than 2 years</option>
                        </select>
                    </div>
                </div>

                <div class="sm:col-span-3">
                    <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">Reactjs</label>
                    <div class="mt-2">
                    <select value={reactJs} onChange={(event)=>{
                            setReactJs(event.target.value)
                        }} class="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                            <option value="0">None</option>
                            <option value="1">Less Than 1 year</option>
                            <option value="2">1-2 Years</option>
                            <option value="3">More than 2 years</option>
                        </select>
                        
                    </div>
                </div>
            </div>
            
            
            </div>

            
            <ul className="pt-10">
            {   error.isArray && 
                error?.map((err)=>{
                    
                    return (
                        <li className="text-orange-600">{err}</li>
                    )
                })
            }
            </ul>
            <div class="mt-6 flex items-center gap-x-6">
                <button type="button" className="buttonsubmit" onClick={submit}>Submit</button>
                <button type="button" className="buttonsubmit" onClick={()=>{
                    navigate("/")
                }}>Cancel</button>
            </div>
        </div>
    )
}

export default StudentForm;