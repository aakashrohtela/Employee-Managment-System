import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from "./pages/auth/Login"
import ManageTask from './pages/admin/ManageTask'
import ManageUsers from './pages/admin/ManageUsers'
import Dashboard from './pages/admin/Dashboard'
import createTask from './pages/admin/createTask'
import SignUp from './pages/auth/SignUp'
import PrivateRoute from './routes/PrivateRoute'
import UserDashboard from './pages/users/UserDashboard'
import MyTask from './pages/users/MyTask'
import TaskDetails from './pages/users/TaskDetails'
const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}/>

        <Route path='/sign-up' element={<SignUp/>}/>


        <Route element={<PrivateRoute allowedRoles={['admin']}/>}/>

      <Route path='/admin/Dashboard' element={<Dashboard/>}/>

        <Route path='/admin/tasks' element={<ManageTask/>}/>
      <Route path='/admin/users' element={<ManageUsers/>}/>

        <Route path='/admin/users/createTask' element={<createTask/>}/>



<Route element={<PrivateRoute allowedRoles={['user']}/>}>

<Route path='user/Dashboard' element={<UserDashboard/>}/>

<Route path='user/task' element={<MyTask/>}/>

<Route path='user/task-details/:id' element={<TaskDetails/>}/>

</Route>
  
        
        </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App