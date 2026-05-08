export interface CreateEventInput {
    title: string;

    description?: string;

    type: string;

    roomId: string;

    startTime: string;

    endTime: string;
}
