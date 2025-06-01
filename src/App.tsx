import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import ContractList from './components/contract-list/ContractList';
import ContractForm from './components/contact-form/ContractForm';

function EditContractWrapper() {
  const { id } = useParams();
  const navigate = useNavigate();
  return <ContractForm contractId={Number(id)} onSuccess={() => navigate('/')} />;
}

function CreateContractWrapper() {
  const navigate = useNavigate();
  return <ContractForm onSuccess={() => navigate('/')} />;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<ContractList />} />
      <Route path="/crear" element={<CreateContractWrapper />} />
      <Route path="/editar/:id" element={<EditContractWrapper />} />
    </Routes>
  );
}

export default App;