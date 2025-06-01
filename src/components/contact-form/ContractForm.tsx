import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createContract, updateContract, getContractById, getAllTarifas } from '../../services/contractsService';
import type { Contract } from '../../models/Contract';
import type { Tarifa } from '../../models/Tarifa';
import './ContractForm.css';

interface ContractFormProps {
  contractId?: number;
  onSuccess: () => void;
}

export default function ContractForm({ contractId, onSuccess }: ContractFormProps) {
  const [contract, setContract] = useState<Contract>({
    dni: '',
    nombre: '',
    apellido: '',
    tarifaId: 0,
    fechaContratacion: new Date().toISOString().substring(0, 10)
  });
  const [tarifas, setTarifas] = useState<Tarifa[]>([]);

  useEffect(() => {
    getAllTarifas().then(res => {
      if (res.success) setTarifas(res.content);
    });

    if (contractId) {
      getContractById(contractId).then(res => {
        if (res.success) {
          setContract(res.content);
        }
      });
    }
  }, [contractId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setContract(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (contractId) {
      await updateContract(contractId, contract);
    } else {
      await createContract(contract);
    }

    onSuccess();
  };

  const navigate = useNavigate();

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>{contractId ? 'Actualizar Contrato' : 'Crear Contrato'}</h2>

      <div className="form-group">
        <label>DNI</label>
        <input
          name="dni"
          value={contract.dni}
          onChange={handleChange}
          placeholder="Ej: 12345678Z"
          required
        />
      </div>

      <div className="form-group">
        <label>Nombre</label>
        <input
          name="nombre"
          value={contract.nombre}
          onChange={handleChange}
          placeholder="Ej: Juan"
          required
        />
      </div>

      <div className="form-group">
        <label>Apellido</label>
        <input
          name="apellido"
          value={contract.apellido}
          onChange={handleChange}
          placeholder="Ej: Pérez"
          required
        />
      </div>

      <div className="form-group">
        <label>Tarifa</label>
        <select
          name="tarifaId"
          value={contract.tarifaId}
          onChange={handleChange}
          required
        >
          <option value="">Selecciona una tarifa</option>
          {tarifas.map(t => (
            <option key={t.id} value={t.id}>
              {t.nombre} €{t.precio}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Fecha de Contratación</label>
        <input
          type="date"
          name="fechaContratacion"
          value={formatDate(contract.fechaContratacion)}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-actions">
        <button
          type="button"
          className="cancel-button"
          onClick={() => navigate('/')}
        >
          Cancelar
        </button>
        <button type="submit" className="submit-button">
          {contractId ? 'Actualizar Contrato' : 'Crear Contrato'}
        </button>
      </div>
    </form>
  );
}