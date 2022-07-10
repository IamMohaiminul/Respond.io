const input = [
  {
    id: 3,
    sourceAccount: "A",
    targetAccount: "B",
    amount: 100,
    category: "eating_out",
    time: "2018-03-02T10:34:30.000Z",
  },
  {
    id: 1,
    sourceAccount: "A",
    targetAccount: "B",
    amount: 100,
    category: "eating_out",
    time: "2018-03-02T10:33:00.000Z",
  },
  {
    id: 6,
    sourceAccount: "A",
    targetAccount: "C",
    amount: 250,
    category: "other",
    time: "2018-03-02T10:33:05.000Z",
  },
  {
    id: 4,
    sourceAccount: "A",
    targetAccount: "B",
    amount: 100,
    category: "eating_out",
    time: "2018-03-02T10:36:00.000Z",
  },
  {
    id: 2,
    sourceAccount: "A",
    targetAccount: "B",
    amount: 100,
    category: "eating_out",
    time: "2018-03-02T10:33:50.000Z",
  },
  {
    id: 5,
    sourceAccount: "A",
    targetAccount: "C",
    amount: 250,
    category: "other",
    time: "2018-03-02T10:33:00.000Z",
  },
];

const findDuplicateTransactions = (transactions = []) => {
  // sort transactions by category
  const sortByCategory = transactions.sort((a, b) =>
    a.category > b.category ? 1 : b.category > a.category ? -1 : 0
  );
  // group transactions by category
  const groupByCategory = sortByCategory.reduce(function (group, transaction) {
    group[transaction.category] = group[transaction.category]
      ? group[transaction.category].concat(transaction)
      : [transaction];
    return group;
  }, {});

  let sortedTransactions = [];
  Object.keys(groupByCategory).forEach((key) => {
    // sort transactions by time inside group
    groupByCategory[key].sort((a, b) => {
      return new Date(a.time) - new Date(b.time);
    });
    // format transactions as expected
    sortedTransactions = sortedTransactions.includes(groupByCategory[key])
      ? sortedTransactions
      : [...sortedTransactions, groupByCategory[key]];
  });

  let output = [];
  // iterate each consecutive transaction to find duplicate transaction inside group
  for (let i = 0; i < sortedTransactions.length; i++) {
    let tempOutput = [];
    for (let j = 0; j < sortedTransactions[i].length - 1; j++) {
      // clone transaction except the id and the time inside group
      const item1 = (({ id, time, ...o }) => o)(sortedTransactions[i][j]);
      const item2 = (({ id, time, ...o }) => o)(sortedTransactions[i][j + 1]);
      // calculate the time difference in seconds
      const time1 = new Date(sortedTransactions[i][j].time);
      const time2 = new Date(sortedTransactions[i][j + 1].time);
      const diffInSec = (time2.getTime() - time1.getTime()) / 1000;
      // compare the transaction except id & time and time difference is less than 1 min inside group
      if (JSON.stringify(item1) === JSON.stringify(item2) && diffInSec < 60) {
        // add duplicate transactions in group
        tempOutput = tempOutput.includes(sortedTransactions[i][j])
          ? tempOutput
          : [...tempOutput, sortedTransactions[i][j]];
        tempOutput = tempOutput.includes(sortedTransactions[i][j + 1])
          ? tempOutput
          : [...tempOutput, sortedTransactions[i][j + 1]];
      } else if (j > 0 && j + 1 < sortedTransactions[i].length) {
        // add duplicate transaction group in output
        output = output.includes(tempOutput) ? output : [...output, tempOutput];
        tempOutput = [];
      }
    }
    // add remaining duplicate transaction group in output
    if (tempOutput.length > 0) {
      output = output.includes(tempOutput) ? output : [...output, tempOutput];
    }
  }
  return output;
};

console.log(findDuplicateTransactions(input));
