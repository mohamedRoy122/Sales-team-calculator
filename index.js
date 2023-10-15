const moment = require('moment');
const readline = require("readline");
const rl = readline.createInterface({
  input : process.stdin,
  output : process.stdout
});
 
function calculateDailyTargetSales(start, end, monthlyTarget) {
  const startDate = moment(start, 'DD MMM');
  const endDate = moment(end, 'DD MMM');
  const totalDays = endDate.diff(startDate, 'days') + 1;
  const workingDays = getWorkingDays(startDate, endDate);
  const total_frideys = totalDays - workingDays;
  const dailyTarget = monthlyTarget / workingDays;
  const weeklyTarget = dailyTarget * 6;
  const yearlyTarget = monthlyTarget * 12;

   
  console.log(`Your Start Date: ${startDate.format('DD MMM')}`);
  console.log(`Your End Date: ${endDate.format('DD MMM')}`);
  console.log(`Total Days: ${totalDays}`);
  console.log(`Total Working Days: ${workingDays}`);
  console.log(`total frideys: ${total_frideys}`);
  console.log(`Monthly Target: $${monthlyTarget}`);
  console.log(`Daily Target: $${dailyTarget.toFixed(2)}`);
  console.log(`weekly Target: $${weeklyTarget}`);
  console.log(`yearly Target: $${yearlyTarget}`);
}

function getWorkingDays(startDate, endDate) {
  let workingDays = 0;
  const currentDate = startDate.clone();

  while (currentDate.isSameOrBefore(endDate)) {
    if (currentDate.day() !== 5) { // Exclude Fridays
      workingDays++;
    }
    currentDate.add(1, 'day');
  }

  return workingDays;
}

rl.question("Enter the start date ( Like, 1-feb): ", (startDate) => {
  rl.question("Enter the end date (Like., 28-mar): ", (endDate) => {
    rl.question("Enter the monthly sales target: ", (monthlyTarget) => {
      const parsedMonthlyTarget = parseFloat(monthlyTarget);
      calculateDailyTargetSales(startDate, endDate, parseFloat(monthlyTarget));
      
    });
  }
  )
});

 

 