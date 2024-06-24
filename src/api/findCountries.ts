import { ICountry } from "../types/domain";

export default async function (abortSignal?: AbortSignal): Promise<ICountry[]> {
    const response = await fetch("https://restcountries.com/v3.1/all", {
        signal: abortSignal,
    });
    if (!response.ok) throw new Error("Couldn't fetch questions from server.");
    return response.json();
}
