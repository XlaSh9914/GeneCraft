import React, { useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
  ScrollShadow,
  Pagination,
  Listbox,
  ListboxItem,
  Textarea,
  Button,
  addToast,
  ToastProvider,
} from "@heroui/react";
import PendingIcon from "@mui/icons-material/Pending";

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

type SubtopicCardProps = {
  selectedSubtopic: string | null;
  selectedTopicName: string | null;
  subtopicIcon: JSX.Element | null;
  imageUrl?: string[] | null;
  content: Theory[] | Practical[] | Quiz[];
};

export default function SubtopicCard({
  selectedSubtopic,
  selectedTopicName,
  subtopicIcon,
  content,
}: SubtopicCardProps) {
  const [currentPage, setCurrentPage] = React.useState(1);
  const adjustedPage = Math.max(0, currentPage - 1);
  const [selectedOption, setSelectedOption] = React.useState<string[] | null>(
    null
  );

  useEffect(() => {
    // Reset the current page to 1 if the adjustedPage is out of bounds
    if (adjustedPage >= content?.length) {
      setCurrentPage(1);
    }
  }, [content, adjustedPage]);

  return (
    <div className="flex-1 min-h-[100px]">
      <ToastProvider placement={"bottom-right"} />
      <Card className="w-[100%] h-[100%]">
        <CardHeader className="flex gap-3">
          {subtopicIcon ? (
            React.cloneElement(subtopicIcon, {
              style: { fontSize: "36px" }, // Adjust the size here
            })
          ) : (
            <PendingIcon style={{ fontSize: "36px" }} />
          )}
          <div className="flex flex-col">
            <p className="text-md">
              {selectedSubtopic
                ? selectedSubtopic
                : "Select a subtopic to view its content."}
            </p>
            <p className="text-small text-default-500">
              {selectedTopicName ?? "Select a topic to view its content."}
            </p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="flex">
            {/* Main Content */}
            <div
              className={`flex-1 ${
                content &&
                content.length > adjustedPage &&
                "imageUrl" in content[adjustedPage] &&
                content[adjustedPage].imageUrl
                  ? "pr-4"
                  : ""
              }`}
            >
              <h1
                style={{
                  fontSize: "32px",
                  fontWeight: "bold",
                  marginBottom: "10px",
                }}
              >
                {content &&
                  content.length > 0 &&
                  content[adjustedPage] !== undefined &&
                  (() => {
                    const current = content[adjustedPage];

                    if ("header" in current) {
                      return current.header ?? "Quiz 🎉";
                    } else if ("questionNo" in current) {
                      return `Question ${current.questionNo}`;
                    }  else {
                      return "...";
                    }
                  })()}
              </h1>
              {content &&
              content.length > 0 &&
              content[adjustedPage] !== undefined &&
              "paragraphs" in content[adjustedPage] ? (
                content[adjustedPage].paragraphs.map((para, index) => (
                  <p key={index} className="mb-4">
                    {para}
                  </p>
                ))
              ) : content &&
                content.length > 0 &&
                content[adjustedPage] !== undefined &&
                "question" in content[adjustedPage] ? (
                <p>{content[adjustedPage].question}</p>
              ) : (
                ""
              )}
              <br />
              {content &&
              content[adjustedPage] !== undefined &&
              content.length > 0 ? (
                "points" in content[adjustedPage] ? (
                  // Render bullet points for Theory
                  <ul className="list-disc pl-5">
                    {content[adjustedPage].points.map((point, index) => (
                      <li key={index} className="mb-2">
                        {point}
                      </li>
                    ))}
                  </ul>
                ) : "options" in content[adjustedPage] ? (
                  <div className="w-[70%] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
                    {(content[adjustedPage] as Practical | Quiz).options
                      ?.length > 0 ? (
                      <Listbox
                        aria-label="Single selection example"
                        selectionMode="single"
                        variant="solid"
                        onSelectionChange={(key) => {
                          console.log("Selected option:", key);
                        }}
                      >
                        {(
                          content[adjustedPage] as Practical | Quiz
                        ).options.map((option, index) => (
                          <ListboxItem
                            key={index}
                            showDivider={
                              index !==
                              (content[adjustedPage] as Practical | Quiz)
                                .options.length -
                                1
                            }
                            onPress={() => {
                              console.log("Option clicked:", option);
                              setSelectedOption([index.toString()]);
                            }}
                          >
                            {option}
                          </ListboxItem>
                        ))}
                      </Listbox>
                    ) : (content[adjustedPage] as Practical).answer?.length >
                      0 ? (
                      (content[adjustedPage] as Practical).answer.map(
                        (_, index) => (
                          <Textarea
                            key={index}
                            disableAnimation
                            disableAutosize
                            classNames={{
                              base: "max-w-[40%] mb-4",
                              input: "resize-y min-h-[40px]",
                            }}
                            label={`Answer ${index + 1}`}
                            placeholder={`Enter answer ${index + 1}`}
                            variant="bordered"
                          />
                        )
                      )
                    ) : null}
                  </div>
                ) : (
                  <p>No content available.</p>
                )
              ) : (
                <p>No content available.</p>
              )}
              <br />
              {content &&
              content[adjustedPage] !== undefined &&
              content.length > 0 ? (
                "options" in content[adjustedPage] ? (
                  <Button
                    color="primary"
                    isDisabled={!selectedOption}
                    variant="solid"
                    onPress={() => {
                      console.log("Selected option:", selectedOption);
                      if (
                        selectedOption?.[0] ===
                        (
                          content[adjustedPage] as Practical | Quiz
                        ).answer[0]?.toString()
                      ) {
                        console.log("Correct answer!");
                        addToast({
                          title: "Correct answer!",
                          radius: "md",
                          color: "success",
                        });
                        setCurrentPage(currentPage + 1);
                      } else {
                        console.log("Incorrect answer.");
                        addToast({
                          title: "Incorrect answer!",
                          radius: "md",
                          color: "danger",
                        });
                      }
                    }}
                  >
                    Submit
                  </Button>
                ) : null
              ) : null}
            </div>
            {/* Image Section */}
            {content &&
              content.length > 0 &&
              content[adjustedPage] !== undefined &&
              "imageUrl" in content[adjustedPage] &&
              content[adjustedPage].imageUrl.length > 0 && (
                <ScrollShadow
                  hideScrollBar
                  className="w-1/3 max-h-[70vh] flex flex-col gap-y-4"
                  size={10}
                >
                  {content[adjustedPage].imageUrl.map((url, index) => (
                    <Image
                      key={index}
                      alt={`Content image ${index + 1}`}
                      className="w-full h-full object-contain"
                      src={url}
                    />
                  ))}
                </ScrollShadow>
              )}
          </div>
        </CardBody>
        <Divider />
        <CardFooter className="flex justify-between items-center">
          {content &&
            content[adjustedPage] !== undefined &&
            "vidLink" in content[adjustedPage] &&
            content[adjustedPage].vidLink && (
              <Link
                isExternal
                showAnchorIcon
                href={content[adjustedPage].vidLink}
              >
                Guide video for this practical
              </Link>
            )}
          <div />
          <Pagination
            isCompact
            showControls
            initialPage={1}
            page={currentPage}
            total={content?.length ?? 0}
            onChange={(page) => setCurrentPage(page)}
          />
        </CardFooter>
      </Card>
    </div>
  );
}
