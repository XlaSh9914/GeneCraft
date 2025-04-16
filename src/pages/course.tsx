import React, {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useState,
} from "react";
import { Listbox, ListboxItem } from "@heroui/react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
  Button,
} from "@heroui/react";
import { Accordion, AccordionItem } from "@heroui/react";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import BiotechIcon from "@mui/icons-material/Biotech";
import QuizIcon from "@mui/icons-material/Quiz";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import PsychologyIcon from "@mui/icons-material/Psychology";
import SchoolIcon from "@mui/icons-material/School";
import { ScrollShadow } from "@heroui/react";

import DefaultLayout from "../layouts/default";

export const ListboxWrapper = ({ children }: { children: ReactNode }) => (
  <div className="w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
    {children}
  </div>
);

export default function CoursePage() {
  const [showModel, setShowModel] = useState(false);
  const [selectedLecture, setSelectedLecture] = useState<
    (typeof lectureData)[0] | null
  >(null);
  // JSON data for lectures
  const lectureData = [
    {
      LevelNumber: "1",
      LectureName: "DNA structure and Function Part-1",
      LectureDescription:
        "DNA Structure and Function. (DNA) is a molecule composed of two polynucleotide chains that coil around each other to form a double helix carrying genetic instructions for the development, functioning, growth, and reproduction of all known organisms and many viruses. DNA and ribonucleic acid (RNA) are nucleic acids. Alongside proteins, lipids, and complex carbohydrates (polysaccharides), nucleic acids are one of the four major types of macromolecules that are essential for all known forms of life.\n\nThe two DNA strands are known as polynucleotides as they are composed of simpler monomeric units called nucleotides. Each nucleotide is composed of one of four nitrogen-containing nucleobases (cytosine [C], guanine [G], adenine [A], or thymine [T]), a sugar called deoxyribose, and a phosphate group. The nucleotides are joined to one another in a chain by covalent bonds (known as the phospho-diester linkage) between the sugar of one nucleotide and the phosphate of the next, resulting in an alternating sugar-phosphate backbone.\n\nThe nitrogenous bases of the two separate polynucleotide strands are bound together, according to base pairing rules (A with T and C with G), with hydrogen bonds to make double-stranded DNA. The complementary nitrogenous bases are divided into two groups, pyrimidines and purines. In DNA, the pyrimidines are thymine and cytosine; the purines are adenine and guanine. Both strands of double-stranded DNA store the same biological information. This information is replicated as and when the two strands separate. A large part of DNA (more than 98% for humans) is non-coding, meaning that these sections do not serve as patterns for protein sequences.\n\nThe two strands of DNA run in opposite directions to each other and are thus antiparallel. Attached to each sugar is one of four types of nucleobases (informally, bases). It is the sequence of these four nucleobases along the backbone that encodes genetic information. RNA strands are created using DNA strands as a template in a process called transcription, where DNA bases are exchanged for their corresponding bases except in the case of thymine (T), for which RNA substitutes uracil (U). Under the genetic code, these RNA strands specify the sequence of amino acids within proteins in a process called translation.\n\nWithin eukaryotic cells, DNA is organized into long structures called chromosomes. Before typical cell division, these chromosomes are duplicated in the process of DNA replication, providing a complete set of chromosomes for each daughter cell. Eukaryotic organisms (animals, plants, fungi, and protists) store most of their DNA inside the cell nucleus as nuclear DNA, and some in the mitochondria as mitochondrial DNA or in chloroplasts as chloroplast DNA.",
      LectureLinks: {
        ResearchPaper: "https://www.ncbi.nlm.nih.gov/books/NBK538241/",
        Simlabs:
          "https://biomanbio.com/HTML5GamesandLabs/LifeChemgames/dna-structure-model-page.html",
        NPTELcourse: "https://nptel.ac.in/courses/104103121",
        YoutubeLink: "https://www.youtube.com/watch?v=-1Zj4SdhLSM",
      },
      LectureSlides:
        "https://drive.google.com/file/d/1sL9AW1mRxdPygx4Tfbs1CHB_d4AYLh_D/view?usp=sharing",
      Docs: "https://drive.google.com/file/d/1-kaJZ6Qg8AdyWzcY3kEAIbADi6LVD2w4/view?usp=sharing",
      LectureSubtopics: ["Theory", "Video Lecture", "Practical", "Quiz"],
    },
    {
      LevelNumber: "1",
      LectureName: "DNA Structure and Function Part-2",
      LectureDescription:
        "DNA Structure and Function. (DNA) is a molecule composed of two polynucleotide chains that coil around each other to form a double helix carrying genetic instructions for the development, functioning, growth and reproduction of all known organisms and many viruses. DNA and ribonucleic acid (RNA) are nucleic acids. Alongside proteins, lipids and complex carbohydrates (polysaccharides), nucleic acids are one of the four major types of macromolecules that are essential for all known forms of life...",
      LectureLinks: {
        ResearchPaper: "https://www.ncbi.nlm.nih.gov/books/NBK26821/",
        Simlabs:
          "https://www.labxchange.org/library/items/lb:LabXchange:5c1562b9:lx_simulation:1",
        NPTELcourse: "https://archive.nptel.ac.in/courses/102/106/102106096/",
        YoutubeLink: "https://youtu.be/YWeFGVhrMKQ?si=VLl-2leOLVjWvbxj",
      },
      LectureSlides:
        "https://drive.google.com/file/d/1sL9AW1mRxdPygx4Tfbs1CHB_d4AYLh_D/view?usp=sharing",
      Docs: "https://drive.google.com/file/d/1_WAyT4zMNuDKSq-D5lg-yPx_ux_eiGVB/view?usp=sharing",
      LectureSubtopics: ["Theory", "Practical", "Quiz"],
    },
    {
      LevelNumber: "1",
      LectureName: "Introduction to Central Dogma",
      LectureDescription:
        "In this lecture you will learn about the basics of central dogma and the genetic code.",
      LectureLinks: {
        ResearchPaper:
          "https://www.dna.caltech.edu/courses/cs191/paperscs191/CrickCentralDogma1970.pdf",
        Simlabs:
          "https://media.hhmi.org/biointeractive/click/genetic-medicine-interactive/?_gl=1*17rf3ds*_ga*MTUzNzA0OTQxMy4xNzQyNDE2NDI0*_ga_H0E1KHGJBH*MTc0MjQxNjQyNC4xLjEuMTc0MjQxNjQ4My4wLjAuMA..",
        NPTELcourse: "https://archive.nptel.ac.in/courses/102/104/102104052/",
        YoutubeLink: "https://youtu.be/0t5eVgtrdWg?si=nj6NnHz7zsqZH0L5",
      },
      LectureSlides:
        "https://drive.google.com/file/d/1HNeIaQ9_92kDWZzS95zQY731yzghHnaM/view?usp=sharing",
      Docs: "https://drive.google.com/file/d/1VfWklfDAw4Myceg8XJvj-PXQSP69Uf10/view?usp=sharing",
      LectureSubtopics: ["Theory", "Video Lecture", "Practical", "Quiz"],
    },
    {
      LevelNumber: "1",
      LectureName: "Structure, Function and Types of RNA",
      LectureDescription:
        "This Video Explains The Structure, Function And Types of RNA That Are mRNA, tRNA, rRNA,lncRNA, miRNA, siRNA, snoRNA, snRNA And piRNA.",
      LectureLinks: {
        ResearchPaper:
          "https://www.ncbi.nlm.nih.gov/books/NBK558999/#:~:text=The%20primary%20function%20of%20RNA,RNA%20involved%20in%20protein%20synthesis.",
        Simlabs:
          "https://phet.colorado.edu/en/simulations/gene-expression-essentials/activities",
        NPTELcourse: "https://nptel.ac.in/courses/102106097",
        YoutubeLink: "https://youtu.be/FThA4Vxs3v4?si=VCQZW-C3M8RjSJ40",
      },
      LectureSlides:
        "https://drive.google.com/file/d/1C9RjHCXI2h1fD2by4mBkRnqdHuHVg7t0/view?usp=sharing",
      Docs: "https://drive.google.com/file/d/1CRCl4Kl_u6FZD47rOcdhWQbJBesq0eia/view?usp=sharing",
      LectureSubtopics: ["Theory", "Video Lecture", "Practical", "Quiz"],
    },
  ];

  const lectureLevels = [
    {
      name: "Novice",
      icon: (
        <AutoStoriesIcon
          className="text-green-400"
          style={{ fontSize: "24px" }}
        />
      ),
    },
    {
      name: "Intermediate",
      icon: (
        <PsychologyIcon
          className="text-blue-500"
          style={{ fontSize: "24px" }}
        />
      ),
    },
    {
      name: "Advanced",
      icon: (
        <SchoolIcon className="text-violet-500" style={{ fontSize: "24px" }} />
      ),
    },
  ];
  const subtopicIcons: Record<string, JSX.Element> = {
    Theory: <LibraryBooksIcon className="text-xl text-default-500" />,
    "Video Lecture": <OndemandVideoIcon className="text-xl text-default-500" />,
    Practical: <BiotechIcon className="text-xl text-default-500" />,
    Quiz: <QuizIcon className="text-xl text-default-500" />,
  };

  // Format lecture description for display (replacing newlines with paragraph breaks)
  const formatDescription = (description: string) => {
    return description
      .split("\n\n")
      .map(
        (
          paragraph:
            | string
            | number
            | boolean
            | ReactElement<any, string | JSXElementConstructor<any>>
            | Iterable<ReactNode>
            | ReactPortal
            | null
            | undefined,
          index: Key | null | undefined
        ) => (
          <p key={index} className="mb-4">
            {paragraph}
          </p>
        )
      );
  };

  // Handle lecture selection
  const handleLectureSelect = (lecture: (typeof lectureData)[0]) => {
    setSelectedLecture(lecture);
    setShowModel(false); // Reset model view when changing lectures
  };

  // Get current lecture data
  const currentLecture = selectedLecture || lectureData[0];
  const [expandedLecture, setExpandedLecture] = useState<string | null>(null);
  const currentVideoUrl = currentLecture.LectureLinks.YoutubeLink;
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(
    new Set<string>([])
  );
  const toggleLecture = (lectureName: string) => {
    setExpandedLecture((prev) => (prev === lectureName ? null : lectureName));
  };

  // Extract YouTube video ID from URL
  const getYoutubeEmbedUrl = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return match && match[2].length === 11
      ? `https://www.youtube.com/embed/${match[2]}`
      : url;
  };

  const handleOpen = () => {
    console.log("Selected Lecture:", currentLecture);
  };

  useEffect(() => {
    console.log("Selected Lecture:", selectedKeys);
  });

  return (
    <DefaultLayout>
      <section className="flex flex-col md:flex-row min-h-[89vh] p-6 gap-6">
        {/* Main Video and Description Section */}
        <div className="flex-1 ">
          {/* Video Section */}
          {showModel ? (
            // <div className="sketchfab-embed-wrapper rounded-lg overflow-hidden">
            //   <iframe
            //     allow="autoplay; fullscreen; xr-spatial-tracking"
            //     className="w-[100%] aspect-video"
            //     frameBorder="0"
            //     src="https://sketchfab.com/3d-models/chromosome-structure-cc33bb1ebe6141b08d0d06f1bbebc2b7/embed"
            //     title="DNA Model Level 1"
            //   />
            // </div>
            <Card className="w-[100%] h-[100%]">
              <CardHeader className="flex gap-3">
                <LibraryBooksIcon style={{ fontSize: "32px" }} />
                <div className="flex flex-col">
                  <p className="text-md">Theory</p>
                  <p className="text-small text-default-500">
                    DNA structure and Function- part1
                  </p>
                </div>
              </CardHeader>
              <Divider />
              <CardBody>
                <p>
                  Make beautiful websites regardless of your design experience.
                </p>
              </CardBody>
              <Divider />
              <CardFooter>
                <Link
                  isExternal
                  showAnchorIcon
                  href="https://github.com/heroui-inc/heroui"
                >
                  Visit source code on GitHub.
                </Link>
              </CardFooter>
            </Card>
          ) : (
            <div className="bg-black rounded-lg overflow-hidden">
              <iframe
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                className="w-[100%] aspect-video"
                src={getYoutubeEmbedUrl(currentVideoUrl)}
                title={`${currentLecture.LectureName} - Video`}
              />
            </div>
          )}

          {/* Description Section */}
          {/* <Card>
            <CardBody>
              <h2 className="text-2xl font-bold mb-4">
                {currentLecture.LectureName}
              </h2>
              <div className="text-default-700">
                {formatDescription(currentLecture.LectureDescription)}
              </div>
            </CardBody>
          </Card> */}
        </div>

        <div className="w-full md:w-80 space-y-6">
          <ScrollShadow
            hideScrollBar
            className="-mx-[1vw] px-[1vw] -my-[1vw] py-[1vw] max-h-[68vh]"
          >
            <Accordion selectionMode="multiple" variant="shadow">
              {lectureLevels.map((level, index) => (
                <AccordionItem
                  key={index}
                  aria-label={`Level ${level.name}`}
                  startContent={level.icon} // Add the Material-UI icon here
                  title={level.name}
                  onClick={() => toggleLecture(level.name)}
                >
                  <Accordion selectionMode="multiple" variant="shadow">
                    {lectureData.map((lecture, index) => (
                      <AccordionItem
                        key={index}
                        aria-label={`Level ${lecture.LevelNumber}`}
                        title={lecture.LectureName}
                      >
                        <Listbox
                          disallowEmptySelection
                          aria-label="Multiple selection example"
                          selectedKeys={selectedKeys}
                          selectionMode="multiple"
                          variant="solid"
                          onSelectionChange={(keys) =>
                            setSelectedKeys(
                              new Set(Array.from(keys) as string[])
                            )
                          }
                        >
                          {lecture.LectureSubtopics.map((subtopic, index) => (
                            <ListboxItem
                              key={index}
                              startContent={
                                subtopicIcons[subtopic] || <LibraryBooksIcon />
                              }
                              onPress={() => handleOpen()}
                            >
                              {subtopic}
                            </ListboxItem>
                          ))}
                        </Listbox>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollShadow>
          <Card>
            <CardBody>
              <h2 className="text-xl font-bold mb-4">Resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <a
                  className="flex items-center gap-2 text-blue-600 hover:underline"
                  href={currentLecture.LectureSlides}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span>📊</span> Lecture Slides
                </a>
                <a
                  className="flex items-center gap-2 text-blue-600 hover:underline"
                  href={currentLecture.Docs}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span>📄</span> Documentation
                </a>
                <a
                  className="flex items-center gap-2 text-blue-600 hover:underline"
                  href={currentLecture.LectureLinks.ResearchPaper}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span>📚</span> Research Paper
                </a>
                <a
                  className="flex items-center gap-2 text-blue-600 hover:underline"
                  href={currentLecture.LectureLinks.Simlabs}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span>🧪</span> Simulation Labs
                </a>
                <a
                  className="flex items-center gap-2 text-blue-600 hover:underline"
                  href={currentLecture.LectureLinks.NPTELcourse}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span>🎓</span> NPTEL Course
                </a>
                <Button
                  color="primary"
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
