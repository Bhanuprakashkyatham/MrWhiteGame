import React,{useState} from "react";

const PlayerCountSelector = ({onSubmit})=>{

    const [count, setCount] = useState(3);

    const handleSliderChange = (e)=>{
        setCount(e.target.value);
    }

    const handleNext = () => {
        onSubmit(count);
    };

    
    return(
        <>
            <div className="flex flex-col items-center justify-center gap-6 p-4 bg-gray-100 w-screen h-screen">
                <h1 className="text-2xl font-semibold">Select number of players</h1>
                <div className="text-center mt-2 text-lg font-medium text-blue-700">
                    {count} Player{count > 1 ? "s" : ""}
                </div>
                <div className="w-64">
                    <input className="w-full accent-blue-500" type="range" min="3" max="10" value={count} onChange={handleSliderChange}/>
                </div>

                <button
                    onClick={handleNext}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    Next
                </button>
            </div>
            
        </>
    )
}

export default PlayerCountSelector;