import { api } from "@/api/interceptor";
import ENDPOINTS from "@/api/endpoints";
import type {
    AddressesApiResponse,
    AddressApiResponse,
    UpdateAddressPayload,
} from "../types/address.types";

export const addressService = {
    getAddresses: async (): Promise<AddressesApiResponse> => {
        const response = await api.get<AddressesApiResponse>(
            ENDPOINTS.ADDRESSES.GET_ADDRESSES,
        );
        return response.data;
    },

    createAddress: async (
        payload: UpdateAddressPayload,
    ): Promise<AddressApiResponse> => {
        const response = await api.post<AddressApiResponse>(
            ENDPOINTS.ADDRESSES.ADD_ADDRESS,
            payload,
        );
        return response.data;
    },

    updateAddress: async (
        id: number,
        payload: UpdateAddressPayload,
    ): Promise<AddressApiResponse> => {
        const response = await api.put<AddressApiResponse>(
            ENDPOINTS.ADDRESSES.UPDATE_ADDRESS_BY_ID(id),
            payload,
        );
        return response.data;
    },

    deleteAddress: async (id: number): Promise<AddressApiResponse> => {
        const response = await api.delete<AddressApiResponse>(
            ENDPOINTS.ADDRESSES.DELETE_ADDRESS_BY_ID(id),
        );
        return response.data;
    },

    setPrimaryAddress: async (id: number): Promise<AddressApiResponse> => {
        const response = await api.patch<AddressApiResponse>(
            ENDPOINTS.ADDRESSES.SET_PRIMARY_ADDRESS_BY_ID(id),
        );
        return response.data;
    },
};
