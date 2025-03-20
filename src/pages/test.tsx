import { Button, Progress, RadioGroup, Radio } from "@heroui/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import DefaultLayout from "../layouts/default";

export default function EvaluationTestPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds
  const [questions, setQuestions] = useState<
    {
      id: string;
      question: string;
      options: string[];
      correctAnswer: string;
      difficulty: string;
    }[]
  >([]);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [eligibleLevel, setEligibleLevel] = useState(0);
  const navigate = useNavigate();

  // Original questions data from JSON
  const originalQuestions = [
    {
      LevelNumber: "0",
      difficulty: "1",
      Question: "What is the sugar in DNA called?",
      Options: {
        Option1: "Glucose",
        Option2: "Ribose",
        Option3: "Deoxyribose",
        Option4: "Fructose",
      },
      AnswerOptions: "3",
    },
    {
      LevelNumber: "0",
      difficulty: "1",
      Question: "Which RNA type carries amino acids during translation?",
      Options: {
        Option1: "mRNA",
        Option2: "tRNA",
        Option3: "rRNA",
        Option4: "snRNA",
      },
      AnswerOptions: "2",
    },
    {
      LevelNumber: "0",
      difficulty: "1",
      Question: 'What is the complementary DNA strand for "ATGCTA"?',
      Options: {
        Option1: "TACGAT",
        Option2: "ATCGTA",
        Option3: "TAGCUT",
        Option4: "UACGAT",
      },
      AnswerOptions: "1",
    },
    {
      LevelNumber: "0",
      difficulty: "1",
      Question: "True/False: RNA is double stranded.",
      Options: {
        Option1: "True",
        Option2: "False",
        Option3: "Only in some organisms",
        Option4: "Only during replication",
      },
      AnswerOptions: "2",
    },
    {
      LevelNumber: "0",
      difficulty: "1",
      Question: "How many nucleotides form a codon?",
      Options: {
        Option1: "1",
        Option2: "2",
        Option3: "3",
        Option4: "4",
      },
      AnswerOptions: "3",
    },
    {
      LevelNumber: "0",
      difficulty: "1",
      Question: "Name the process where DNA copies itself.",
      Options: {
        Option1: "Transcription",
        Option2: "Translation",
        Option3: "Replication",
        Option4: "Splicing",
      },
      AnswerOptions: "3",
    },
    {
      LevelNumber: "0",
      difficulty: "1",
      Question:
        "Which molecule is a product of transcription: DNA, RNA, or protein?",
      Options: {
        Option1: "DNA",
        Option2: "RNA",
        Option3: "Protein",
        Option4: "Lipid",
      },
      AnswerOptions: "2",
    },
    {
      LevelNumber: "0",
      difficulty: "1",
      Question: "What replaces thymine in RNA?",
      Options: {
        Option1: "Adenine",
        Option2: "Guanine",
        Option3: "Uracil",
        Option4: "Cytosine",
      },
      AnswerOptions: "3",
    },
    {
      LevelNumber: "0",
      difficulty: "1",
      Question: 'What does "central dogma" describe?',
      Options: {
        Option1: "DNA replication",
        Option2: "The flow of genetic information: DNA → RNA → Protein",
        Option3: "Protein folding",
        Option4: "RNA splicing",
      },
      AnswerOptions: "2",
    },
    {
      LevelNumber: "0",
      difficulty: "1",
      Question: "Which bond holds DNA base pairs together?",
      Options: {
        Option1: "Ionic bond",
        Option2: "Hydrogen bond",
        Option3: "Covalent bond",
        Option4: "Peptide bond",
      },
      AnswerOptions: "2",
    },
    {
      LevelNumber: "0",
      difficulty: "2",
      Question: "What is the difference between DNA and RNA?",
      Options: {
        Option1: "DNA has uracil, RNA has thymine",
        Option2: "DNA is single-stranded, RNA is double-stranded",
        Option3: "DNA has deoxyribose, RNA has ribose",
        Option4: "DNA is found in the cytoplasm, RNA is found in the nucleus",
      },
      AnswerOptions: "3",
    },
    {
      LevelNumber: "0",
      difficulty: "2",
      Question: "What is the role of RNA polymerase?",
      Options: {
        Option1: "Synthesize DNA",
        Option2: "Synthesize RNA",
        Option3: "Unwind DNA",
        Option4: "Join RNA fragments",
      },
      AnswerOptions: "2",
    },
    {
      LevelNumber: "0",
      difficulty: "3",
      Question: "What is the role of the polyA tail in mRNA?",
      Options: {
        Option1: "Protect mRNA from degradation",
        Option2: "Initiate translation",
        Option3: "Terminate translation",
        Option4: "Replicate mRNA",
      },
      AnswerOptions: "1",
    },
    {
      LevelNumber: "0",
      difficulty: "3",
      Question: "What is a neural network's role in genome annotation?",
      Options: {
        Option1: "Predict gene functions and locations",
        Option2: "Align sequences",
        Option3: "Build phylogenetic trees",
        Option4: "Simulate protein folding",
      },
      AnswerOptions: "1",
    },
    {
      LevelNumber: "0",
      difficulty: "2",
      Question: "What is the difference between a gene and a genome?",
      Options: {
        Option1:
          "A gene is a segment of DNA, a genome is the entire set of DNA",
        Option2: "A gene is a protein, a genome is a set of proteins",
        Option3: "A gene is a type of RNA, a genome is a set of RNA",
        Option4: "A gene is a chromosome, a genome is a set of chromosomes",
      },
      AnswerOptions: "1",
    },
  ];

  // Function to convert JSON options to array format
  const formatQuestion = (q: {
    LevelNumber: any;
    difficulty: any;
    Question: any;
    Options: {
      [x: string]: any;
      Option1: any;
      Option2: any;
      Option3: any;
      Option4: any;
    };
    AnswerOptions: any;
  }) => {
    return {
      id: q.LevelNumber + q.difficulty,
      question: q.Question,
      options: [
        q.Options.Option1,
        q.Options.Option2,
        q.Options.Option3,
        q.Options.Option4,
      ],
      correctAnswer: q.Options[`Option${q.AnswerOptions}`],
      difficulty: q.difficulty, // Add this line
    };
  };

  // Initialize with randomized questions that include some from each difficulty level
  useEffect(() => {
    // Group questions by difficulty
    const level1Questions = originalQuestions.filter(
      (q) => q.difficulty === "1",
    );
    const level2Questions = originalQuestions.filter(
      (q) => q.difficulty === "2",
    );
    const level3Questions = originalQuestions.filter(
      (q) => q.difficulty === "3",
    );

    // Shuffle each group
    const shuffleArray = (array: any[]) =>
      [...array].sort(() => 0.5 - Math.random());

    const shuffled1 = shuffleArray(level1Questions).slice(0, 5); // Take 5 level 1 questions
    const shuffled2 = shuffleArray(level2Questions).slice(0, 2); // Take 2 level 2 questions
    const shuffled3 = shuffleArray(level3Questions).slice(0, 2); // Take 2 level 3 questions

    // Combine and shuffle for final sequence
    const combinedQuestions = shuffleArray([
      ...shuffled1,
      ...shuffled2,
      ...shuffled3,
    ]);

    // Format questions
    const formattedQuestions = combinedQuestions.map(formatQuestion);

    setQuestions(formattedQuestions);
  }, []);

  // Handle timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          // Time's up - evaluate and show results
          evaluateAndShowResults();
          clearInterval(timer);

          return 0;
        }

        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [answers, questions]);

  // Save the selected answer
  useEffect(() => {
    if (selectedAnswer) {
      setAnswers((prev) => ({
        ...prev,
        [currentQuestion]: selectedAnswer,
      }));
    }
  }, [selectedAnswer, currentQuestion]);

  // Handle next question
  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(answers[currentQuestion + 1] || "");
    }
  };

  // Handle previous question
  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[currentQuestion - 1] || "");
    }
  };

  // Format time
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Evaluate answers and determine eligible level
  const evaluateAndShowResults = () => {
    let correctByDifficulty: { [key: string]: number } = {
      "1": 0,
      "2": 0,
      "3": 0,
    };

    let totalByDifficulty: { [key: string]: number } = {
      "1": 0,
      "2": 0,
      "3": 0,
    };

    // Count correct answers by difficulty
    questions.forEach((q, index) => {
      totalByDifficulty[q.difficulty]++;

      if (answers[index] === q.correctAnswer) {
        correctByDifficulty[q.difficulty]++;
      }
    });

    // Calculate percentage correct for each difficulty
    const percentLevel1 =
      totalByDifficulty["1"] > 0
        ? (correctByDifficulty["1"] / totalByDifficulty["1"]) * 100
        : 0;
    const percentLevel2 =
      totalByDifficulty["2"] > 0
        ? (correctByDifficulty["2"] / totalByDifficulty["2"]) * 100
        : 0;
    const percentLevel3 =
      totalByDifficulty["3"] > 0
        ? (correctByDifficulty["3"] / totalByDifficulty["3"]) * 100
        : 0;

    // Determine eligible level
    let level = 0;

    if (percentLevel1 >= 70) level = 1;
    if (percentLevel2 >= 60 && level === 1) level = 2;
    if (percentLevel3 >= 50 && level === 2) level = 3;

    setEligibleLevel(level);

    // Show toast notification
    toast.success(`You are eligible for Level ${level + 1}!`, {
      duration: 3000,
      position: "bottom-left",
      style: {
        background: "#4CAF50",
        color: "#fff",
        fontWeight: "bold",
        padding: "16px",
        borderRadius: "8px",
      },
    });
  };

  // Handle navigation to course page
  const handleNavigateToCourse = () => {
    evaluateAndShowResults();
    setTimeout(() => {
      navigate("/course", { state: { eligibleLevel } });
    }, 3000); // Navigate after showing toast for 3 seconds
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center min-h-screen p-6">
        {/* Test Instructions */}
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">
            Molecular Biology Evaluation Test
          </h2>
          <p className="text-gray-700">
            This test consists of {questions.length} randomly selected questions
            of varying difficulty. You have {Math.floor(timeLeft / 60)} minutes
            to complete the test. Please answer all questions to the best of
            your ability.
          </p>
          <div className="mt-4">
            <Progress
              color="default"
              value={(currentQuestion + 1) * (100 / questions.length)}
            />
            <p className="text-sm text-gray-600 mt-2">
              Question {currentQuestion + 1} of {questions.length}
              {questions.length > 0 && (
                <span className="ml-2">
                  (Difficulty: Level {questions[currentQuestion]?.difficulty})
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Questions Section */}
        {questions.length > 0 ? (
          <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4">
              {questions[currentQuestion].question}
            </h3>
            <div className="space-y-4">
              <RadioGroup label="">
                {questions[currentQuestion].options.map((option, index) => (
                  <Radio
                    key={index}
                    checked={selectedAnswer === option}
                    color="default"
                    value={option}
                    onChange={() => setSelectedAnswer(option)}
                  >
                    {option}
                  </Radio>
                ))}
              </RadioGroup>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
            <p>Loading questions...</p>
          </div>
        )}

        {/* Navigation Controls */}
        <div className="w-full max-w-4xl flex justify-between mt-8">
          <Button
            color="primary"
            disabled={currentQuestion === 0}
            size="lg"
            onClick={handlePreviousQuestion}
          >
            Previous
          </Button>
          {questions.length > 0 && currentQuestion < questions.length - 1 ? (
            <Button color="primary" size="lg" onClick={handleNextQuestion}>
              Next
            </Button>
          ) : (
            <Button color="primary" size="lg" onClick={handleNavigateToCourse}>
              Submit
            </Button>
          )}
        </div>

        {/* Timer */}
        <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4">
          <p className="text-lg font-bold">Time Left: {formatTime(timeLeft)}</p>
        </div>

        {/* Results Modal could be added here if needed */}
      </section>
      <Toaster position="bottom-right" />
    </DefaultLayout>
  );
}
