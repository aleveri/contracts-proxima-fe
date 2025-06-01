import { useEffect, useState } from 'react';
import { getAllContracts } from '../../services/contractsService';
import type { Contract } from '../../models/Contract';
import { Link } from 'react-router-dom';
import './ContractList.css';

export default function ContractList() {
  const [contracts, setContracts] = useState<Contract[]>([]);

  useEffect(() => {
    getAllContracts()
      .then(res => {
        if (res.success) setContracts(res.content);
      })
      .catch(err => console.error('Error al obtener contratos:', err));
  }, []);

  return (
    <div className="contract-list-container">
      <div className="header-with-button">
        <h2>Lista de Contratos</h2>
        <Link className="new-button" to="/crear">
          + Nuevo Contrato
        </Link>
      </div>
      <table className="contract-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>DNI</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {contracts.map(contract => (
            <tr key={contract.id}>
              <td>{contract.nombre}</td>
              <td>{contract.apellido}</td>
              <td>{contract.dni}</td>
              <td>
                <Link className="edit-button" to={`/editar/${contract.id}`}>
                  Editar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}