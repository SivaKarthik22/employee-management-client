import EmployeesTable from './Components/EmployeesTable'
import Header from './Components/Header'
import { Navigate, Route, Routes, Link } from 'react-router-dom'
import { EmployeeDbProvider } from './Components/EmployeeDbContext'
import { lazy, Suspense } from 'react'
import SearchComp from './Components/SearchComp'

const AddOrUpdateComp = lazy(() => import('./Components/AddOrUpdateComp'));
const EmployeeDetails = lazy(() => import('./Components/EmployeeDetails'));

function App() {

  return (
    <EmployeeDbProvider>
      <Header/>
      <SearchComp/>
      <div className='container flex max-w-screen-xl mx-auto px-5 gap-5'>
        <div className='container w-8/12'>
          <EmployeesTable/>
        </div>
        <div className='container w-4/12'>
          <Suspense fallback={FallbackComponent}>
            <Routes>
              <Route path='/' element={<AddButton/>}></Route>
              <Route path='/add-employee' element={<AddOrUpdateComp/>}></Route>
              <Route path='/update-employee/:id' element={<AddOrUpdateComp/>}></Route>
              <Route path='/employees' element={<Navigate to="/"/>}></Route>
              <Route path='/employees/:id' element={<EmployeeDetails/>}></Route>
            </Routes>
          </Suspense>
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

function FallbackComponent(){
  return(
    <div className="container p-5 border-1 border-cyan-900 rounded-lg bg-cyan-950/20">
      <h3 className="text-center opacity-75">
          <i className="fa-solid fa-spinner text-2xl mr-3"></i>
          <span className="text-xl">Loading</span>
      </h3>
    </div>
  );
}

