var keyboard = document.getElementById("row");
var calculationPart = document.getElementById("calculation");
var resultPart = document.getElementById("result");

var result = {
  CalculationValue: "",
  lastResult: 0,
  operation: "",
};

function valueOnClick(event) {
  result.CalculationValue += event.target.innerText;
  calculationPart.innerHTML = result.CalculationValue;
}

function showResult() {
  resultPart.innerHTML = result.lastResult;
  result = { ...result, lastResult: 0, operation: "" };
  var splitedCalculation = result.CalculationValue.match(/([0-9]+|[*+-\/])/g);
  splitedCalculation.forEach((value) => {
    setResultValue(value, /[0-9]/.test(value));
  });
  resultPart.value = result.lastResult;
}
function reset() {
  result = {
    CalculationValue: "",
    lastResult: 0,
    operation: "",
  };
  resultPart.value = result.lastResult;
  calculationPart.innerHTML = "";
}

function setResultValue(value, isNumber) {
  console.log({ value }, { isNumber }, { result });
  if (isNumber) {
    value = Number(value);
    switch (result.operation) {
      case "-": {
        result.lastResult -= value;
        break;
      }
      case "*": {
        result.lastResult *= value;
        break;
      }
      case "/": {
        result.lastResult /= value;
        break;
      }
      default: {
        result.lastResult += value;
        break;
      }
    }
  } else {
    result.operation = value;
  }
}

var buttonArray = [
  {
    value: "7",
    style: "numberButton",
  },
  {
    value: "8",
    style: "numberButton",
  },
  {
    value: "9",
    style: "numberButton",
  },
  {
    value: "+",
    style: "operationButton",
    id: "add",
  },
  {
    value: "4",
    style: "numberButton",
  },
  {
    value: "5",
    style: "numberButton",
  },
  {
    value: "6",
    style: "numberButton",
  },
  {
    value: "-",
    style: "operationButton",
    id: "subtract",
  },
  {
    value: "1",
    style: "numberButton",
  },
  {
    value: "2",
    style: "numberButton",
  },
  {
    value: "3",
    style: "numberButton",
  },
  {
    value: "*",
    style: "operationButton",
    id: "multiple",
  },
  {
    value: "C",
    clickFunction: reset,
    style: "clear",
    id: "clear",
  },
  {
    value: "0",
    style: "numberButton",
  },
  {
    value: "=",
    clickFunction: showResult,
    style: "resultButton",
    id: "equal",
  },
  {
    value: "/",
    style: "operationButton",
    id: "division",
  },
];

buttonArray.forEach((element) => {
  var buttonContainer = document.createElement("div");
  buttonContainer.className = "col-3";
  buttonContainer.style.marginBottom = "16px";

  var button = document.createElement("button");
  button.className = element.style + " button";
  button.id = element.id ?? element.value;

  button.onclick = element.clickFunction ?? valueOnClick;
  button.innerText = element.value;

  buttonContainer.append(button);
  keyboard.append(buttonContainer);
});
