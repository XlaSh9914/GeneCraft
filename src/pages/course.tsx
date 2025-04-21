import { useState, useEffect } from "react";
import { Card, CardBody, Listbox, ListboxItem } from "@heroui/react";
import { Accordion, AccordionItem } from "@heroui/react";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import BiotechIcon from "@mui/icons-material/Biotech";
import QuizIcon from "@mui/icons-material/Quiz";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import PsychologyIcon from "@mui/icons-material/Psychology";
import SchoolIcon from "@mui/icons-material/School";
import { ScrollShadow } from "@heroui/react";

import DefaultLayout from "../layouts/default";
import { BASE_URL } from "../../utils/api";
import TheoryCard from "../components/courseTheoryCard";

type Level = {
  levelNo: number;
  topics: Topic[];
};

type Topic = {
  _id: string;
  topicNo: number;
  levelNo: number;
  topicName: string;
  topicDescription: string;
  researchPaperLink: string;
  simlabsLink: string;
  NPTELcourseLink: string;
  youtubeLink: string;
  docLink: string;
};

type Resources = {
  researchPaperLink: string | undefined;
  simlabsLink: string | undefined;
  NPTELcourseLink: string | undefined;
  youtubeLink: string | undefined;
  docLink: string | undefined;
};

type Theory = {
  _id: string;
  topicId: string;
  slideNo: number;
  header: string;
  points: string[];
  paragraphs: string[];
  imageUrl: string[];
};

type Practical = {
  _id: string;
  topicId: string;
  practicalNo: number;
  header: string;
  vidLink: string;
  question: string;
  options: string[];
  answer: string[];
};

type Quiz = {
  _id: string;
  topicId: string;
  questionNo: number;
  marks: number;
  question: string;
  options: string[];
  answer: string[];
};

type SubtopicContent = {
  theory: Theory[];
  practical: Practical[];
  quiz: Quiz[];
};

type TopicContent = {
  topicId: string;
  subtopicContent: SubtopicContent[];
};

type LevelContent = {
  levelNo: number;
  topics: TopicContent[];
};

type CourseContent = {
  courseId: string;
  courseContent: LevelContent[];
};

export default function CoursePage() {
  const [selectedTopic, setSelectedTopic] = useState<
    (typeof topicData)[0] | null
  >(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState<string>("");
  const [topicData, setTopicData] = useState<Topic[]>([]);
  const [levelsData, setLevelsData] = useState<Level[]>([
    {
      levelNo: 1,
      topics: [],
    },
    {
      levelNo: 2,
      topics: [],
    },
    {
      levelNo: 3,
      topics: [],
    },
  ]);
  const lectureLevels = [
    {
      name: "Novice",
      icon: (
        <AutoStoriesIcon
          className="text-green-400"
          style={{ fontSize: "24px" }}
        />
      ),
      no: 1,
    },
    {
      name: "Intermediate",
      icon: (
        <PsychologyIcon
          className="text-blue-500"
          style={{ fontSize: "24px" }}
        />
      ),
      no: 2,
    },
    {
      name: "Advanced",
      icon: (
        <SchoolIcon className="text-violet-500" style={{ fontSize: "24px" }} />
      ),
      no: 3,
    },
  ];
  const subtopicIcons: Record<string, JSX.Element> = {
    Theory: <LibraryBooksIcon className="text-xl text-default-500" />,
    Practical: <BiotechIcon className="text-xl text-default-500" />,
    Quiz: <QuizIcon className="text-xl text-default-500" />,
  };
  const [expandedTopic, setExpandedTopic] = useState<string[]>([]);
  // const currentVideoUrl = currentLecture.LectureLinks.YoutubeLink;
  const [currentResources, setCurrentResources] = useState<
    Resources | undefined
  >(undefined);
  const [subtopicContent, setSubtopicContent] = useState<SubtopicContent>({
    theory: [],
    practical: [],
    quiz: [],
  });
  const [levelContent, setLevelContent] = useState<LevelContent>({
    levelNo: 1,
    topics: [],
  });
  const [courseContent, setCourseContent] = useState<CourseContent>({
    courseId: "1",
    courseContent: [],
  });

  const handleTopicSelect = (topic: Topic) => {
    selectedTopic?._id === topic._id ? null : setSelectedTopic(topic);
  };

  const handleTopics = (topicName: string, levelNo: number) => {
    expandedTopic.find((topic) => topic === topicName)
      ? null
      : fetchTopics(levelNo);
    setExpandedTopic((prev) =>
      prev && prev.includes(topicName)
        ? prev.filter((topic) => topic !== topicName)
        : [...(prev || []), topicName]
    );
  };

  const handleSubtopic = (topicId: string, topicName: string) => {
    fetchSubtopicData(topicId).then((data) => {
      if (!data) return;

      // 1. Update subtopicContent state
      setSubtopicContent({
        theory: [...data.theory],
        practical: [...data.practical],
        quiz: [...data.quiz],
      });

      // 2. Prepare new topicContent
      const newTopicContent: TopicContent = {
        topicId: topicId,
        subtopicContent: [data],
      };

      // 3. Prepare new levelContent (assuming levelNo remains constant, e.g., 1)
      const newLevelContent: LevelContent = {
        levelNo: levelContent.levelNo || 1, // default to 1 if not initialized
        topics: [newTopicContent],
      };

      setLevelContent(newLevelContent);

      // 4. Update courseContent (you may want to append or replace depending on design)
      setCourseContent((prev) => ({
        ...prev,
        courseContent: [
          // If you want to replace existing level with same levelNo
          ...prev.courseContent.filter(
            (lvl) => lvl.levelNo !== newLevelContent.levelNo
          ),
          newLevelContent,
        ],
      }));
    });
    setSelectedSubtopic(topicName);
  };

  const fetchTopics = async (levelNo: number) => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/topics?levelNo=${levelNo}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        setTopicData([...data]);
        setLevelsData((prevLevelsData) =>
          prevLevelsData.map((level) =>
            level.levelNo === levelNo ? { ...level, topics: [...data] } : level
          )
        );
      } else {
        console.error("Unexpected data format:", data);
      }
    } catch (error) {
      console.error("Error fetching topics:", error);
    }
  };

  const fetchSubtopicData = async (topicId: string) => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/subtopics?topicId=${topicId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }

      const data = await response.json();

      return {
        theory: data.theory,
        practical: data.practical,
        quiz: data.quiz,
      };
    } catch (error) {
      console.error("Error fetching topics:", error);
    }
  };

  useEffect(() => {
    setCurrentResources({
      researchPaperLink: selectedTopic?.researchPaperLink,
      simlabsLink: selectedTopic?.simlabsLink,
      NPTELcourseLink: selectedTopic?.NPTELcourseLink,
      youtubeLink: selectedTopic?.youtubeLink,
      docLink: selectedTopic?.docLink,
    });
  }, [selectedTopic]);

  useEffect(() => {
    console.log("Course Content:", courseContent);
    console.log("selectedSubtopic:", selectedSubtopic);
    console.log(
      "Subtopic Content:",
      subtopicContent[
        selectedSubtopic.toString().toLowerCase() as keyof SubtopicContent
      ]
    );
  }, [courseContent]);

  return (
    <DefaultLayout>
      <section className="flex flex-col md:flex-row min-h-[89vh] p-6 gap-6">
        {/* Content Section */}
        <TheoryCard
          content={
            subtopicContent[
              selectedSubtopic.toString().toLowerCase() as keyof SubtopicContent
            ]
          }
          selectedSubtopic={selectedSubtopic}
          selectedTopicName={selectedTopic?.topicName ?? ""}
          subtopicIcon={subtopicIcons[selectedSubtopic]}
        />
        {/* Topics Section */}
        <div className="w-full md:w-80 space-y-6">
          <ScrollShadow
            hideScrollBar
            className="-mx-[1vw] px-[1vw] -my-[1vw] py-[1vw] max-h-[70vh]"
          >
            <Accordion selectionMode="multiple" variant="shadow">
              {lectureLevels.map((level, index) => (
                <AccordionItem
                  key={index}
                  aria-label={`Level ${level.name}`}
                  startContent={level.icon} // Add the Material-UI icon here
                  title={level.name}
                  onPress={async () => {
                    handleTopics(level.name, level.no);
                  }}
                >
                  <Accordion selectionMode="multiple" variant="shadow">
                    {levelsData[index].topics.map((topic, index) => (
                      <AccordionItem
                        key={index}
                        aria-label={`Level ${level.no}`}
                        subtitle={topic.topicDescription}
                        title={topic.topicName}
                        onPress={() => {
                          handleTopicSelect(topic);
                        }}
                      >
                        <Listbox
                          aria-label="Multiple selection "
                          selectionMode="single"
                          variant="solid"
                        >
                          {Object.keys(subtopicIcons).map((subtopic, index) => (
                            <ListboxItem
                              key={index}
                              startContent={
                                subtopicIcons[subtopic] || <LibraryBooksIcon />
                              }
                              onPress={() => {
                                handleSubtopic(topic._id, subtopic);
                              }}
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
              <p className="text-default-700 mb-4">
                {selectedTopic
                  ? selectedTopic.topicName
                  : "Select a topic to view its resources."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <a
                  className="flex items-center gap-2 text-blue-600 hover:underline"
                  href={currentResources?.docLink}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span>📄</span> Documentation
                </a>
                <a
                  className="flex items-center gap-2 text-blue-600 hover:underline"
                  href={currentResources?.researchPaperLink}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span>📚</span> Research Paper
                </a>
                <a
                  className="flex items-center gap-2 text-blue-600 hover:underline"
                  href={currentResources?.simlabsLink}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span>🧪</span> Simulation Labs
                </a>
                <a
                  className="flex items-center gap-2 text-blue-600 hover:underline"
                  href={currentResources?.NPTELcourseLink}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span>🎓</span> NPTEL Course
                </a>
              </div>
            </CardBody>
          </Card>
        </div>
      </section>
    </DefaultLayout>
  );
}
