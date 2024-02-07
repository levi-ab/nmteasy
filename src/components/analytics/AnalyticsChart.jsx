import React from 'react'
import { View } from 'react-native';
import { LineChart, Grid, YAxis, XAxis } from 'react-native-svg-charts'

class AnalyticsChart extends React.PureComponent {
  render() {
    const data = [0, 20 ,40, 123, 23, 0, 234, 213, 50, 100, 20]
    const months = ["DEC", "DEC","DEC","DEC","DEC","DEC","DEC","DEC","DEC","DEC","DEC","DEC"]

    const contentInset = { top: 20, bottom: 20 }

    return (
        <View style={{ height: 200, flexDirection: 'row'}}>
            <YAxis
                data={data}
                contentInset={contentInset}
                svg={{
                    fill: 'grey',
                    fontSize: 10,
                }}
                style={{width: 40, marginRight: -10}}
                numberOfTicks={10}
                formatLabel={(value) => `${value} exp`}
            />
            <LineChart
                style={{ flex: 1, marginLeft: 16 }}
                data={data}
                svg={{ stroke: 'rgb(134, 65, 244)', strokeWidth: 2 }}
                contentInset={contentInset}
            >
                <Grid />
            </LineChart>
        </View>
    )
}
}

export default AnalyticsChart;