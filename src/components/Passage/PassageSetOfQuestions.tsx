import PassageQuestion, {
  PassageQuestionProps,
} from "@components/Passage/PassageQuestion";

type PassageSetOfQuestionsProps = {
  questions: PassageQuestionProps[];
};

const PassageSetOfQuestions: React.FC<PassageSetOfQuestionsProps> = ({
  questions,
}) => {
  return (
    <div className="mb-8 p-5 pt-7 pb-7 bg-white rounded shadow text-black mt-10 space-y-10">
      {questions.map((q, index) => (
        <PassageQuestion
          key={index}
          question={q.question}
          answers={q.answers}
          name={`question-${index}`}
        />
      ))}
    </div>
  );
};

export default PassageSetOfQuestions;
