import React, { useState } from "react";
import Dropdown from "./dropdown";
import { fetchProducts } from "../shared/services/products.service";
import Button from '@mui/material/Button';

interface IFilterPanelProps {
    categories: any[];
    onReport(data: any): void;
}

const FilterPanel = (props: IFilterPanelProps): JSX.Element => {
    const { categories, onReport } = props;
    const [category, setCategory] = useState<string | string[]>('');
    const [product, setProduct] = useState<string | string[]>([]);
    const [products, setProducts] = useState<any>([]);
    const [productData, setProductData] = useState<any>();

    const onCategoryChange = async (value: string | string[]): Promise<void> => {
        setCategory(value);
        setProducts([]);
        const result = (await fetchProducts(value[0])).data;
        setProductData(result.products);
        setProducts(result.products.map((x: any) => x.title));
    }

    const onProductChange = (value: string | string[]): void => {
        setProduct(value);
    }

    const onClear = (): void => {
        setCategory('')
        setProduct([])
    }

    const onReportRun = (): void => {
        if (product && product.length === 0) {
            onReport({ category: category, products: productData });
        } else {
            onReport({ category: category, products: productData.filter((x: any) => product.includes(x.title)) });
        }

    }

    return (
        <>
            <div className="filter-panel-container">
                <div className="filter-panel-container__header">
                    <h2>Filters</h2>
                    <span onClick={onClear}>Clear</span>
                </div>

                <Dropdown key={'cat'} placeholder="Select Category" onSelect={onCategoryChange} value={category} options={categories} multiple={false} />
                <Dropdown key={'prod'} placeholder="Select Product" onSelect={onProductChange} value={product} options={products} multiple disabled={!products || products.length === 0} />

                <Button variant="contained" disabled={!category} onClick={onReportRun}>Run Report</Button>
            </div>
        </>
    );
}


export default FilterPanel;
