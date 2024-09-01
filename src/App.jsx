import LineChart from './line-chart'

function App() {

  const lastMonthData = [300, 450, 320, 580, 710, 890, 940];
  const previousMonthData = [200, 340, 480, 360, 600, 720, 800];

  return (
    <>
      <h1>Variacion de precipitaciones semanales</h1>
      <LineChart   data1={lastMonthData} data2={previousMonthData} />
    </>
  )
}

export default App
