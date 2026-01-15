type InvestmentData = {
  initialAmount: number;
  annualContribution: number;
  expectedReturn: number;
  duration: number;
}

type InvestmentRes = {
  year: string;
  totalAmount: number;
  totalContributions: number;
  totalInterestEarned: number
}

type CalculationResult = InvestmentRes[]|string;

function calculateInvestment(data:InvestmentData): CalculationResult{
  const {initialAmount, annualContribution, expectedReturn, duration} = data

  if(initialAmount < 0){
    return "Initial investment amoun must be bigger than 0"
  }

  if(duration<=0){
    return 'No valid amount of years provided'
  }

  if(expectedReturn< 0){
    return 'Expected return must be at least 0'
  }


  var total = initialAmount;
  var totalContributions = 0;
  var totalInterestEarned = 0;

  const annualResults: InvestmentRes[] = new Array(duration);

  for(var i = 0; i < duration; i++){
    total *= 1 + expectedReturn;
    totalInterestEarned = total - totalContributions - initialAmount
    totalContributions += annualContribution
    total += annualContribution

    annualResults[i] = {
      year: `Year ${i+1}`,
      totalAmount: total,
      totalInterestEarned,
      totalContributions
    }
  }

  return annualResults
}

function printResults(results: CalculationResult){
  if(typeof results === 'string'){
    console.log(results);
    return;
  }

  for (const yearEndResult of results){
    console.log(yearEndResult.year);
    console.log(`total: ${yearEndResult.totalAmount.toFixed(0)}`)
    console.log(`total contributions: ${yearEndResult.totalContributions.toFixed(0)}`)
    console.log(`total interest eared: ${yearEndResult.totalInterestEarned.toFixed(0)}`)
    console.log("--------------------")
  }

}

const investmentData: InvestmentData ={
  initialAmount: 5000,
  annualContribution: 500,
  expectedReturn: 0.08,
  duration: 10
} 

const results = calculateInvestment(investmentData)

printResults(results)
