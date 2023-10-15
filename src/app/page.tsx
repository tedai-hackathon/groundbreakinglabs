import Head from 'next/head';
import ToggleButton from '@components/ToggleButton';

export default function Home() {
  return (
    <div className="min-h-screen bg-main bg-green-400">
      <Head>
        <title>Settle</title>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap" rel="stylesheet" />
      </Head>

      <div className="space-y-4">
        <h1 className="text-2xl font-semibold text-white text-center">Welcome, Dilan</h1>
        <p className="text-white text-center">What are your interests?</p>

        <div className="grid grid-cols-4 gap-4 mb-4 grid-template-columns: repeat(auto-fit, minmax(min-content, 1fr));">
          <ToggleButton label="Sports" />
          <ToggleButton label="Video Games" />
          <ToggleButton label="Art" />
          <ToggleButton label="Theater" />
          <ToggleButton label="Music" />
          <ToggleButton label="Technology" />
          <ToggleButton label="Fashion" />
          <ToggleButton label="Food and Drink" />
          <ToggleButton label="Travel" />
          <ToggleButton label="Science" />
          <ToggleButton label="Movies" />
          <ToggleButton label="Fitness" />
          <ToggleButton label="Environment" />
          <ToggleButton label="History" />
          <ToggleButton label="Politics" />
        </div>

        <button className="bg-white text-black p-2 rounded-md w-full hover:bg-zinc-100 transition duration-200">Let's start</button>
      </div>
    </div>
  );
}
