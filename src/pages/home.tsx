import { title, subtitle } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Button } from "@heroui/react";

export default function HomePage() {
  return (
    <DefaultLayout>
      <section className="relative flex flex-col items-center justify-center gap-8 py-12 md:py-20 overflow-hidden">
        {/* Hero Section */}
        <div className="inline-block max-w-2xl text-center justify-center">
          <h1 className={title({ size: "lg" })}>Welcome to GeneCraft</h1>
          <h2 className={subtitle()}>
            Unlocking the Secrets of Bioinformatics
          </h2>
          <p className="mt-4 text-lg text-default-600">
            Explore the fascinating world of bioinformatics with our
            cutting-edge courses, tools, and resources designed to empower the
            next generation of scientists.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Button color="default" size="lg">
              Get Started
            </Button>
            <Button color="default" size="lg" variant="bordered">
              Learn More
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="flex items-center justify-center h-24">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="48px"
                viewBox="0 -960 960 960"
                width="48px"
                fill="currentColor"
              >
                <path d="M200-40v-40q0-140 65-226t169-174q-104-88-169-174t-65-226v-40h60v40q0 11 .5 20.5T262-840h436q1-10 1.5-19.5t.5-20.5v-40h60v40q0 140-65 226T526-480q104 88 169 174t65 226v40h-60v-40q0-11-.5-20.5T698-120H262q-1 10-1.5 19.5T260-80v40h-60Zm120-640h320q16-23 27.5-47.5T687-780H273q8 28 19.5 52.5T320-680Zm160 161q31-26 59-50.5t52-50.5H369q24 26 51.5 50.5T480-519ZM369-340h222q-24-26-52-50.5T480-441q-31 26-59 50.5T369-340Zm-96 160h414q-8-28-19.5-52.5T640-280H320q-16 23-27.5 47.5T273-180Z" />
              </svg>
            </div>
            <h3 className="mt-4 text-xl font-bold">Interactive Courses</h3>
            <p className="mt-2 text-default-600">
              Engage with hands-on courses that make learning bioinformatics
              intuitive and fun.
            </p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center h-24">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="48px"
                viewBox="0 -960 960 960"
                width="48px"
                fill="currentColor"
              >
                <path d="M768-120 517-371l57-57 251 251-57 57Zm-581 0-57-57 290-290-107-107-23 23-44-44v85l-24 24-122-122 24-24h86l-48-48 131-131q17-17 37-23t44-6q24 0 44 8.5t37 25.5L348-699l48 48-24 24 104 104 122-122q-8-13-12.5-30t-4.5-36q0-53 38.5-91.5T711-841q15 0 25.5 3t17.5 8l-85 85 75 75 85-85q5 8 8.5 19.5T841-709q0 53-38.5 91.5T711-579q-18 0-31-2.5t-24-7.5L187-120Z" />
              </svg>
            </div>
            <h3 className="mt-4 text-xl font-bold">Advanced Tools</h3>
            <p className="mt-2 text-default-600">
              Access state-of-the-art tools and software to analyze and
              visualize biological data.
            </p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center h-24">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="48px"
                viewBox="0 -960 960 960"
                width="48px"
                fill="currentColor"
              >
                <path d="M880-81 721-240H300q-24.75 0-42.37-17.63Q240-275.25 240-300v-80h440q24.75 0 42.38-17.63Q740-415.25 740-440v-280h80q24.75 0 42.38 17.62Q880-684.75 880-660v579ZM140-425l75-75h405v-320H140v395ZM80-280v-540q0-24.75 17.63-42.38Q115.25-880 140-880h480q24.75 0 42.38 17.62Q680-844.75 680-820v320q0 24.75-17.62 42.37Q644.75-440 620-440H240L80-280Zm60-220v-320 320Z" />
              </svg>
            </div>
            <h3 className="mt-4 text-xl font-bold">Expert Community</h3>
            <p className="mt-2 text-default-600">
              Join a vibrant community of bioinformatics enthusiasts and
              experts.
            </p>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="mt-20 text-center">
          <h2 className={title({ size: "md" })}>Ready to Dive In?</h2>
          <p className="mt-4 text-lg text-default-600">
            Start your journey into the world of bioinformatics today. Whether
            you're a beginner or an expert, GeneCraft has something for
            everyone.
          </p>
          <Button color="default" size="lg" className="mt-6">
            Join Now
          </Button>
        </div>
      </section>
    </DefaultLayout>
  );
}
