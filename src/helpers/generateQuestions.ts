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
        // const getRandomCountry = () => getRandomItem(countries);
		const randomIndex = randomBetween(countries.length - 1);
        const randomCountry = countries[randomIndex];
        const flag = randomCountry.flag;
		// Select a random item that's between the current element and n elements ahead
		// const random1Index = (randomIndex + randomBetween(5, 1)) % countries.length;
		// const random2Index = (random1Index + randomBetween(5, 1)) % countries.length;
		// const random3Index = (random2Index + randomBetween(5, 1)) % countries.length;
		const random1Index = (randomIndex + randomBetween(Math.floor((countries.length - 2) / 5))) % countries.length;
		const random2Index = (random1Index + randomBetween(Math.floor((countries.length - 2) / 5))) % countries.length;
		const random3Index = (random2Index + randomBetween(Math.floor((countries.length - 2) / 5))) % countries.length;
        const options = [
            randomCountry,
			countries[random1Index],
			countries[random2Index],
			countries[random3Index],
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


		const randomIndex = randomBetween(countriesWithCapital.length - 1);
        const randomCountry = countriesWithCapital[randomIndex];
        const [capital] = randomCountry.capital;
		// Select a random item that's between the current element and n elements ahead
		const random1Index = (randomIndex + randomBetween(Math.floor((countriesWithCapital.length - 2) / 5))) % countriesWithCapital.length;
		const random2Index = (random1Index + randomBetween(Math.floor((countriesWithCapital.length - 2) / 5))) % countriesWithCapital.length;
		const random3Index = (random2Index + randomBetween(Math.floor((countriesWithCapital.length - 2) / 5))) % countriesWithCapital.length;
        const options = [
            randomCountry,
			countriesWithCapital[random1Index],
			countriesWithCapital[random2Index],
			countriesWithCapital[random3Index],
        ];

        // const getRandomCountry = () => getRandomItem(countriesWithCapital);
        // const randomCountry = getRandomCountry();
        // const [capital] = randomCountry.capital;
        // const options = [
        //     randomCountry,
        //     getRandomCountry(),
        //     getRandomCountry(),
        //     getRandomCountry(),
        // ];
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
