import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginScreen } from '../components/login/LoginScreen';
import { DashboardRoutes } from './DashboardRoutes';
import { PrivateRoute } from './PrivateRoute';
import 'animate.css';
import { PublicRoute } from './PublicRoute';



export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>

                <Route path='/login' element={
                    <PublicRoute>
                        <LoginScreen />
                    </PublicRoute>
                }/>
                {/* <Route path='/login' element={ <LoginScreen /> } /> */}

                <Route path='/*' element={
                    <PrivateRoute>
                        <DashboardRoutes />
                    </PrivateRoute>
                } />
                {/* <Route path='/*' element={ <DashboardRoutes /> }/> */}
            </Routes>
        </BrowserRouter>
    )
}