var ctx = document.getElementById('myChart').getContext('2d');
var NewSchema = new schema(1, 1, 2, 2)
console.log(NewSchema)
var myChart = new Chart(ctx, {
  type: 'pie',
  data: {
    labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
    datasets: [{
      label: 'red',
      data: [12, 19, 3, 17, 6, 3, 7],
      backgroundColor: "red"
    }, {
      label: 'oranges',
      data: [2, 29, 5, 5, 2, 3, 10],
      backgroundColor: "green"
    }]
  }
});
