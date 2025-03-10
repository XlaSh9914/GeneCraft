import DefaultLayout from "@/layouts/default";
import { Button, Progress, RadioGroup, Radio } from "@heroui/react"; // Assuming the package is named @heroui/react
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function EvaluationTestPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds
  const navigate = useNavigate();

  // Sample questions
  const questions = [
    {
      id: 1,
      question: "What is the primary function of DNA?",
      options: [
        "Store genetic information",
        "Produce energy",
        "Facilitate cell movement",
        "Synthesize proteins",
      ],
      correctAnswer: "Store genetic information",
    },
    {
      id: 2,
      question:
        "Which of the following is a nucleotide base in RNA but not in DNA?",
      options: ["Adenine", "Thymine", "Uracil", "Cytosine"],
      correctAnswer: "Uracil",
    },
    {
      id: 3,
      question: "What is the purpose of BLAST in bioinformatics?",
      options: [
        "Sequence alignment",
        "Protein folding",
        "Data visualization",
        "Gene editing",
      ],
      correctAnswer: "Sequence alignment",
    },
    {
      id: 1,
      question: "What is the primary function of DNA?",
      options: [
        "Store genetic information",
        "Produce energy",
        "Facilitate cell movement",
        "Synthesize proteins",
      ],
      correctAnswer: "Store genetic information",
    },
    {
      id: 2,
      question:
        "Which of the following is a nucleotide base in RNA but not in DNA?",
      options: ["Adenine", "Thymine", "Uracil", "Cytosine"],
      correctAnswer: "Uracil",
    },
    {
      id: 3,
      question: "What is the purpose of BLAST in bioinformatics?",
      options: [
        "Sequence alignment",
        "Protein folding",
        "Data visualization",
        "Gene editing",
      ],
      correctAnswer: "Sequence alignment",
    },
    {
      id: 1,
      question: "What is the primary function of DNA?",
      options: [
        "Store genetic information",
        "Produce energy",
        "Facilitate cell movement",
        "Synthesize proteins",
      ],
      correctAnswer: "Store genetic information",
    },
    {
      id: 2,
      question:
        "Which of the following is a nucleotide base in RNA but not in DNA?",
      options: ["Adenine", "Thymine", "Uracil", "Cytosine"],
      correctAnswer: "Uracil",
    },
    {
      id: 3,
      question: "What is the purpose of BLAST in bioinformatics?",
      options: [
        "Sequence alignment",
        "Protein folding",
        "Data visualization",
        "Gene editing",
      ],
      correctAnswer: "Sequence alignment",
    },
  ];

  // Handle next question
  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer("");
    }
  };

  // Handle previous question
  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer("");
    }
  };

  // Handle timer
  //   useEffect(() => {
  //     const timer = setInterval(() => {
  //       setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
  //     }, 1000);

  //     return () => clearInterval(timer);
  //   }, []);

  // Format time
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Handle navigation to course page
  const handleNavigateToCourse = () => {
    navigate("/course");
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center min-h-screen p-6">
        {/* Test Instructions */}
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Evaluation Test</h2>
          <p className="text-gray-700">
            This test consists of {questions.length} questions. You have{" "}
            {formatTime(timeLeft)} minutes to complete the test. Please answer
            all questions to the best of your ability.
          </p>
          <div className="mt-4">
            <Progress
            color="default"
              value={(currentQuestion + 1) * (100 / questions.length)}
            />
            <p className="text-sm text-gray-600 mt-2">
              Question {currentQuestion + 1} of {questions.length}
            </p>
          </div>
        </div>

        {/* Questions Section */}
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4">
            {questions[currentQuestion].question}
          </h3>
          <div className="space-y-4">
            <RadioGroup label="">
              {questions[currentQuestion].options.map((option, index) => (
                <Radio
                  key={index}
                  value={option}
                  checked={selectedAnswer === option}
                  onChange={() => setSelectedAnswer(option)}
                  color="default"
                >{option}</Radio>
              ))}
            </RadioGroup>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="w-full max-w-4xl flex justify-between mt-8">
          <Button
            color="default"
            size="lg"
            onClick={handlePreviousQuestion}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>
          {currentQuestion < questions.length - 1 ? (
            <Button color="default" size="lg" onClick={handleNextQuestion}>
              Next
            </Button>
          ) : (
            <Button onClick={handleNavigateToCourse} color="default" size="lg">
              Submit
            </Button>
          )}
        </div>

        {/* Timer */}
        <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4">
          <p className="text-lg font-bold">Time Left: {formatTime(timeLeft)}</p>
        </div>
      </section>
    </DefaultLayout>
  );
}