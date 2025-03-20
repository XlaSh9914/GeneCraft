import { Button, Card, CardBody } from "@heroui/react";
import { useState, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";

import DefaultLayout from "../layouts/default";

// Define the types for our draggable items
interface DraggableItem {
  id: string;
  name: string;
  modelUrl: string;
  correctZone: string;
}

// Define the types for our drop zones
interface DropZone {
  id: string;
  name: string;
  description: string;
  modelUrl: string;
}

export default function InteractiveLearningPage() {
  // State for tracking which 3D model is currently being viewed
  const [currentModel, setCurrentModel] = useState<string | null>(null);

  // State to track if the current model is a cell location or component
  const [currentModelType, setCurrentModelType] = useState<
    "component" | "location" | null
  >(null);

  // State for tracking completed items
  const [completedItems, setCompletedItems] = useState<string[]>([]);

  // Reference for the drag item
  const dragItem = useRef<string | null>(null);

  // Sample data for draggable items (3D models)
  const draggableItems: DraggableItem[] = [
    {
      id: "dna",
      name: "DNA",
      modelUrl:
        "https://sketchfab.com/models/60e95170b37549e3b45ee490b74bb112/embed",
      correctZone: "nucleus",
    },
    {
      id: "rna",
      name: "RNA",
      modelUrl:
        "https://sketchfab.com/models/13039dfe90324120ad50a9a47ecdf311/embed",
      correctZone: "cytoplasm",
    },
    {
      id: "ribosome",
      name: "Ribosome",
      modelUrl:
        "https://sketchfab.com/models/2df1aeea00a64530af37f10daf0210fe/embed",
      correctZone: "cytoplasm",
    },
    {
      id: "protein",
      name: "Protein",
      modelUrl:
        "https://sketchfab.com/models/b5a39c784cc340e8929270be003018a2/embed",
      correctZone: "cell_membrane",
    },
  ];

  // Sample data for drop zones with added model URLs
  const dropZones: DropZone[] = [
    {
      id: "nucleus",
      name: "Nucleus",
      description: "The control center of the cell containing genetic material",
      modelUrl:
        "https://sketchfab.com/models/0d87fbe2581b4cabae809bd6aaa7d56b/embed",
    },
    {
      id: "cytoplasm",
      name: "Cytoplasm",
      description:
        "The gel-like substance within the cell where many cellular processes occur",
      modelUrl:
        "https://sketchfab.com/models/339c5a52e99e4713add1fec2298f66cb/embed",
    },
    {
      id: "cell_membrane",
      name: "Cell Membrane",
      description:
        "The outer boundary of the cell that controls what enters and exits",
      modelUrl:
        "https://sketchfab.com/models/a20c3e962b33473394cdb6a80c292eee/embed",
    },
  ];

  // Handle drag start
  const handleDragStart = (itemId: string) => {
    dragItem.current = itemId;
  };

  // Handle drop
  const handleDrop = (zoneId: string) => {
    if (dragItem.current) {
      const item = draggableItems.find((item) => item.id === dragItem.current);

      if (item) {
        if (item.correctZone === zoneId) {
          // Correct placement
          setCompletedItems((prev) => [...prev, item.id]);

          // Show success toast
          toast.success(
            `Correct! ${item.name} belongs in the ${dropZones.find((zone) => zone.id === zoneId)?.name}.`,
            {
              duration: 3000,
              style: {
                background: "#dafadb",
                color: "green",
                border: "1px solid var(--success-300)",
              },
              icon: "✓",
            },
          );
        } else {
          // Incorrect placement
          toast.error(
            `Incorrect. Try again! ${item.name} doesn't belong here.`,
            {
              duration: 3000,
              style: {
                background: "#f7c6c5",
                color: "#e96364",
                border: "1px solid var(--danger-300)",
              },
              icon: "✗",
            },
          );
        }
      }

      dragItem.current = null;
    }
  };

  // Allow dropping
  const allowDrop = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // Handle viewing a component model
  const handleViewComponentModel = (modelUrl: string) => {
    setCurrentModel(modelUrl);
    setCurrentModelType("component");
  };

  // Handle viewing a location model
  const handleViewLocationModel = (modelUrl: string) => {
    setCurrentModel(modelUrl);
    setCurrentModelType("location");
  };

  return (
    <DefaultLayout>
      {/* Toast container */}
      <Toaster position="bottom-right" />

      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Interactive Cell Biology</h1>
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left side: 3D model viewer */}
          <div className="flex-1">
            <Card className="mb-6">
              <CardBody>
                <h2 className="text-2xl font-bold mb-4 {subtitle()}">
                  3D Model Viewer
                </h2>
                {currentModel ? (
                  <div className="sketchfab-embed-wrapper">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-medium">
                        {currentModelType === "component"
                          ? `Viewing: ${draggableItems.find((item) => item.modelUrl === currentModel)?.name}`
                          : `Viewing: ${dropZones.find((zone) => zone.modelUrl === currentModel)?.name}`}
                      </h3>
                      <Button
                        color="primary"
                        size="sm"
                        variant="light"
                        onClick={() => {
                          setCurrentModel(null);
                          setCurrentModelType(null);
                        }}
                      >
                        Close
                      </Button>
                    </div>
                    <iframe
                      allow="autoplay; fullscreen; xr-spatial-tracking"
                      className="w-full aspect-video"
                      frameBorder="0"
                      src={currentModel}
                      title="3D Model Viewer"
                    />
                  </div>
                ) : (
                  <div className="bg-default-100 rounded-lg p-8 text-center">
                    <p className="text-default-600">
                      Click on any cellular component or location to view it in
                      3D
                    </p>
                  </div>
                )}
              </CardBody>
            </Card>

            {/* Instructions */}
            <Card>
              <CardBody>
                <h2 className="text-2xl font-bold mb-4 {subtitle()}">
                  Instructions
                </h2>
                <p className="mb-4 text-default-700">
                  Drag each cellular component to its correct location in the
                  cell:
                </p>
                <ol className="list-decimal list-inside space-y-2 text-default-700">
                  <li>
                    Click on a model to view it in 3D (components or locations)
                  </li>
                  <li>Drag the component to the correct cellular location</li>
                  <li>Complete all placements to finish the exercise</li>
                </ol>
              </CardBody>
            </Card>
          </div>

          {/* Right side: Drag items and drop zones */}
          <div className="lg:w-1/2 space-y-6">
            {/* Draggable items */}
            <Card>
              <CardBody>
                <h2 className="text-2xl font-bold mb-4 {subtitle()}">
                  Cellular Components
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {draggableItems.map((item) => (
                    <button
                      key={item.id}
                      className={`p-4 border rounded-lg cursor-grab w-full text-left ${
                        completedItems.includes(item.id)
                          ? "bg-success-100 border-success-300"
                          : "bg-primary-50 border-primary-200 hover:bg-primary-100"
                      }`}
                      draggable={!completedItems.includes(item.id)}
                      onClick={() => handleViewComponentModel(item.modelUrl)}
                      onDragStart={() => handleDragStart(item.id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          handleViewComponentModel(item.modelUrl);
                        }
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`font-medium ${completedItems.includes(item.id) ? "text-success-700" : "text-primary-700"}`}
                        >
                          {item.name}
                        </span>
                        <span className="text-xs text-default-500 {subtitle()}">
                          {!completedItems.includes(item.id) && "View & Drag"}
                          {completedItems.includes(item.id) && (
                            <span className="text-success-600">✓ Placed</span>
                          )}
                        </span>
                      </div>
                    </button>
                  ))}{" "}
                </div>
              </CardBody>
            </Card>

            {/* Drop zones */}
            <Card>
              <CardBody>
                <h2 className="text-2xl font-bold mb-4 {subtitle()}">
                  Cell Locations
                </h2>
                <div className="space-y-4">
                  {dropZones.map((zone) => (
                    <div
                      key={zone.id}
                      className="p-4 border-2 border-dashed border-default-300 rounded-lg bg-default-50"
                      onDragOver={allowDrop}
                      onDrop={() => handleDrop(zone.id)}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="text-xl font-semibold text-default-800">
                          {zone.name}
                        </h3>
                        <Button
                          color="primary"
                          size="sm"
                          variant="bordered"
                          onClick={() => handleViewLocationModel(zone.modelUrl)}
                        >
                          View 3D Model
                        </Button>
                      </div>
                      <p className="text-default-600">{zone.description}</p>

                      {/* Display items that have been correctly placed here */}
                      <div className="mt-2">
                        {draggableItems
                          .filter(
                            (item) =>
                              item.correctZone === zone.id &&
                              completedItems.includes(item.id),
                          )
                          .map((item) => (
                            <span
                              key={item.id}
                              className="inline-block bg-success-100 text-success-700 px-2 py-1 text-sm rounded mr-2 mb-1"
                            >
                              {item.name}
                            </span>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>

            {/* Progress tracker */}
            <Card>
              <CardBody>
                <h2 className="text-2xl font-bold mb-4 {subtitle()}">
                  Progress
                </h2>
                <div className="w-full bg-default-200 rounded-full h-4">
                  <div
                    className="bg-primary-600 h-4 rounded-full transition-all duration-500"
                    style={{
                      width: `${(completedItems.length / draggableItems.length) * 100}%`,
                    }}
                  />
                </div>
                <p className="mt-2 text-center text-default-700">
                  {completedItems.length} of {draggableItems.length} completed
                </p>

                {completedItems.length === draggableItems.length && (
                  <div className="mt-4 p-4 bg-success-100 text-success-800 rounded-lg">
                    <h3 className="font-bold text-lg">Congratulations!</h3>
                    <p>You&apos;ve successfully completed this exercise.</p>
                    <Button className="mt-2" color="success">
                      Next Lesson
                    </Button>
                  </div>
                )}
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
