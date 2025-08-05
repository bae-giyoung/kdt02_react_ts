import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Nav from './components/Nav'
import Login from './components/Login'
import Subway from './components/Subway'
import SubwayChart from './components/SubwayChart'
import TodoList from './components/TodoList'
import MyClock from './02/MyClock'
import Lotto from './05/Lotto'
import FoodMain from './06/FoodMain'
import FoodMain2 from './06/FoodMain2'

function App() {
  return (
    <BrowserRouter>
      <div className="w-full xl:w-8/10 mx-auto h-screen
                    flex flex-col justify-start items-start">
        <Nav />
        <main className='w-full flex-grow overflow-y-auto py-10 px-4
                        flex flex-col justify-start items-center box-border'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/subway' element={<SubwayChart />} />
            <Route path='/todo' element={<TodoList />} />
            <Route path='/clock' element={<MyClock />} />
            <Route path='/lotto' element={<Lotto />} />
            <Route path='/food' element={<FoodMain />} />
            <Route path='/food2' element={<FoodMain2 />} />
          </Routes>
        </main>
        <footer className='w-full min-h-20 flex justify-center items-center
                          bg-black text-white'>
          K-Digital 2025 2기
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App
