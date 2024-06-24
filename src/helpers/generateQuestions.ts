import type { ICountry, IQuestion } from "../types/domain";

function randomBetween(to: number, from: number = 0) {
    return from + Math.floor(Math.random() * (to + 1));
}

function getRandomItem<T>(collection: T[]) {
    const randomItemIndex = randomBetween(collection.length - 1);
    const randomItem = collection[randomItemIndex];
    return randomItem;
}

function shuffle<T>(collection: T[]) {
    // shallow copy is good enough for this
    const collectionClone: T[] = [...collection];

    for (let i = 0; i < collectionClone.length; i++) {
        const currentElement = collectionClone[i];
        const randomIndex = randomBetween(collectionClone.length - 1);
        const randomElement = collectionClone[randomIndex];
        collectionClone[i] = randomElement;
        collectionClone[randomIndex] = currentElement;
    }

    return collectionClone;
}

const QUESTIONS_MODEL = [
    (countries: ICountry[]) => {
        // 1. A qué país pertenece esta bandera?
        // Seleccionar una bandera al azar y el país al que pertenece
        // Seleccionar tres otros países n espacios más adelante (considerar usar módulo)
        const getRandomCountry = () => getRandomItem(countries);
        const randomCountry = getRandomCountry();
        const flag = randomCountry.flag;
        const options = [
            randomCountry,
            getRandomCountry(),
            getRandomCountry(),
            getRandomCountry(),
        ];
        return {
            question: `Which country does this flag ${flag} belong to?`,
            options: shuffle(
                options.map((option, index) => ({
                    label: option.name.common,
                    isCorrect: index === 0,
                }))
            ),
        };
    },
    (countries: ICountry[]) => {
        // 2. Qué país tiene como capital esta ciudad?
        // Seleccionar un país al azar y su capital
        // Seleccionar otros tres países al azar

        // Some countries seem to not have a capital
        const countriesWithCapital = countries.filter(
            (country) => !!country.capital && !!country.capital[0]
        );
        const getRandomCountry = () => getRandomItem(countriesWithCapital);
        const randomCountry = getRandomCountry();
        const [capital] = randomCountry.capital;
        const options = [
            randomCountry,
            getRandomCountry(),
            getRandomCountry(),
            getRandomCountry(),
        ];
        return {
            question: `Which country is ${capital} the capital?`,
            options: shuffle(
                options.map((option, index) => ({
                    label: option.name.common,
                    isCorrect: index === 0,
                }))
            ),
        };
    },
];

// TODO: Fix the bug that occurs when options repeat as I'm using the label as key
export default function (
    countries: ICountry[],
    quantity: number = 10
): IQuestion[] {
    if (countries.length === 0) return [];
    return Array.from({ length: quantity }).map(() =>
        getRandomItem(QUESTIONS_MODEL)(countries)
    );
}
