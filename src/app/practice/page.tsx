"use client";

import Head from "next/head";
import ReadingPrompt from "@components/Passage/ReadingPrompt";
import PassageSetOfQuestions from "@components/Passage/PassageSetOfQuestions";
import Button from "@components/Button";
import { useAtom } from "jotai";
import { studentIdAtom } from "@/atoms";

async function getData(studentId: string) {
  const res = await fetch(`/api/student/generate/${studentId}`)

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function Home() {
  
  const [studentId, setStudentId] = useAtom(studentIdAtom);
  const data = await getData(studentId);
  
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
          text={data["text"] ?? "Loading..."}
        />

        <div className="mb-4">
            <PassageSetOfQuestions questions={data["questions"] ?? []} />
        </div>

        <Button className="w-[125px] mt-5" label={"Submit"} link="review" />
      </div>
    </div>
  );
}
