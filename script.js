async function calculate(){


const amount = Number(document.getElementById("amount").value);

const years = Number(document.getElementById("years").value) || 0;

const months = Number(document.getElementById("months").value) || 0;

const interest = Number(document.getElementById("rate").value);


const currency = document.getElementById("currency").value;





if(amount <= 0 || interest < 0){


alert("Enter valid numbers");

return;


}





const totalMonths = (years * 12) + months;




if(totalMonths <= 0){


alert("Enter loan time");


return;


}







// GET LIVE CURRENCY RATES


let exchangeRate;



try{


const response = await fetch(

"https://open.er-api.com/v6/latest/USD"

);



const data = await response.json();




// selected currency rate

exchangeRate = data.rates[currency];




document.getElementById("rate-value").innerHTML =


`≈ 1 USD = ${exchangeRate.toFixed(4)} ${currency}`;



}

catch(error){


console.log(error);


document.getElementById("rate-value").innerHTML =

"Currency unavailable";


return;


}









// LOAN FORMULA


const monthlyRate = (interest / 100) / 12;



let monthlyPayment;





if(monthlyRate === 0){


monthlyPayment = amount / totalMonths;


}

else{


monthlyPayment =


amount *

monthlyRate *

Math.pow(1 + monthlyRate,totalMonths)

/

(

Math.pow(1 + monthlyRate,totalMonths)-1

);



}







const totalAmount = monthlyPayment * totalMonths;


const totalInterest = totalAmount - amount;


const monthlyInterest = totalInterest / totalMonths;









function formatUSD(value){


return value.toLocaleString("en-US",{


style:"currency",


currency:"USD"


});


}








function formatCurrency(value){


return value.toLocaleString("en-US",{


style:"currency",


currency:currency


});


}











// MONTHLY PAYMENT


document.getElementById("monthly-usd").innerHTML =


"🇺🇸 " + formatUSD(monthlyPayment);




document.getElementById("monthly-mxn").innerHTML =


"🌎 " + formatCurrency(monthlyPayment * exchangeRate);










// MONTHLY INTEREST


document.getElementById("interest-usd").innerHTML =


"🇺🇸 " + formatUSD(monthlyInterest);




document.getElementById("interest-mxn").innerHTML =


"🌎 " + formatCurrency(monthlyInterest * exchangeRate);











// TOTAL INTEREST


document.getElementById("total-interest-usd").innerHTML =


"🇺🇸 " + formatUSD(totalInterest);




document.getElementById("total-interest-mxn").innerHTML =


"🌎 " + formatCurrency(totalInterest * exchangeRate);











// TOTAL AMOUNT


document.getElementById("total-usd").innerHTML =


"🇺🇸 " + formatUSD(totalAmount);




document.getElementById("total-mxn").innerHTML =


"🌎 " + formatCurrency(totalAmount * exchangeRate);





}