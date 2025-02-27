import { useState,useRef, useEffect  } from "react";
import { BsCheckCircleFill, BsClockFill, BsListTask, BsCalendarEvent, BsGraphUp, BsPeople } from "react-icons/bs";
import { Bell, ChevronDown, Download, Filter, Search } from 'lucide-react';
import Sidebarstore from "../../store/sidebarstore";
import useAuthStore from "../../store/authstore"
import axios from 'axios';
function Dashboard({isopen,navigate}) {
  const{trainerId,email,Name}=useAuthStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [isOpen, setIsOpen] = useState(false);
  const[trainerdata,settrainerdata]=useState();
  const[assignedprograms,setassignedprograms]=useState([]);
  const popupRef = useRef(null);
  const sidebaropen = Sidebarstore((state) => state.isOpen); 
  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(()=>{
    const getdata=async()=>{
      const response=await axios.get(`${import.meta.env.VITE_API_URL}/trainer/get-trainer`,{params:{trainerId}});
      console.log("Trainer Data:", response.data.trainer);
      if(response.data.success){

        settrainerdata(response.data.trainer)
        setassignedprograms(response.data.trainer.programsAssigned)
      }

    }
    if (trainerId) {
      getdata();
    }

  },[trainerId])
  
  const stats = {
    assigned: assignedprograms.filter(p => p.status === "Ongoing").length,
    pending: assignedprograms.filter(p => p.status === "Pending").length,
    completed: assignedprograms.filter(p => p.status === "Completed").length,
    totalStudents: assignedprograms.reduce((acc, curr) => acc + curr.students.length, 0),
    averageProgress: Math.round(
      assignedprograms.reduce((acc, curr) => acc + curr.progress, 0) / assignedprograms.length
    )
  };

  const filterOptions = ["All", "Ongoing", "Pending", "Completed"];
const viewdetails=(programid)=>{
  navigate(`programdetails/${programid}`)

}
  return (
<div
  className={`min-h-screen bg-gray-100 transition-all duration-300 ${
    sidebaropen ? "w-full pl-[270px]" : "w-[98%] mx-auto"
  }`}
>
      <div className="max-w-[1600px] mx-auto p-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              Welcome back, <span className="text-blue-600">{Name}!</span>
            </h1>
            <p className="text-lg text-gray-600 mt-2">Track your program progress and manage your courses effectively.</p>
          </div>
          <div className="flex items-center gap-6 cursor-pointer">
            <button className="relative p-3 bg-white rounded-xl hover:bg-gray-50 transition-colors shadow-sm cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"></div>
            
        <Bell className="w-6 h-6 text-gray-700" />
    
            </button>
            {isOpen && (
              <div ref={popupRef} className="absolute right-70 top-20 mt-2 w-60 bg-white shadow-lg rounded-lg p-4">
                <h3 className="text-gray-900 font-semibold">Notifications</h3>
                <ul className="mt-2">
                  <li className="text-sm text-gray-600">New course assigned: MERN Stack</li>
                  <li className="text-sm text-gray-600 mt-1">Meeting at 3 PM</li>
                </ul>
              </div>
            )}
            <div className="flex items-center gap-4 bg-white p-3 pl-4 rounded-xl shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60"
                alt="Profile"
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div>
                <p className="font-semibold text-gray-900">{Name}</p>
                <p className="text-sm text-gray-500">Trainer</p>
              </div>
              <ChevronDown className="w-5 h-5 text-gray-400 ml-2" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-blue-50 rounded-xl">
                <BsListTask className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-500 mb-1">Active Programs</p>
                <p className="text-3xl font-bold text-gray-900">{stats.assigned}</p>
                <p className="text-sm text-green-600 mt-1">+2 this month</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-yellow-50 rounded-xl">
                <BsClockFill className="w-8 h-8 text-yellow-600" />
              </div>
              <div>
                <p className="text-gray-500 mb-1">Pending Start</p>
                <p className="text-3xl font-bold text-gray-900">{stats.pending}</p>
                <p className="text-sm text-yellow-600 mt-1">Starting soon</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-green-50 rounded-xl">
                <BsPeople className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <p className="text-gray-500 mb-1">Total Students</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalStudents}</p>
                <p className="text-sm text-green-600 mt-1">Across all programs</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-purple-50 rounded-xl">
                <BsGraphUp className="w-8 h-8 text-purple-600" />
              </div>
              <div>
                <p className="text-gray-500 mb-1">Avg. Progress</p>
                <p className="text-3xl font-bold text-gray-900">{stats.averageProgress}%</p>
                <p className="text-sm text-purple-600 mt-1">Overall completion</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Program Overview</h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Download className="w-4 h-4" />
                Export Report
              </button>
            </div>

            <div className="flex gap-4 items-center">
              <div className="relative flex-1">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search programs, batches, or instructors..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-500" />
                <select 
                  className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                >
                  {filterOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
  <table className="w-full">
    <thead>
      <tr className="bg-gray-100">
        <th className="text-left text-lg font-semibold text-gray-700 p-5">Program Details</th>
        <th className="text-left text-lg font-semibold text-gray-700 p-5">Duration</th>
        <th className="text-left text-lg font-semibold text-gray-700 p-5">Students</th>
        <th className="text-left text-lg font-semibold text-gray-700 p-5">Progress</th>
        <th className="text-left text-lg font-semibold text-gray-700 p-5">Status</th>
        <th className="text-left text-lg font-semibold text-gray-700 p-5">Action</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-200">
      {assignedprograms
       
        .map((program) => (
          <tr key={program._id} className="hover:bg-gray-50 transition-all">
            <td className="p-5">
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-xl font-semibold text-gray-900">{program.name}</p>
                  <div className="flex items-center gap-3 mt-1 text-lg text-gray-600">
                    <span>{program.code}</span>
                    <span className="text-gray-500">•</span>
                    <span>Updated {program.venue}</span>
                  </div>
                </div>
              </div>
            </td>

            <td className="p-5 text-lg text-gray-700">
              <div className="flex items-center gap-3">
                <BsCalendarEvent className="text-gray-500 w-6 h-6" />
                <div>
                  <p>{new Date(program.startDate).toLocaleDateString()}</p>
                  <p className="text-gray-500 text-md">to {new Date(program.endDate).toLocaleDateString()}</p>
                </div>
              </div>
            </td>

            <td className="p-5 text-lg text-gray-700">
              <div className="flex items-center gap-3">
                <BsPeople className="text-gray-500 w-6 h-6" />
                <span>{program.students.length}</span>
              </div>
            </td>

            <td className="p-5">
              <div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                  <div
                    className={`h-3 rounded-full transition-all ${
                      program.status === "Completed"
                        ? "bg-green-500"
                        : program.status === "Ongoing"
                        ? "bg-blue-500"
                        : "bg-yellow-500"
                    }`}
                    style={{ width: `${program.progress||0}%` }}
                  ></div>
                </div>
                <span className="text-lg text-gray-700">{program.progress ||0}% Complete</span>
              </div>
            </td>

            <td className="p-5">
              <span
                className={`px-6 py-2 rounded-full text-lg font-semibold ${
                  program.programStatus  === "Completed"
                    ? "bg-green-100 text-green-800"
                    : program.programStatus  === "Ongoing"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {program.programStatus }
              </span>
            </td>

            <td className="p-5">
              <button className="px-5 py-3 text-lg font-semibold text-blue-700 hover:text-blue-900 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer" onClick={()=>viewdetails(program._id)}>
                View Details
              </button>
            </td>
          </tr>
        ))}
    </tbody>
  </table>
</div>

        </div>
      </div>
    
    </div>
    
  );
}

export default Dashboard;