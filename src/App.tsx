import { useEffect, useReducer } from "react";
import Layout from "./components/Layout";
import Quiz from "./components/Quiz";
import CompletionCard from "./components/CompletionCard";
import generateQuestions from "./helpers/generateQuestions";
import type { IQuestion } from "./types/domain";
import findCountries from "./api/findCountries";

interface IGlobalState {
    serverStuff: {
        isLoading: boolean;
        isError: boolean;
        questions: IQuestion[];
    };
    isCompleted: boolean;
    correctlyAnsweredQty: number;
}

type TActions =
    | {
          type: "startFetching";
      }
    | {
          type: "stopFetching";
      }
    | {
          type: "errorFetching";
      }
    | {
          type: "reset";
      }
    | {
          type: "complete";
          payload: number;
      }
    | {
          type: "succeedFetching";
          payload: IQuestion[];
      };

function reducer(prevState: IGlobalState, action: TActions): IGlobalState {
    switch (action.type) {
        case "startFetching": {
            return {
                ...prevState,
                serverStuff: {
                    ...prevState.serverStuff,
                    isLoading: true,
                    isError: false,
                },
            };
        }
        case "stopFetching": {
            return {
                ...prevState,
                serverStuff: {
                    ...prevState.serverStuff,
                    isLoading: false,
                },
            };
        }
        case "succeedFetching": {
            return {
                ...prevState,
                serverStuff: {
                    ...prevState.serverStuff,
                    isLoading: false,
                    questions: action.payload,
                },
            };
        }
        case "errorFetching": {
            return {
                ...prevState,
                serverStuff: {
                    ...prevState.serverStuff,
                    isLoading: false,
                    isError: true,
                },
            };
        }
        case "complete": {
            return {
                ...prevState,
                isCompleted: true,
                correctlyAnsweredQty: action.payload,
            };
        }
        case "reset": {
            return INITIAL_STATE;
        }
        default: {
            throw new Error("Action not supported.");
        }
    }
}

const INITIAL_STATE = {
    serverStuff: {
        isLoading: false,
        isError: false,
        questions: [],
    },
    isCompleted: false,
    correctlyAnsweredQty: 0,
};

function App() {
    const [
        {
            isCompleted,
            correctlyAnsweredQty,
            serverStuff: { isError, isLoading, questions },
        },
        dispatch,
    ] = useReducer(reducer, INITIAL_STATE);

    async function getQuestions(signal?: AbortSignal) {
        dispatch({ type: "startFetching" });
        try {
            const countries = await findCountries(signal);
            const questions = generateQuestions(countries);
            dispatch({ type: "succeedFetching", payload: questions });
        } catch (error) {
            if (error instanceof DOMException) return;
            dispatch({ type: "errorFetching" });
        }
    }

    useEffect(() => {
        const controller = new AbortController();
        getQuestions(controller.signal);

        return () => {
            controller.abort();
            dispatch({ type: "stopFetching" });
        };
    }, []);

    function handleCompleteQuiz(corrects: number) {
        dispatch({ type: "complete", payload: corrects });
    }

    function handlePlayAgain() {
        dispatch({ type: "reset" });
        getQuestions();
    }

    return (
        <Layout>
            {isLoading && (
                <p className="text-xl animate-pulse">Loading Questions...</p>
            )}
            {isError && <p className="text-xl">Error fetching questions ☠️</p>}
            {!isLoading &&
                !isError &&
                (!isCompleted ? (
                    <Quiz
                        onComplete={handleCompleteQuiz}
                        questions={questions}
                    />
                ) : (
                    <CompletionCard
                        got={correctlyAnsweredQty}
                        outOf={questions.length}
                        onPlayAgain={handlePlayAgain}
                    />
                ))}
        </Layout>
    );
}

export default App;
