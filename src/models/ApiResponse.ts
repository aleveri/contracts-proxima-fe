export interface ApiResponse<T> {
  success: boolean;
  content: T;
  errors?: string[];
}