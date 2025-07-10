import React,{useState} from "react";
import PlayerCountSelector from "../components/PlayerCountSelector";
import CardSelection from "../components/CardSelection";

export default function GamePage() {
    const [count, setCount] = useState(0);
  return (
    <div>
      
        {count>0 ? 
            <CardSelection count={count}/>
            :
            <PlayerCountSelector onSubmit={(count) => setCount(count)} />
        }
    </div>
  );
}
