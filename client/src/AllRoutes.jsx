import React from 'react'
import { Routes, Route } from 'react-router'

import Home from './pages/Home'
import Auth from './pages/auth/Auth'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Perfumes from './pages/perfumes/Perfumes'
import AquaPerfumes from './pages/perfumes/AquaPerfumes'
import OudPerfumes from './pages/perfumes/OudPerfumes'
import PremiumPerfumes from './pages/perfumes/PremiumPerfumes'
import SuvarnaPerfumes from './pages/perfumes/SuvarnaPerfumes'
import Attars from './pages/attars/Attars'
import OudAttars from './pages/attars/OudAttars'
import SuvarnaAttars from './pages/attars/SuvarnaAttars'
import PremiumAttars from './pages/attars/PremiumAttars'
import Air from "./pages/air/AirFresheners"
import Oil from "./pages/oil/DiffuserOil"
import Skin from './pages/skin/SkinCare'
import Toners from './pages/skin/Toners'
import Ubtan from './pages/skin/Ubtan'
import Gift from "./pages/gift/GiftHamper"

const AllRoutes = () => {
  return (
    <Routes>AllRoutes
    <Route index element={<Home />} />
      
    <Route exact path='auth' element={<Auth />} />
    <Route exact path='login' element={<Login />} />
    <Route exact path='signup' element={<Signup />} />

    <Route exact path='perfumes' element={<Perfumes />} />
    <Route exact path='aquaperfumes' element={ <AquaPerfumes/>} />
    <Route exact path='oudperfumes' element={ <OudPerfumes/>} />
    <Route exact path='premiumperfumes' element={ <PremiumPerfumes/>} />
    <Route exact path='suvarnaperfumes' element={ <SuvarnaPerfumes/>} />
  
    <Route exact path='attars' element={ <Attars/>} />
    <Route exact path='oudattars' element={ <OudAttars/>} />
    <Route exact path='suvarnaattars' element={ <SuvarnaAttars/>} />
    <Route exact path='premiumattars' element={<PremiumAttars />} />
      
    <Route exact path='air' element={<Air/>}/>
    <Route exact path='oil' element={<Oil/>}/>
  
    <Route exact path='skin' element={<Skin/> } />
    <Route exact path='toners' element={<Toners/> } />
    <Route exact path='ubtan' element={<Ubtan />} />
      
    <Route exact path='gift' element={<Gift/>}/>
    </Routes>
  )
}

export default AllRoutes