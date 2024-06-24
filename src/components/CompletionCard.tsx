import Button from "./Button";
import IcCongrats from "../assets/Congrats.svg?react";

interface ICompletionCardProps {
    got: number;
    outOf: number;
    onPlayAgain: () => void;
}
function CompletionCard({ got, outOf, onPlayAgain }: ICompletionCardProps) {
    return (
        <div className="p-6 rounded-xl bg-blue w-[400px]">
            <IcCongrats className="mb-4" />
            <p className="w-11/12 mx-auto mb-3 text-2xl text-center">
                Congrats! You completed the quiz.
            </p>
            <p className="mb-10 text-sm text-center text-white/85">
                You answered {got}/{outOf} correctly
            </p>
            <Button
                onClick={onPlayAgain}
                className="block w-8/12 mx-auto mb-8"
                variant="secondary"
            >
                Play again
            </Button>
        </div>
    );
}

export default CompletionCard;
