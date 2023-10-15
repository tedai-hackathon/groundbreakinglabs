"use client";
import { useState } from "react";
import Head from "next/head";
import InterestButton from "@components/InterestButton";
import Link from "next/link";
import Button from "@components/Button";
import Logo from "@components/Logo";

export default function Home() {
  const [interests, setInterests] = useState<string[]>([]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await fetch("/api/student/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ interests: interests }),
    });
    const data = await response.json();
    console.log(data);
  };

  const handleInterestClick = (interest: string) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter((i) => i !== interest));
    } else {
      setInterests([...interests, interest]);
    }
  };

  return (
    <div className="min-h-screen bg-main bg-emerald-600 p-20">
      <Head>
        <title>ReadU</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="max-w-2xl mx-auto space-y-10 flex flex-col items-center">
        <Logo />
        <div className="space-y-4">
          <h1 className="text-5xl font-semibold text-white text-center">
            Welcome, Dilan!
          </h1>
          <p className="text-2xl text-white text-center">
            What are your interests?
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mb-4">
          <div className="space-y-10 flex flex-col items-center">
            <div className="flex flex-wrap justify-center gap-4 mb-4">
              <InterestButton
                label="Sports"
                callback={() => handleInterestClick("Sports")}
              />
              <InterestButton
                label="Video Games"
                callback={() => handleInterestClick("Video Games")}
              />
              <InterestButton
                label="Art"
                callback={() => handleInterestClick("Art")}
              />
              <InterestButton
                label="Theater"
                callback={() => handleInterestClick("Theater")}
              />
              <InterestButton
                label="Music"
                callback={() => handleInterestClick("Music")}
              />
              <InterestButton
                label="Technology"
                callback={() => handleInterestClick("Technology")}
              />
              <InterestButton
                label="Fashion"
                callback={() => handleInterestClick("Fashion")}
              />
              <InterestButton
                label="Food and Drink"
                callback={() => handleInterestClick("Food and Drink")}
              />
              <InterestButton
                label="Travel"
                callback={() => handleInterestClick("Travel")}
              />
              <InterestButton
                label="Science"
                callback={() => handleInterestClick("Science")}
              />
              <InterestButton
                label="Movies"
                callback={() => handleInterestClick("Movies")}
              />
              <InterestButton
                label="Fitness"
                callback={() => handleInterestClick("Fitness")}
              />
              <InterestButton
                label="Environment"
                callback={() => handleInterestClick("Environment")}
              />
              <InterestButton
                label="History"
                callback={() => handleInterestClick("History")}
              />
              <InterestButton
                label="Politics"
                callback={() => handleInterestClick("Politics")}
              />
            </div>
            <Button
              type="submit"
              label="Let's start"
              className="w-1/3"
              link="/practice"
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
