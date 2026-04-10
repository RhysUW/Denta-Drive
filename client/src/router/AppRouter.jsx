import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AppLayout from '../components/layout/AppLayout';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import PatientsPage from '../pages/PatientsPage';
import PatientDetailPage from '../pages/PatientDetailPage';
import PatientAppointmentsPage from '../pages/PatientAppointmentsPage';
import CalendarPage from '../pages/CalendarPage';
import GoalsPage from '../pages/GoalsPage';
import MedicationsPage from '../pages/MedicationsPage';
import TemplatesPage from '../pages/TemplatesPage';
import ADACodesPage from '../pages/ADACodesPage';
import GeneralPage from '../pages/GeneralPage';
import DentalRXPage from '../pages/DentalRXPage';
import DentalAntiviralPage from '../pages/DentalAntiviralPage';
import DentalAntifungalPage from '../pages/DentalAntifungalPage';
import LocalAnaestheticPage from '../pages/LocalAnaestheticPage';
import AnalgesicsPage from '../pages/AnalgesicsPage';
import TemplateDetailPage from '../pages/TemplateDetailPage';
import EmergencyProtocolsPage from '../pages/EmergencyProtocolsPage';
import Spinner from '../components/ui/Spinner';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="flex items-center justify-center h-screen"><Spinner size="lg" /></div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="flex items-center justify-center h-screen"><Spinner size="lg" /></div>;
  if (user) return <Navigate to="/" replace />;
  return children;
};

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<PatientsPage />} />
          <Route path="patients/:id" element={<PatientDetailPage />} />
          <Route path="patients/:id/appointments" element={<PatientAppointmentsPage />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="goals" element={<GoalsPage />} />
          <Route path="references/medications" element={<MedicationsPage />} />
          <Route path="references/templates" element={<TemplatesPage />} />
          <Route path="references/templates/:id" element={<TemplateDetailPage />} />
          <Route path="references/ada-codes" element={<ADACodesPage />} />
          <Route path="references/general" element={<GeneralPage />} />
          <Route path="references/dental-rx/antibiotics" element={<DentalRXPage />} />
          <Route path="references/dental-rx/antiviral" element={<DentalAntiviralPage />} />
          <Route path="references/dental-rx/antifungal" element={<DentalAntifungalPage />} />
          <Route path="references/dental-rx/local-anaesthetic" element={<LocalAnaestheticPage />} />
          <Route path="references/dental-rx/analgesics" element={<AnalgesicsPage />} />
          <Route path="references/emergency-protocols" element={<EmergencyProtocolsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
