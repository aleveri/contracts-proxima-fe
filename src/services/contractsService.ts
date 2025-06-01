import api from '../api/axios';
import type { ApiResponse } from '../models/ApiResponse';
import type { Contract } from '../models/Contract';
import type { Tarifa } from '../models/Tarifa';

export const getAllContracts = async (): Promise<ApiResponse<Contract[]>> => {
  const res = await api.get<ApiResponse<Contract[]>>('/contracts');
  return res.data;
};

export const getContractById = async (id: number): Promise<ApiResponse<Contract>> => {
  const res = await api.get<ApiResponse<Contract>>(`/contracts/${id}`);
  return res.data;
};

export const createContract = async (contract: Contract): Promise<ApiResponse<Contract>> => {
  const res = await api.post<ApiResponse<Contract>>('/contracts', contract);
  return res.data;
};

export const updateContract = async (id: number, contract: Contract): Promise<ApiResponse<void>> => {
  const res = await api.put<ApiResponse<void>>(`/contracts/${id}`, contract);
  return res.data;
};

export const getAllTarifas = async (): Promise<ApiResponse<Tarifa[]>> => {
  const res = await api.get<ApiResponse<Tarifa[]>>('/tarifas');
  return res.data;
};