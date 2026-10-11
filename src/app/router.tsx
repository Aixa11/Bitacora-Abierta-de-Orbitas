import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { BitacoraPage } from '../pages/BitacoraPage';
import { DesafioDetailPage } from '../pages/DesafioDetailPage';
import { DesafiosPage } from '../pages/DesafiosPage';
import { EntregaPage } from '../pages/EntregaPage';
import { EquipoPage } from '../pages/EquipoPage';
import { GlosarioPage } from '../pages/GlosarioPage';
import { HomePage } from '../pages/HomePage';
import { AyudaPage } from '../pages/AyudaPage';
import { CharlaPage } from '../pages/CharlaPage';
import { IaPage } from '../pages/IaPage';
import { LaboratorioPage } from '../pages/LaboratorioPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { ReglasPage } from '../pages/ReglasPage';
import { RutaPage } from '../pages/RutaPage';
import { SensoresPage } from '../pages/SensoresPage';

export function AppRouter() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/ruta" element={<RutaPage />} />
          <Route path="/desafios" element={<DesafiosPage />} />
          <Route path="/desafios/:id" element={<DesafioDetailPage />} />
          <Route path="/sensores" element={<SensoresPage />} />
          <Route path="/laboratorio" element={<LaboratorioPage />} />
          <Route path="/bitacora" element={<BitacoraPage />} />
          <Route path="/ia" element={<IaPage />} />
          <Route path="/equipo" element={<EquipoPage />} />
          <Route path="/entrega" element={<EntregaPage />} />
          <Route path="/reglas" element={<ReglasPage />} />
          <Route path="/charla" element={<CharlaPage />} />
          <Route path="/glosario" element={<GlosarioPage />} />
          <Route path="/ayuda" element={<AyudaPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
