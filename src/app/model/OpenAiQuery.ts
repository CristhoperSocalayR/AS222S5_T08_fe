export interface OpenAiQuery {
    id: number;
    prompt: string;
    response: string;
    timestamp: string; // Timestamp en formato ISO
}