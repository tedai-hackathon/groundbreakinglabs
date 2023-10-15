import Head from "next/head";
import InterestButton from "@components/InterestButton";
import Link from 'next/link';
import Button from "@components/Button";

export default function Home() {
  return (
    <div className="min-h-screen bg-main bg-emerald-600 p-20">
      <Head>
        <title>Settle</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="space-y-10 flex flex-col items-center">
        <div className="space-y-4">
          <h1 className="text-5xl font-semibold text-white text-center">
            Welcome, Dilan!
          </h1>
          <p className="text-2xl text-white text-center">What are your interests?</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-4">
          <InterestButton label="Sports" />
          <InterestButton label="Video Games" />
          <InterestButton label="Art" />
          <InterestButton label="Theater" />
          <InterestButton label="Music" />
          <InterestButton label="Technology" />
          <InterestButton label="Fashion" />
          <InterestButton label="Food and Drink" />
          <InterestButton label="Travel" />
          <InterestButton label="Science" />
          <InterestButton label="Movies" />
          <InterestButton label="Fitness" />
          <InterestButton label="Environment" />
          <InterestButton label="History" />
          <InterestButton label="Politics" />
        </div>

        <Button label="Let's start" link="/practice" className="w-1/2" />
      </div>
    </div>
  );
}
