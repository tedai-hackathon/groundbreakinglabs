interface OverviewSectionProps {
  name: string;
  emoji: string;
}

const OverviewSection: React.FC<OverviewSectionProps> = ({ name, emoji }) => {
  return (
    <div className="flex items-center mb-4 p-3 bg-white shadow-xl rounded">
      <span role="img" aria-label="question" className="text-4xl mr-2">
        {emoji}
      </span>
      <h2 className="text-2xl text-black font-bold">{name}</h2>
    </div>
  );
};

export default OverviewSection;
