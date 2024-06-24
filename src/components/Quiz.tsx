import { IQuestion } from "../types/domain";
import QuestionNumber from "./QuestionNumber";
import Question from "./Question";
import Option from "./Option";
import { useState } from "react";

interface IQuizProps {
    questions: IQuestion[];
    onComplete: (correctlyAnsweredQuantity: number) => void;
}

function Quiz({
    questions: questionProps = [],
    onComplete = () => {},
}: IQuizProps) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(-1);
    const [questions, setQuestions] = useState(() =>
        questionProps.map((question) => ({
            ...question,
            selectedOptionIndex: -1,
        }))
    );

    const currentQuestion = questions.at(currentQuestionIndex);

    function handleClickQuestionNumber(questionIndex: number) {
        setSelectedOptionIndex(-1);
        setCurrentQuestionIndex(questionIndex);
    }

    function handleClickOption(optionIndex: number) {
        setSelectedOptionIndex(optionIndex);
        setQuestions((prev) => {
            const newState = [...prev];
            newState[currentQuestionIndex].selectedOptionIndex = optionIndex;
            return newState;
        });

        const isLastQuestion = currentQuestionIndex === questions.length - 1;
        if (!isLastQuestion) return;
        onComplete(
            questions.filter(
                (question) =>
                    question.selectedOptionIndex ===
                    question.options.findIndex((option) => option.isCorrect)
            ).length
        );
    }

    return (
        <div className="flex flex-col items-center w-full max-w-[53.125rem] p-9 bg-blue rounded-xl">
            <h1 className="font-semibold text-grey">Country Quiz</h1>
            <QuestionNumber.List>
                {Array.from({ length: questions.length }).map((_, index) => (
                    <QuestionNumber.Item
                        key={index}
                        onClick={() => handleClickQuestionNumber(index)}
                        isCurrent={index <= currentQuestionIndex}
                    >
                        {index + 1}
                    </QuestionNumber.Item>
                ))}
            </QuestionNumber.List>

            <Question>
                {currentQuestion?.question ?? "Invalid Question :("}
            </Question>
            <Option.Grid>
                {currentQuestion?.options.map((option, index) => (
                    <Option.Item
                        key={option.label}
                        isClicked={
                            selectedOptionIndex === index ||
                            currentQuestion.selectedOptionIndex === index
                        }
                        disabled={currentQuestion.selectedOptionIndex !== -1}
                        // TODO: Move all this trash to Option.Item component
                        status={
                            currentQuestion.selectedOptionIndex !== -1 &&
                            option.isCorrect
                                ? "correct"
                                : currentQuestion.selectedOptionIndex ===
                                      index && !option.isCorrect
                                ? "incorrect"
                                : ""
                        }
                        onClick={() => handleClickOption(index)}
                    >
                        {option.label}
                    </Option.Item>
                ))}
            </Option.Grid>
        </div>
    );
}

export default Quiz;
