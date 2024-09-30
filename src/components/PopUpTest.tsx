import { ReactElement } from "react";

const carryOn = confirm(
  "Hello! would you like to try my simple calculator app?"
);





export function PopUp (): ReactElement{


  if (carryOn == true) {
    const n1 = prompt("Please enter the 1st number:");
    console.log(n1);
    let n1AsNumber = window.parseInt(n1);
  
    while (isNaN(n1AsNumber)) {
      alert("Please enter a valid numerical number");
      const n1 = prompt("Please enter the 1st number:");
      console.log(n1);
      n1AsNumber = window.parseInt(n1);
    }
  
    const n2 = prompt("Please enter the 2nd number:");
    console.log(n2);
    let n2AsNumber = window.parseInt(n2);
  
    while (isNaN(n2AsNumber)) {
      alert("Please enter a valid numerical number");
      const n2 = prompt("Please enter the 2nd number:");
      console.log(n2);
      n2AsNumber = window.parseInt(n2);
    }
  
    //check the calculation method and return the answer based on the method
  
    let calculate = prompt(
      "Please enter one of the calulation methods +, -, *, /"
    );
    console.log(calculate);
  
    switch (calculate) {
      case "+":
        alert("The answer is: " + (n1AsNumber + n2AsNumber));
        break;
  
      case "-":
        alert("The answer is: " + (n1AsNumber - n2AsNumber));
        break;
  
      case "*":
        alert("The answer is: " + n1AsNumber * n2AsNumber);
        break;
  
      case "/":
        alert("The answer is: " + n1AsNumber / n2AsNumber);
        break;
  
      default:
        alert(
          "end up here as I haven't written a test for incorrect calculation method"
        );
        break;
    }
  
    alert("Thanks for trying my calculator. Bye for now!");
  } else {
    alert("Ok not to worry, another time maybe. Bye for now!");
  }








}












