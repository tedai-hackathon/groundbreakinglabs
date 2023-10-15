import Logo from "@components/Logo";
import OverviewSection from "@components/OverviewSection";

const Overview: React.FC = () => {
  const questions = [
    {
      question: "Why was Julia confident about winning the Bake-Off?",
      answers: [
        "She practiced every day.",
        "She was a renowned chef.",
        "She had a secret family recipe.",
        "She had won before.",
      ],
    },
    {
      question: "Which word in the passage is a synonym for 'scent'?",
      answers: ["Echoed", "Texture", "Booth", "Aroma"],
    },
    {
      question: "Where did the Great Bake-Off take place?",
      answers: [
        "At Julia's home",
        "In the town of Ovenville's square",
        "In a big hall",
        "At the judges' houses",
      ],
    },
    {
      question: "What is the main idea of the passage?",
      answers: [
        "Julia's grandmother was a great baker.",
        "The town of Ovenville loved to eat cookies.",
        "Julia wins the Great Bake-Off using her grandmother's secret recipe.",
        "The judges were from different parts of the country.",
      ],
    },
  ];

  return (
    <div className="bg-emerald-600 text-white min-h-screen p-6">
      <div className="max-w-2xl mx-auto p-6 rounded">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>

        <h1 className="text-4xl font-bold mb-8">Overview</h1>
        <p className="text-2xl mb-8">Let's review your practice session!</p>

        {/* Main Idea section */}
        <div className="mb-6">
          <OverviewSection name="Main Idea" emoji="💡" />
          <Question
            title={questions[0].question}
            options={questions[0].answers}
            correctOption={1}
            selectedOption={2}
          />
        </div>

        {/* Inference section */}
        <div className="mb-6">
          <OverviewSection name="Inference" emoji="🙋" />
          <Question
            title={questions[1].question}
            options={questions[1].answers}
            correctOption={1}
            selectedOption={1}
          />
        </div>

        {/* Inference section */}
        <div className="mb-6">
          <OverviewSection name="Details" emoji="✏️" />
          <Question
            title={questions[2].question}
            options={questions[2].answers}
            correctOption={0}
            selectedOption={3}
          />
        </div>

        {/* Inference section */}
        <div className="mb-6">
          <OverviewSection name="Vocab" emoji="📕" />
          <Question
            title={questions[3].question}
            options={questions[3].answers}
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
    <div className="mb-6 bg-white text-black p-5 rounded">
      <h3 className="mb-4 text-xl font-bold">{title}</h3>
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
