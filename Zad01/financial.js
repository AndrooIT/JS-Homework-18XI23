// 1. Based on data in the financial.json file
// a. Use the starter file financial.js
// b. Create an object that will give us data about:
//     i. How much money was spent in 2014
//     ii. Earnings per company
//     iii. Spendings per transaction type
//     iv. Spendings by month
//     v. Spendings per day of the week

const data = require("./financial.json");
console.log("Financial data: " + JSON.stringify(getFiancialObject(data)));

function getFiancialObject(data) {
  // TODO (create functions for calculations below)
  // b. Create an object that will give us data about:
  const financialObject = {
    moneySpentin2014: 0,
    earningsPerCompany: {},
    spendingsPerTransactionType: {},
    spendingsByMonth: {},
    spendingsPerDayOfTheWeek: {},
  };
  //     i. How much money was spent in 2014
  financialObject.moneySpentin2014 = data
    .filter((cur) => cur.detailsOfPayent.date.includes("-2014"))
    .reduce((acc, cur) => (acc += Number(cur.cost)), 0)
    .toFixed(2);
  //     ii. Earnings per company
  financialObject.earningsPerCompany = data.reduce(
    (acc, cur) => (
      (acc[cur.detailsOfPayent.company] =
        (acc[cur.detailsOfPayent.company] || 0) + Number(cur.cost)),
      acc
    ),
    {}
  );

  //     iii. Spendings per transaction type

  financialObject.spendingsPerTransactionType = data.reduce(
    (acc, cur) => (
      (acc[cur.detailsOfPayent.Type] =
        (acc[cur.detailsOfPayent.Type] || 0) + Number(cur.cost)),
      acc
    ),
    {}
  );

  //     iv. Spendings by month
  financialObject.spendingsByMonth = data.reduce(
    (acc, cur) => (
      (acc[cur.detailsOfPayent.date.slice(3, 5)] =
        (acc[cur.detailsOfPayent.date.slice(3, 5)] || 0) + Number(cur.cost)),
      acc
    ),
    {}
  );

  //     v. Spendings per day of the week
  function convertDate(date) {
    const [dd, mm, rrrr] = date.split("-");
    let newDate = new Date(rrrr + "-" + mm + "-" + dd);
    return newDate;
  }
  financialObject.spendingsPerDayOfTheWeek = data.reduce(
    (acc, cur) => (
      (acc[convertDate(cur.detailsOfPayent.date).getDay()] =
        (acc[convertDate(cur.detailsOfPayent.date).getDay()] || 0) +
        Number(cur.cost)),
      acc
    ),
    {}
  );
  return financialObject;
}
//PYTANIE - DLACZEGO TOFIXED() NIE CHCE DZIAŁAĆ????
// TODO (util functions)
