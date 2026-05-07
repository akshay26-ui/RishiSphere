export interface CreateRoomInput {
    name: string;

    capacity: number;

    description?: string;
}

export interface UpdateRoomInput {
    name?: string;

    capacity?: number;

    description?: string;
}
