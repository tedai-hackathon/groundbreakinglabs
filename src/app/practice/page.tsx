import Head from "next/head";
import ReadingPrompt from "@components/Passage/ReadingPrompt";
import PassageSetOfQuestions from "@components/Passage/PassageSetOfQuestions";
import Button from "@components/Button";

const question = "Why was Julia confident about winning the Bake-Off?";
const answers = [
  "She practiced every day.",
  "She was a renowned chef.",
  "She had a secret family recipe.",
  "She had won before."
];

const questions = [
    {
      question: "Why was Julia confident about winning the Bake-Off?",
      answers: ["She practiced every day.", "She was a renowned chef.", "She had a secret family recipe.", "She had won before."]
    },
    {
      question: "Which word in the passage is a synonym for 'scent'?",
      answers: ["Echoed", "Texture", "Booth", "Aroma"]
    },
    {
      question: "Where did the Great Bake-Off take place?",
      answers: ["At Julia's home", "In the town of Ovenville's square", "In a big hall", "At the judges' houses"]
    },
    {
      question: "What is the main idea of the passage?",
      answers: ["Julia's grandmother was a great baker.", "The town of Ovenville loved to eat cookies.", "Julia wins the Great Bake-Off using her grandmother's secret recipe.", "The judges were from different parts of the country."]
    },
  ];

export default function Home() {
  return (
    <div className="min-h-screen bg-emerald-600 p-10">
      <Head>
        <title>Reading Practice</title>
      </Head>

      <div className="p-8 rounded-md max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Reading Practice</h1>
        <p className="mb-10 text-2xl">
          Read this passage and answer some questions.
        </p>
        <ReadingPrompt
          text={`Every year in the town of Ovenville, there was a special event that everyone looked forward to: The Great Bake-Off. This was the time when all the talented bakers in town would come together to showcase their culinary skills. Julia, a young girl with a passion for baking, had been practicing for months. She was determined to win this year.
                Julia's grandmother had passed down a secret cookie recipe that was known to be the best in their family. The cookies were soft, chewy, and had a hint of cinnamon and vanilla. Julia believed that this recipe was her ticket to victory.
                The day of the competition arrived, and the town square was bustling with activity. There were booths with colorful decorations, the delicious aroma of baked goods wafted through the air, and the sounds of laughter and excitement echoed everywhere.
                Julia set up her booth and began baking her special cookies. As they came out of the oven, a line formed in front of her booth. People were eager to try them. The judges, renowned chefs from different parts of the country, tasted her cookies and nodded in approval.
                When the results were announced, Julia was ecstatic. Her cookies had won first place! The judges praised the perfect balance of flavors and the texture of the cookies. Julia felt proud and grateful for her grandmother's treasured recipe.`}
        />

        <div className="mb-4">
            <PassageSetOfQuestions questions={questions} />
        </div>

        <Button className="w-[125px] mt-5" label={"Submit"} link="review" />
      </div>
    </div>
  );
}
