import './App.css';
import Browse from './components/Browse';
import Home from "./components/Home"
import Jobs from './components/Jobs';
import Login from "./components/Login"
import Signup from "./components/Signup"
import { Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux"
import Logout from './components/Logout';
import Profile from './components/Profile';
import JobDescription from './components/JobDescription';
import EditProfile from './components/EditProfile';
import Companies from './componentsRecruiter/Companies';
import CreateCompany from './componentsRecruiter/CreateCompany';
import CompanySetup from './componentsRecruiter/CompanySetup';
import CompanyJobs from './componentsRecruiter/CompanyJobs';
import PostJobs from './componentsRecruiter/PostJobs';
import Applicants from './componentsRecruiter/Applicants';

function App() {


  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-300">
<Routes>
  <Route path='/' element={<Home/>}></Route>
  <Route path='/Login' element={<Login/>}></Route>
  <Route path='/Signup' element={<Signup/>}></Route>
  <Route path="/jobs" element={<Jobs/>}></Route> 
  <Route path="/browse" element={<Browse/>}></Route>
  <Route path="/logout" element={<Logout/>}></Route>
  <Route path="/profile" element={<Profile/>}></Route>
  <Route path="/description/:id" element={<JobDescription/>}></Route>
  <Route path="/EditProfile" element={<EditProfile/>}></Route>
  {/* path for companies  */}
  <Route path="/admin/companies" element={<Companies/>}></Route>
  <Route path="/admin/companies/create" element={<CreateCompany/>}></Route>
    <Route path="/admin/companies/:id" element={<CompanySetup/>}></Route>
     <Route path="/admin/jobs" element={<CompanyJobs/>}></Route>
       <Route path="/admin/postjobs" element={<PostJobs/>}></Route>
            <Route path="/admin/jobs/applicants/:id" element={<Applicants/>}></Route>
</Routes>
<ToastContainer />
    </div>
  );
}

export default App;
