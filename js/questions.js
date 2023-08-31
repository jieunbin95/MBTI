import {questions} from './data.js'  //import는 가져오다라는 의미 data.js의 일부분을(question) 가져올때 {}안에 입력 

const progressValueEl=document.querySelector('.progress .value')
const numberEl=document.querySelector('.number')
const questionEl=document.querySelector('.question')
const choice1El=document.querySelector('.choice1')
const choice2El=document.querySelector('.choice2')

let currentNumber=0    //변수가 바뀌는 경우 let으로
let mbti=''

//버튼을 누르면 숫자와 질문지, 상태바를 바꿔주는 js
function renderQuestion() {        //function을 통해 여러 함수를 입력할 수 있다
  const question=questions[currentNumber]
  numberEl.innerHTML=question.number      //html에 data.js파일에 있는 question부분의 number을 넣어준다
  questionEl.innerHTML=question.question
  choice1El.innerHTML=question.choices[0].text
  choice2El.innerHTML=question.choices[1].text
  progressValueEl.style.width = (currentNumber+1)*10+'%'  //진행사항에 맞게 상태바를 바꿔줌
}

//질문지를 통해 mbti를 지정하고 저장해주는 js
function nextQuestion(choiceNunmber) {
  if (currentNumber === questions.length - 1) {      //결과 페이지로 이동(질문지의 갯수가 많은 경우 data.js의 questions부분의 수(length)로 지정해준다)
    showResultPage()
    return       //위의 조건이 맞을 경우 아래의 출력 부분의 실행하지 않는다
  }
  const question=questions[currentNumber]
  mbti = mbti + question.choices[choiceNunmber].value
  currentNumber=currentNumber+1
  renderQuestion()  //render는 출력한다는 의미
}

//저장된 mbti를 통해 결과 페이지를 만듬
function showResultPage() {
  location.href='/results.html?mbti='+mbti //쿼리스트링(주소에 정보를 담아 페이지 이동하는 방식) 이동하고자하는 html를 넣고 ? 뒤에 정보의 이름+정보를 입력해준다
}

choice1El.addEventListener('click',function(){  //choice1.2를 선택하면 위 nextQuestion의 choiceNumber의 숫자가 0또는1로 변경되어 그에 맞는 value를 저장할 수 있게 함
  nextQuestion(0)
})

choice2El.addEventListener('click',function(){
  nextQuestion(1)
})

renderQuestion()