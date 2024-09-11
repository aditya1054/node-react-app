import { DeleteResult, UpdateResult } from "typeorm";

export class ApiResponse<T>{
	Status?: boolean;
	Message?: string;
	Data?: T[] | T | UpdateResult | DeleteResult
}
