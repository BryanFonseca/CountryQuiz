import { ReactNode } from "react";

interface IQuestionProps {
    children: ReactNode;
}
function Question({ children }: IQuestionProps) {
    return (
        <p className="mt-8 text-2xl text-white max-w-[50%] text-center">
            {children}
        </p>
    );
}

export default Question;
