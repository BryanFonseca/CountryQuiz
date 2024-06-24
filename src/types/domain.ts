interface ICountry {
    name: {
        common: string;
        official: string;
        nativeName: {
            ron: {
                official: string;
                common: string;
            };
        };
    };
    status: string;
    currencies: {
        MDL: {
            name: string;
            symbol: string;
        };
    };
    capital: string[];
    region: string;
    subregion: string;
    languages: {
        ron: string;
    };
    borders: string[];
    area: number;
    demonyms: {
        eng: {
            f: string;
            m: string;
        };
        fra: {
            f: string;
            m: string;
        };
    };
    flag: string;
    population: number;
    fifa: string;
    car: {
        signs: string[];
        side: string;
    };
    continents: string[];
    flags: {
        png: string;
        svg: string;
        alt: string;
    };
    startOfWeek: string;
    postalCode: {
        format: string;
        regex: string;
    };
}

interface IQuestion {
    question: string;
    options: {
        label: string;
        isCorrect: boolean;
    }[];
}

export type { ICountry, IQuestion };
