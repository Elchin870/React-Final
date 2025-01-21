import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import axios from "axios";
import "chart.js/auto";

const CoinDetails = ({ coin }) => {
    const [chartData, setChartData] = useState(null)

    const fetchHistoricalData = async () => {
        try {
            const response = await axios.get(
                `https://api.coingecko.com/api/v3/coins/${coin.nameid}/market_chart`,
                {
                    params: { vs_currency: "usd", days: "7" },
                }
            )

            const prices = response.data.prices.map((data) => ({
                x: new Date(data[0]).toLocaleDateString(),
                y: data[1],
            }))

            setChartData({
                labels: prices.map((price) => price.x),
                datasets: [
                    {
                        label: `${coin.name} Price (USD)`,
                        data: prices.map((price) => price.y),
                        borderColor: "blue",
                        borderWidth: 2,
                        fill: false,
                    },
                ],
            })
        } catch (error) {
            console.error("Error", error)
        }
    }

    useEffect(() => {
        fetchHistoricalData()
    }, [coin])

    if (!chartData) return <div>Loading</div>

    return (
        <div>
            <h4>Price Changes (7 Days)</h4>
            <Line data={chartData} />
        </div>
    )
}

export default CoinDetails
