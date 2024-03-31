import rightArrow from "../../assets/rightArrowImg.png";
export default function UpdateCard(props) {
  return (
    <div className="p-2 shadow-lg w-full bg-white  flex justify-between items-center">
      <div className="flex gap-2 justify-between items-center">
        {" "}
        <img
          src={props.photo}
          className="h-8 w-8 rounded-full object-cover"
        ></img>
        <div>
          <h1 className="text-sm text-purple-800">{props.heading}</h1>
          <p className="text-lg text-purple-950 font-semibold">{props.info}</p>
        </div>
      </div>
      <button>
        <img src={rightArrow} className="w-5 h-5"></img>
      </button>
    </div>
  );
}
