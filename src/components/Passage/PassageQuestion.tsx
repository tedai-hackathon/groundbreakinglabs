export type PassageQuestionProps = {
  question: string;
  answers: string[];
  name?: string;
};

const PassageQuestion: React.FC<PassageQuestionProps> = ({ question, answers, name }) => {
  const answerLabels = ['A', 'B', 'C', 'D', 'E', 'F'];

  return (
    <div className="mb-4">
      <p className="font-bold mb-2 text-2xl">{question}</p>
      <div className="space-y-4">
        {answers.map((answer, index) => (
          <label key={index} className="flex items-center space-x-2 text-xl">
            <input type="radio" name={name} className="form-radio text-emerald-600 h-5 w-5" />
            <span>{`${answerLabels[index]}) ${answer}`}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default PassageQuestion;
