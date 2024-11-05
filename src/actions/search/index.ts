'use server';

import { GeocodingResponse } from "@/types/location.interface";
import { OperationResult } from "@/types/operation-result";
import { serverActionWrapper } from "../server-action-wrapper";
import { readData } from "@/core/http-service";
import { API_KEY } from "@/config/global";

export async function searchAction(formState: OperationResult<GeocodingResponse> | null, formData: FormData) {
    const search = formData.get("text") as string;
    return serverActionWrapper(async () => await readData<GeocodingResponse>(`/geocode/search?api_key=${API_KEY}&text=${search}`))
}