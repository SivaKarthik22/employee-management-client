import EmployeesTable from './Components/EmployeesTable'
import Header from './Components/Header'
import AddOrUpdateComp from './Components/AddOrUpdateComp'
import { Navigate, Route, Routes, Link } from 'react-router-dom'
import { EmployeeDbProvider } from './Components/EmployeeDbContext'
import EmployeeDetails from './Components/EmployeeDetails'

function App() {

  return (
    <EmployeeDbProvider>
      <Header/>
      <div className='container flex max-w-screen-xl mx-auto px-5 py-8 gap-5'>
        <div className='container w-8/12'>
          <EmployeesTable/>
        </div>
        <div className='container w-4/12'>
          <Routes>
            <Route path='/' element={<AddButton/>}></Route>
            <Route path='/add-employee' element={<AddOrUpdateComp/>}></Route>
            <Route path='/update-employee/:id' element={<AddOrUpdateComp/>}></Route>
            <Route path='/employees' element={<Navigate to="/"/>}></Route>
            <Route path='/employees/:id' element={<EmployeeDetails/>}></Route>
          </Routes>
        </div>
      </div>
    </EmployeeDbProvider>
  )
}

export default App;

function AddButton() {
  return(
    <Link to='/add-employee'>
      <button className='py-4 px-6 rounded-xl bg-cyan-700 hover:bg-cyan-600'>
        <i className="fa-solid fa-plus mr-3 text-lg"></i>
        Add Employee                
      </button>
    </Link>
  );
}

