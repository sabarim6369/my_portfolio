import { useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import Sidebarstore from "../../store/sidebarstore";
import { Calendar, Users, Code, BookOpen, Clock, Plus, Edit2, Trash2, ExternalLink, Search, Filter, ChevronDown, Bell, ChevronUp, BarChart2, Award, CheckCircle, AlertCircle } from 'lucide-react';
import axios from 'axios'
import AssignTaskModal from "./Assigntaskmodel";
export default function Programdetails() {
  const { id } = useParams();
  const sidebaropen = Sidebarstore((state) => state.isOpen);
  const [activeTab, setActiveTab] = useState("students");
  const [selectedDate, setSelectedDate] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTaskType, setSelectedTaskType] = useState("all");
  const[programdetails,setprogramdetails]=useState();
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [platform, setPlatform] = useState("leetcode");
  const [link, setLink] = useState("");

  const handleSubmit = async () => {
    if (!programId) {
      alert("Program ID is missing!");
      return;
    }

    const newTask = {
      taskName,
      description,
      date,
      platform,
      link,
      studentsCompleted: [],
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/trainer/addtask`,
      {id,newTask}
      );

      console.log("Task Added Successfully:", response.data);
      setShowAssignModal(false);
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Failed to add task. Please try again.");
    }
  };
  const programData = {
    id: "PRG001",
    name: "MERN Stack Development",
    description: "Complete MERN Stack Development course covering MongoDB, Express.js, React, and Node.js with real-world projects and industry best practices",
    instructor: "Sarah Wilson",
    startDate: "2024-02-26",
    endDate: "2024-05-26",
    progress: 65,
    totalStudents: 25,
    completionRate: 78,
    averageScore: 85,
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60",
    metrics: {
      assignments: { completed: 156, total: 200 },
      attendance: 92,
      projectSubmissions: 45,
      codeReviews: 78
    }
  };

  const students = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      progress: 78,
      leetcodeProblems: 45,
      codechefRating: 1823,
      completedTasks: 23,
      pendingTasks: 5,
      lastActive: "2 hours ago",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60",
      badges: ["Top Performer", "Quick Learner"],
      recentActivity: "Completed MongoDB Assignment"
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob@example.com",
      progress: 92,
      leetcodeProblems: 67,
      codechefRating: 1945,
      completedTasks: 28,
      pendingTasks: 2,
      lastActive: "5 hours ago",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&auto=format&fit=crop&q=60",
      badges: ["Project Master", "Team Leader"],
      recentActivity: "Submitted React Project"
    },
    {
      id: 3,
      name: "Carol White",
      email: "carol@example.com",
      progress: 85,
      leetcodeProblems: 52,
      codechefRating: 1756,
      completedTasks: 25,
      pendingTasks: 3,
      lastActive: "1 day ago",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60",
      badges: ["Consistent Performer"],
      recentActivity: "Completed Express.js Quiz"
    }
  ];

 

  const metrics = [
    {
      label: "Assignment Completion",
      value: `${programData.metrics.assignments.completed}/${programData.metrics.assignments.total}`,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      label: "Average Attendance",
      value: `${programData.metrics.attendance}%`,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      label: "Project Submissions",
      value: programData.metrics.projectSubmissions,
      icon: Code,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      label: "Code Reviews",
      value: programData.metrics.codeReviews,
      icon: BarChart2,
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    }
  ];

    
  useEffect(()=>{
    const getdatawithid=async()=>{
        console.log(id);
        const response=await axios.get(`${import.meta.env.VITE_API_URL}/trainer/getprogramdata`,{
            params:{id}
        })
        console.log(response.data);
        setprogramdetails(response.data);
    }
    getdatawithid();
  },[id])



  const EditProgramModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[600px]">
        <h2 className="text-2xl font-bold mb-4">Edit Program</h2>
        <div className="flex justify-end gap-3 mt-6">
          <button 
            onClick={() => setShowEditModal(false)}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );

  const DeleteConfirmationModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[400px]">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-full bg-red-100">
            <AlertCircle className="w-6 h-6 text-red-600" />
          </div>
          <h2 className="text-xl font-semibold">Delete Task</h2>
        </div>
        <p className="text-gray-600 mb-6">Are you sure you want to delete this task? This action cannot be undone.</p>
        <div className="flex justify-end gap-3">
          <button 
            onClick={() => setShowDeleteModal(false)}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
            Delete
          </button>
        </div>
      </div>
    </div>
  );

//   const AssignTaskModal = () => (
    
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-xl p-6 w-[700px]">
//         <h2 className="text-2xl font-bold mb-6">Assign New Task</h2>
//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Task Title
//             </label>
//             <input
//               type="text"
//               value={taskName}
//               onChange={(e) => setTaskName(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter task title"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Description
//             </label>
//             <textarea
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               rows="3"
//               placeholder="Enter task description"
//             ></textarea>
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Due Date
//               </label>
//               <input
//                 type="date"
//                 value={date}
//                 onChange={(e) => setDate(e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Platform
//               </label>
//               <select
//                 value={platform}
//                 onChange={(e) => setPlatform(e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="leetcode">LeetCode</option>
//                 <option value="codeforces">Codeforces</option>
//                 <option value="hackerrank">HackerRank</option>
//               </select>
//             </div>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Problem Link
//             </label>
//             <input
//               type="text"
//               value={link}
//               onChange={(e) => setLink(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter problem link"
//             />
//           </div>
//         </div>
//         <div className="flex justify-end gap-3 mt-6">
//           <button
//             onClick={() => setShowAssignModal(false)}
//             className="px-4 py-2 text-gray-600 hover:text-gray-800"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleSubmit}
//             className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//           >
//             Assign Task
//           </button>
//         </div>
//       </div>
//     </div>
//   );

  return (
    <div
      className={`min-h-screen bg-white transition-all duration-300 ${
        sidebaropen ? "w-full pl-[270px]" : "w-[93%] mx-auto"
      }`}
    >
      <div className="max-w-[1600px] mx-auto p-8">
        <div className="flex justify-between items-start mb-8">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <img
                src={programData.thumbnail}
                alt={programData.name}
                className="w-20 h-20 rounded-xl object-cover shadow-lg"
              />
              <div>
                <h1 className="text-4xl font-bold text-gray-900">
                  {programdetails?.name}
                </h1>
                <p className="text-lg text-gray-500 mt-2">
                  {programdetails?.description}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-8 text-gray-500 mt-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span className="text-lg">
                  {programdetails?.students.length} Students
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span className="text-lg">
                  {programdetails?.startDate
                    ? new Date(programdetails.startDate).toLocaleDateString()
                    : ""}
                  -
                  {programdetails?.endDate
                    ? new Date(programdetails.endDate).toLocaleDateString()
                    : ""}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span className="text-lg">
                  {programdetails?.progress || 0}% Complete
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            {/* <button 
              onClick={() => setShowEditModal(true)}
              className="px-6 py-3 text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50 flex items-center gap-2 text-lg font-medium"
            >
              <Edit2 className="w-5 h-5" />
              Edit Program
            </button> */}
            <button
              onClick={() => setShowAssignModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-lg font-medium transition-all duration-200 ease-in-out hover:bg-blue-700 hover:shadow-md active:scale-95 cursor-pointer"
            >
              <Plus className="w-5 h-5" />
              Edit Task
            </button>
          </div>
        </div>

        <div className="flex gap-2 border-b border-gray-200 mb-8">
          {/* <button
            onClick={() => setActiveTab("overview")}
            className={`px-8 py-4 text-lg font-medium transition-colors rounded-t-lg ${
              activeTab === "overview"
                ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
          >
            Overview
          </button> */}
          <button
            onClick={() => setActiveTab("students")}
            className={`px-8 py-4 text-lg font-medium transition-colors rounded-t-lg ${
              activeTab === "students"
                ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
          >
            Students
          </button>
          <button
            onClick={() => setActiveTab("tasks")}
            className={`px-8 py-4 text-lg font-medium transition-colors rounded-t-lg ${
              activeTab === "tasks"
                ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
          >
            Tasks
          </button>
        </div>

        {activeTab === "overview" && (
          <div className="space-y-8">
            <div className="grid grid-cols-4 gap-6">
              {metrics.map((metric, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-4 ${metric.bgColor} rounded-xl`}>
                      <metric.icon className={`w-8 h-8 ${metric.color}`} />
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">{metric.label}</p>
                      <p className="text-3xl font-bold text-gray-900">
                        {metric.value}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-6">
              {/* Progress Chart */}
              <div className="col-span-2 bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-2xl font-semibold mb-6">
                  Program Progress
                </h2>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600 text-lg">
                        Overall Completion
                      </span>
                      <span className="text-gray-900 font-medium text-lg">
                        {programData.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3">
                      <div
                        className="bg-blue-600 h-3 rounded-full transition-all"
                        style={{ width: `${programData.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600 text-lg">
                        Assignment Completion
                      </span>
                      <span className="text-gray-900 font-medium text-lg">
                        {(
                          (programData.metrics.assignments.completed /
                            programData.metrics.assignments.total) *
                          100
                        ).toFixed(0)}
                        %
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3">
                      <div
                        className="bg-green-600 h-3 rounded-full transition-all"
                        style={{
                          width: `${
                            (programData.metrics.assignments.completed /
                              programData.metrics.assignments.total) *
                            100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600 text-lg">
                        Average Score
                      </span>
                      <span className="text-gray-900 font-medium text-lg">
                        {programData.averageScore}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3">
                      <div
                        className="bg-purple-600 h-3 rounded-full transition-all"
                        style={{ width: `${programData.averageScore}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-2xl font-semibold mb-6">
                  Performance Metrics
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-blue-100 rounded-xl">
                        <Award className="w-6 h-6 text-blue-600" />
                      </div>
                      <span className="text-gray-600 text-lg">
                        Completion Rate
                      </span>
                    </div>
                    <span className="text-2xl font-semibold text-gray-900">
                      {programData.completionRate}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-green-100 rounded-xl">
                        <Users className="w-6 h-6 text-green-600" />
                      </div>
                      <span className="text-gray-600 text-lg">
                        Active Students
                      </span>
                    </div>
                    <span className="text-2xl font-semibold text-gray-900">
                      {programData.totalStudents}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-purple-100 rounded-xl">
                        <BarChart2 className="w-6 h-6 text-purple-600" />
                      </div>
                      <span className="text-gray-600 text-lg">Avg. Score</span>
                    </div>
                    <span className="text-2xl font-semibold text-gray-900">
                      {programData.averageScore}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "students" && (
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Enrolled Students</h2>
                <div className="flex gap-4">
                  <div className="relative">
                    <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search students..."
                      className="pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 w-[300px]"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <button className="px-4 py-2 text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50 flex items-center gap-2">
                    <Filter className="w-5 h-5" />
                    Filter
                    <ChevronDown className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left text-sm font-semibold text-gray-600 p-4 rounded-tl-xl">
                        Student
                      </th>
                      <th className="text-left text-sm font-semibold text-gray-600 p-4">
                        Progress
                      </th>
                      <th className="text-left text-sm font-semibold text-gray-600 p-4">
                        LeetCode
                      </th>
                      <th className="text-left text-sm font-semibold text-gray-600 p-4">
                        CodeChef
                      </th>
                      <th className="text-left text-sm font-semibold text-gray-600 p-4">
                        Tasks
                      </th>
                      <th className="text-left text-sm font-semibold text-gray-600 p-4 rounded-tr-xl">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {students
                      .filter(
                        (student) =>
                          student.name
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase()) ||
                          student.email
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase())
                      )
                      .map((student) => (
                        <tr key={student.id} className="hover:bg-gray-50 group">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={student.avatar}
                                alt={student.name}
                                className="w-12 h-12 rounded-xl object-cover"
                              />
                              <div>
                                <p className="font-medium text-gray-900 text-lg">
                                  {student.name}
                                </p>
                                <p className="text-gray-500">{student.email}</p>
                                <div className="flex gap-2 mt-1"></div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <div>
                              <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                                <div
                                  className="bg-blue-600 h-2 rounded-full"
                                  style={{ width: `${student.progress}%` }}
                                ></div>
                              </div>
                              <span className="text-gray-600">
                                {student.progress}%
                              </span>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <Code className="w-5 h-5 text-gray-400" />
                              <span className="text-gray-700">
                                {student.leetcodeProblems} solved
                              </span>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <BookOpen className="w-5 h-5 text-gray-400" />
                              <span className="text-gray-700">
                                Rating: {student.codechefRating}
                              </span>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <span className="text-green-600">
                                  {student.completedTasks} completed
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-yellow-500" />
                                <span className="text-yellow-600">
                                  {student.pendingTasks} pending
                                </span>
                              </div>
                            </div>
                          </td>

                          <td className="p-4">
                            <button className="px-4 py-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors">
                              View Profile
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

{activeTab === "tasks" && (
  <div className="space-y-8">
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-4">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => setSelectedDate("")}
          className="px-4 py-3 bg-gray-300 text-gray-700 rounded-xl hover:bg-gray-400 text-lg"
        >
          Show All
        </button>
        <select
          className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedTaskType}
          onChange={(e) => setSelectedTaskType(e.target.value)}
        >
          <option value="all">All Types</option>
          <option value="assignment">Assignments</option>
          <option value="challenge">Coding Challenges</option>
          <option value="project">Projects</option>
        </select>
      </div>
      <button
        onClick={() => setShowAssignModal(true)}
        className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 flex items-center gap-2 text-lg font-medium"
      >
        <Plus className="w-5 h-5" />
        New Task
      </button>
    </div>

    {Object.entries(
      programdetails.studentTasks
        .filter((task) =>
          selectedDate
            ? new Date(task.date).toISOString().split("T")[0] === selectedDate
            : true
        )
        .filter(
          (task) => selectedTaskType === "all" || task.type === selectedTaskType
        )
        .reduce((acc, task) => {
          const taskDate = new Date(task.date).toISOString().split("T")[0];
          if (!acc[taskDate]) acc[taskDate] = [];
          acc[taskDate].push(task);
          return acc;
        }, {})
    ).map(([date, tasks]) => (
      <div key={date} className="bg-gray-50 p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          {new Date(date).toDateString()}
        </h2>
        <div className="grid grid-cols-2 gap-6">
          {tasks.map((task, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {task.taskName}
                  </h3>
                  <p className="text-gray-600 text-lg">{task.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2 text-gray-500">
                  <Calendar className="w-5 h-5" />
                  <span>Due: {new Date(task.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <Code className="w-5 h-5" />
                  <span>{task.platform}</span>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                <button
                  className="text-blue-600 hover:text-blue-800 flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                  onClick={() => window.open(task.link, "_blank")}
                >
                  View Problem
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
)}

      </div>

      {showEditModal && <EditProgramModal />}
      {showDeleteModal && <DeleteConfirmationModal />}
      {showAssignModal && <AssignTaskModal setShowAssignModal={setShowAssignModal} programId={id}/>}
    </div>
  );
}