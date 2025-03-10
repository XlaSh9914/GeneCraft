import DefaultLayout from "@/layouts/default";
import { Button, Link, Card, CardBody } from "@heroui/react"; // Assuming the package is named @heroui/react
import { useState } from "react";

export default function CoursePage() {
  const [showModel, setShowModel] = useState(false);

  return (
    <DefaultLayout>
      <section className="flex flex-col md:flex-row min-h-screen p-6 gap-6">
        {/* Main Video and Description Section */}
        <div className="flex-1 space-y-6">
          {/* Video Section */}
          {showModel ? (
            <div className="sketchfab-embed-wrapper">
              <iframe
                title="DNA Model Level 1"
                frameBorder="0"
                allow="autoplay; fullscreen; xr-spatial-tracking"
                xr-spatial-tracking
                execution-while-out-of-viewport
                execution-while-not-rendered
                web-share
                className="w-[100%] aspect-video"
                src="https://sketchfab.com/models/30d194521f504e5f9db3895f59501381/embed"
              />
              <p
                style={{
                  fontSize: "13px",
                  fontWeight: "normal",
                  margin: "5px",
                  color: "#4A4A4A",
                }}
              >
                <a
                  href="https://sketchfab.com/3d-models/dna-model-level-1-30d194521f504e5f9db3895f59501381"
                  target="_blank"
                  rel="nofollow"
                  style={{ fontWeight: "bold", color: "#1CAAD9" }}
                >
                  DNA Model Level 1
                </a>
              </p>
            </div>
          ) : (
            <div className="bg-black rounded-lg overflow-hidden">
              <iframe
                className="w-[100%] aspect-video"
                src="https://www.youtube.com/embed/W-Ov2cUaYQY?si=kUu63mB6dXsrhMqT"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              />
            </div>
          )}

          {/* Description Section */}
          <Card>
            <CardBody>
              <h2 className="text-2xl font-bold mb-4">Course Description</h2>
              <p className="text-default-700">
                This course dives deep into the world of bioinformatics,
                covering topics such as sequence analysis, molecular modeling,
                and data visualization. Whether you're a beginner or an
                experienced scientist, this course will equip you with the
                skills needed to excel in the field.
              </p>
              <div className="mt-4">
                <h3 className="text-xl font-semibold mb-2">
                  What You'll Learn
                </h3>
                <ul className="list-disc list-inside text-gray-700">
                  <li>Introduction to Bioinformatics</li>
                  <li>Sequence Alignment and Analysis</li>
                  <li>Molecular Modeling Techniques</li>
                  <li>Data Visualization Tools</li>
                </ul>
              </div>
              <div className="mt-4">
                <Button color="default">Download Course Materials</Button>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Current Lectures Sidebar */}
        <div className="w-full md:w-80 space-y-6">
          <Card>
            <CardBody>
              <h2 className="text-xl font-bold mb-4">Current Lectures</h2>
              <div className="space-y-3">
                <Link href="#" className="block text-blue-600 hover:underline">
                  Lecture 1: Introduction to Bioinformatics
                </Link>
                <Link href="#" className="block text-blue-600 hover:underline">
                  Lecture 2: DNA
                </Link>
                <Link href="#" className="block text-blue-600 hover:underline">
                  Lecture 3: RNA
                </Link>
                <Link href="#" className="block text-blue-600 hover:underline">
                  Lecture 4: Central Dogma
                </Link>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <h2 className="text-xl font-bold mb-4">Resources</h2>
              <div className="space-y-3">
                <Link
                  href="..\assets\lecture1.pdf"
                  download="Lecture1.pdf"
                  className="block text-blue-600 hover:underline"
                >
                  Download Lecture Slides
                </Link>
                <Link href="#" className="block text-blue-600 hover:underline">
                  Additional Reading Materials
                </Link>
                <Link href="#" className="block text-blue-600 hover:underline">
                  Practice Exercises
                </Link>
                <Button
                  color="default"
                  onClick={() => setShowModel(!showModel)}
                >
                  {showModel ? "Show Video" : "Show 3D Model"}
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </section>
    </DefaultLayout>
  );
}
