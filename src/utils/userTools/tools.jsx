import React, { useContext, useEffect } from "react";
import MyContext from "../../utils/context/MyContext";
import ToolCard from "../../components/cards/toolCard";
import rightArrow from "../../assets/rightArrowImg.png";

export default function UserTools() {
  const { tools, setTools } = useContext(MyContext);

  // Set sample data for tools state
  useEffect(() => {
    setTools([
      {
        toolImg: rightArrow,
        toolName: "Tool 1",
      },
      {
        toolImg: rightArrow,
        toolName: "Tool 2",
      },
      {
        toolImg: rightArrow,
        toolName: "Tool 3",
      },
      // Add more sample data as needed
    ]);
  }, [setTools]);

  return (
    <div className="p-5 shadow-lg w-full h-full">
      <h3 className="text-lg text-purple-800 p-2 font-semibold border-0 border-b-2 border-purple-800">
        Board Tools
      </h3>
      <div className="grid grid-cols-3 sm:h-20 h-96 overflow-auto gap-5 p-2">
        {tools.map((tool, index) => (
          <ToolCard
            key={index}
            toolImg={tool.toolImg}
            toolName={tool.toolName}
          />
        ))}
      </div>
    </div>
  );
}
