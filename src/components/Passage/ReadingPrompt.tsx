interface ReadingPromptProps {
  text: string;
}

const ReadingPrompt: React.FC<ReadingPromptProps> = ({ text }) => {
  return (
    <div className="bg-white rounded text-black border p-4 mb-8">
      {text.split("\n").map((para, idx) => (
        <p
          className={idx !== text.split("\n").length - 1 ? "mb-4" : ""}
          key={idx}
        >
          {para}
        </p>
      ))}
    </div>
  );
};

export default ReadingPrompt;
