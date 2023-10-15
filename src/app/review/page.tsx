import OverviewSection from "@components/OverviewSection";

const Overview: React.FC = () => {
  const questionExample =
    "What does the librarian do before the library opens to the public?";

  const questionOptionsExample = [
    "She organizes the bookshelves.",
    "She sips herbal tea and enjoys the quiet.",
    "She goes for a walk around the lake.",
    "She meets with aging scholars for discussions.",
  ];

  return (
    <div className="bg-emerald-600 min-h-screen p-6">
      <h1 className="text-4xl font-bold mb-8 text-center">Overview</h1>
      <p className="text-2xl text-center mb-8">
        Let's review your practice session!
      </p>

      <div className="max-w-2xl mx-auto p-6 rounded">
        {/* Main Idea section */}
        <div className="mb-6">
          <OverviewSection name="Main Idea" emoji="💡" />
          <Question
            title={questionExample}
            options={questionOptionsExample}
            correctOption={1}
            selectedOption={2}
          />
        </div>

        {/* Inference section */}
        <div className="mb-6">
          <OverviewSection name="Inference" emoji="🙋" />
          <Question
            title={questionExample}
            options={questionOptionsExample}
            correctOption={1}
            selectedOption={1}
          />
        </div>

        {/* Inference section */}
        <div className="mb-6">
          <OverviewSection name="Details" emoji="✏️" />
          <Question
            title={questionExample}
            options={questionOptionsExample}
            correctOption={0}
            selectedOption={3}
          />
        </div>

        {/* Inference section */}
        <div className="mb-6">
          <OverviewSection name="Vocab" emoji="📕" />
          <Question
            title={questionExample}
            options={questionOptionsExample}
            correctOption={0}
            selectedOption={2}
          />
        </div>
      </div>
    </div>
  );
};

interface QuestionProps {
  title: string;
  options: string[];
  correctOption?: number;
  selectedOption?: number;
}

const Question: React.FC<QuestionProps> = ({
  title,
  options,
  correctOption,
  selectedOption,
}) => {
  return (
    <div className="mb-6">
      <h3 className="mb-4 text-xl">{title}</h3>
      <div className="space-y-2">
        {options.map((option, index) => (
          <label
            key={index}
            className={`flex items-center text-xl block ${
              index === correctOption
                ? "font-bold text-green-500"
                : index === selectedOption
                ? "font-bold text-red-500"
                : ""
            }`}
          >
            <input type="radio" name="answer" className="mr-2" disabled />
            {String.fromCharCode(65 + index)}) {option}
          </label>
        ))}
      </div>
    </div>
  );
};

export default Overview;
