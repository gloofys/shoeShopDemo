import Nav from "./Navigation/nav.jsx";
import Product from "./Products/Product.jsx";
import Recommended from "./recommended/Recommended.jsx";
import "./index.css"
import Sidebar from "./Sidebar/Sidebar.jsx";
import {useState} from "react";

import productData from './db/data.jsx'
import Card from "./components/Card.jsx";

const App = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [query, setQuery] = useState("");

    const handleInputChange = event => {
        setQuery(event.target.value);
    }

    const filteredItems = productData.filter(
        (product) => product.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );

    const handleChange = (event) => {
        setSelectedCategory(event.target.value);
    }

    const handleClick = (event) => {
        setSelectedCategory(event.target.value);
    }

    function filteredData(productData, selected, query) {
        let filteredProductData = productData

        if (query) {
            filteredProductData = filteredItems;
        }
        if (selected) {
            filteredProductData = filteredProductData.filter(
                ({category, color, company, newPrice, title}) =>
                    category === selected ||
                    color === selected ||
                    company === selected ||
                    newPrice === selected ||
                    title === selected
            );
        }

        return filteredProductData.map(({img, title, star, reviews, prevPrice, newPrice}) => (
            <Card
                key={Math.random()}
                img={img}
                title={title}
                star={star}
                reviews={reviews}
                newPrice={newPrice}
                prevPrice={prevPrice}
            />
        ))

    }

    const result = filteredData(productData, selectedCategory, query);


    return <>
        <Sidebar handleChange={handleChange} />
        <Nav query={query} handleInputChange={handleInputChange} />
        <Recommended handleClick={handleClick} />
        <Product result={result}/>

    </>
}
export default App
