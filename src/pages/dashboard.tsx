import React, { useEffect, useState } from "react";

import BarChart from '../components/bar-chart';
import FilterPanel from '../components/filter-panel';
import { fetchProductCategories } from "../shared/services/products.service";

const ReportingPage = (): JSX.Element => {

    const [productCategories, setProductCategories] = useState<string[]>([]);
    const [options, setOptions] = useState<any>(undefined);

    useEffect(() => {

        fetchCategories();

        return () => {
            setProductCategories([]);
        }
    }, []);

    const fetchCategories = async (): Promise<void> => {
        const categories = (await fetchProductCategories()).data;
        setProductCategories(categories);
    }

    const onReport = (data: any): void => {
        const options = {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Products in selected category',
                align: 'left'
            },
            xAxis: {
                categories: data.products.map((x: any) => x.title),
                crosshair: true,
                accessibility: {
                    description: 'Countries'
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Categories'
                }
            },
            series: [
                {
                    data: data.products.map((x: any) => x.price)
                }
            ]
        }
        setOptions(options);
    }

    return (
        <>
            <div className="dashboard">
                <FilterPanel categories={productCategories} onReport={onReport} />
                <div className="dashboard__charts">
                    {options && (
                        <BarChart options={options} />
                    )}
                </div>
            </div>
        </>
    );
}

export default ReportingPage