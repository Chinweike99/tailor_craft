import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import apiClient from "./api";

export const useGet = <T>(key: string[], url: string, enabled = true) => {
  return useQuery<T, AxiosError>({
    queryKey: key,
    queryFn: async () => {
      const response = await apiClient.get(url);
      return response as T;
    },
    enabled,
  });
};

export const usePost = <T, U>(key: string[], url: string) => {
  const queryClient = useQueryClient();
  return useMutation<T, AxiosError, U>({
    mutationKey: key,
    mutationFn: async (data: U) => {
      const response = await apiClient.post(url, data);
      return response as T;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [key[0]] });
      toast.success("Operation successful");
    },
    onError: (error) => {
      toast.error(error.message || "An error occurred");
    },
  });
};

export const usePatch = <T, U>(key: string[], url: string) => {
  const queryClient = useQueryClient();
  return useMutation<T, AxiosError, U>({
    mutationKey: key,
    mutationFn: async (data: U) => {
      const response = await apiClient.patch(url, data);
      return response as T;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [key[0]] });
      toast.success("Update successful");
    },
    onError: (error) => {
      toast.error(error.message || "An error occurred");
    },
  });
};

export const useDelete = <T>(key: string[], baseUrl: string) => {
  const queryClient = useQueryClient();
  return useMutation<T, AxiosError, string>({
    mutationKey: key,
    mutationFn: async (id: string) => {
      const response = await apiClient.delete(`${baseUrl}/${id}`);
      return response as T;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [key[0]] });
      toast.success("Delete successful");
    },
    onError: (error) => {
      toast.error(error.message || "An error occurred");
    },
  });
};