import React from "react";

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const BarChart = (props: any): JSX.Element => {

    return (
        <>
            <div>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={props.options}
                />
            </div>
        </>
    )
}

export default BarChart;