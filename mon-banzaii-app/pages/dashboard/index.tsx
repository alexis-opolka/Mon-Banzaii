import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js";

import {Bar, Line, Scatter, Bubble} from "react-chartjs-2";
import { Text } from "@nextui-org/react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend
)



export default function Index(){
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        data: [0.1, 0.4, 0.2, 0.3, 0.7, 0.4, 0.6, 0.3]
      }
    ]
  }

  const H2OOptions = {
    plugins: {
      legend: {
        display: false,
      }
    },
    elements: {
      line: {
        tension: 0,
        borderWidth: 2,
        borderColor: "rgba(47,97,68,1)",
        fill: "start",
        backgroundColor: "rgba(47,97,68,0.3)"
      },
      points: {
        radius: 0,
        hitRadius: 0,
      }
    },
    scales: {
      xAxis: {
        display: false,
      },
      yAxis: {
        display: false
      }
    }
  }

  const O2Options = {
    plugins: {
      legend: {
        display: false,
      }
    },
    elements: {
      line: {
        tension: 0,
        borderWidth: 2,
        borderColor: "rgba(36, 197, 186, 1)",
        fill: "start",
        backgroundColor: "rgba(36, 197, 186, 0.3)"
      },
      points: {
        radius: 0,
        hitRadius: 0,
      }
    },
    scales: {
      xAxis: {
        display: false,
      },
      yAxis: {
        display: false
      }
    }
  }

  const LumosOptions = {
    plugins: {
      legend: {
        display: false,
      }
    },
    elements: {
      line: {
        tension: 0,
        borderWidth: 2,
        borderColor: "rgba(186, 197, 36, 1)",
        fill: "start",
        backgroundColor: "rgba(186, 197, 36, 0.3)"
      },
      points: {
        radius: 0,
        hitRadius: 0,
      }
    },
    scales: {
      xAxis: {
        display: false,
      },
      yAxis: {
        display: false
      }
    }
  }

  const CalculatedOptions = {
    plugins: {
      legend: {
        display: false,
      }
    },
    elements: {
      line: {
        tension: 0,
        borderWidth: 2,
        borderColor: "rgba(36, 197, 58, 1)",
        fill: "start",
        backgroundColor: "rgba(36, 197, 58, 0.3)"
      },
      points: {
        radius: 0,
        hitRadius: 0,
      }
    },
    scales: {
      xAxis: {
        display: false,
      },
      yAxis: {
        display: false
      }
    }
  }

  return (
    <>
    <Text color="$TitleColor" className="text-center mb-3 mt-3">
      <h2>
        My Dashboard
      </h2>
    </Text>
    <div id="charts" className="d-flex flex-column">
      <div className="d-flex flex-row">
          <div className="card mb-3 ml-3 mr-3">
            <div className="card-header">
              <Text color="$TitleColor">Humidity (from 0 to 1)</Text>
            </div>
            <div className="card-body">
              <Line data={data} width={600} height={120} options={H2OOptions} />
            </div>
          </div>
          <div className="card mb-3 ml-3 mr-3">
            <div className="card-header">
              <Text color="$TitleColor">Oxygen (from 0 to 1)</Text>
            </div>
            <div className="card-body">
              <Line data={data} width={600} height={120} options={O2Options} />
            </div>
          </div>
          <div className="card mb-3 ml-3 mr-3">
            <div className="card-header">
              <Text color="$TitleColor">Luminosity (from 0 to 1)</Text>
            </div>
            <div className="card-body">
              <Line data={data} width={600} height={120} options={LumosOptions} />
            </div>
          </div>
      </div>
      <div className="d-flex flex-row">
          <div className="card mb-3 ml-3 mr-3">
            <div className="card-header">
              <Text color="$TitleColor">Environment Index (from 0 to 1)</Text>
            </div>
            <div className="card-body">
              <Line data={data} width={2400} height={480} options={CalculatedOptions} />
            </div>
          </div>
      </div>
    </div>
    </>
  )
}
