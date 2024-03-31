import rightArrow from "../../assets/rightArrowImg.png";
export default function ToolCard(props) {
  return (
    <div className="p-5 shadow-lg w-full sm:h-full h-1/2 flex  gap-2">
      <img src={props.toolImg} className="w-7 h-7 rounded-sm shadow-lg"></img>
      <div className="flex justify-center w-full gap-3">
        <h3 className="text-purple-950 text-lg">{props.toolName}</h3>
        <button>
          <img src={rightArrow} className="w-5 h-5"></img>
        </button>
      </div>
    </div>
  );
}
