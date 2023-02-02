import { useState } from 'react';
import './App.css';
import Box from './component/Box';
import ComputerBox from './component/ComputerBox';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

// 1. 박스 2개 (타이틀, 사진, 결과)
// 2. 가위 바위 보 버튼 만들기
// 3. 버튼을 클릭하면 클릭한 값이 박스에 보인다.
// 4. 컴퓨터는 랜덤하게 아이템이 생성되게 한다.
// 5. 결과를 따진다.
// 6. 승패 결과에 맞게 색상이 바뀐다.

// ()=> 콜백함수 콜백 함수를 주어 바로 실행되지 않게 한다. 콜백 함수를 주는 이유는 react는 전체 다 바로 실행하기 때문에 콜백 함수를 주어야한다.

const choice = { // 가위바위보 객체를 만들어 준다.
  rock:{
    name:"Rock",
    img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6JllUUcUq4b6CEdlUPdiuBEM7IpJWHIDdlQ&usqp=CAU"
  },
  scissors:{
    name:"Scissors",
    img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRClwiApydF9Nqcy2McAYDeUOhEj-O70_RUkg&usqp=CAU"
  },
  paper:{
    name:"Paper",
    img:"https://en.pimg.jp/081/117/228/1/81117228.jpg"
  },
}
function App() {

  const [userSelect,setuserSelect] = useState(null);
  const [computerSelect,setcomputerSelect] = useState(null);
  const [result,setResult]=useState("")
  const [computerResult,setcomputerResult] = useState("")

  const play=(userchoice)=>{ //play 함수
    setuserSelect(choice[userchoice])

    let ComputerChoice = randomChoice()
    setcomputerSelect(ComputerChoice)

    setResult(judgement(choice[userchoice],ComputerChoice))
    setcomputerResult(computerjudgement(choice[userchoice],ComputerChoice))
  }

  const judgement = (user,computer) =>{
    if(user.name == computer.name){
      return "tie"
    }else if(user.name == "Rock")return computer.name == "Scissors"?"Win":"lose"
    else if(user.name == "Scissors")return computer.name == "Paper"?"Win":"lose"
    else if(user.name == "Paper")return computer.name == "Rock"?"Win":"lose"
  };

  const computerjudgement = (user,computer) =>{
    if(user.name == computer.name){
      return "tie"
    }else if(user.name == "Rock")return computer.name == "Scissors"?"lose":"Win"
    else if(user.name == "Scissors")return computer.name == "Paper"?"lose":"Win"
    else if(user.name == "Paper")return computer.name == "Rock"?"lose":"Win"
  };
  

  const randomChoice = () =>{
    let itemArray = Object.keys(choice); // 객체에 키 값만 뽑아서 배열로 만들어주는 함수.
    
    let randomitem = Math.floor(Math.random() * itemArray.length);
    let final = itemArray[randomitem]
    return choice[final]
  }

  return (
  <div>
    <div className='main'>
      <Box title="YOU" item={userSelect} result={result}/>
      {/* <Box title="Computer" item={computerSelect} result={result}/> */}
      <ComputerBox title="Computer" item={computerSelect} result={computerResult} />
    </div>
    <div className='main-button'>
      <Button className='btn' variant="outline-warning" onClick={()=>play("scissors")}>가위</Button> 
      <Button className='btn' variant="outline-warning" onClick={()=>play("rock")}>바위</Button>
      <Button className='btn' variant="outline-warning" onClick={()=>play("paper")}>보</Button>
    </div>
  </div>
  );
  }

export default App;
