import React, { useState } from 'react'
// read: https://fontawesome.com/how-to-use/on-the-web/using-with/react
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import data from './data.json'
import './App.css';

var arrayOfDietOptions = [];
const Actions = (props) => {
    const { setRestaurants } = props;
    //or
    //const setRestaurants = props.setRestaurants;
    function selector(option) {
        if (option === 'sort') {
            setSortSelector(!showSortSelector)
            setDietarySelector(false)
            setPriceRangeSelector(false)
        } else if (option === 'diet') {
            setDietarySelector(!showDietarySelector)
            setSortSelector(false)
            setPriceRangeSelector(false)
        } else if (option === 'price') {
            setPriceRangeSelector(!showPriceRangeSelector)
            setSortSelector(false)
            setDietarySelector(false)
        }
    }
    const [showSortSelector, setSortSelector] = useState(false);
    const handeGeneralSorting = (restaurants, sortBy) => {
        let func;
        if (sortBy === 'maxDeliveryTime') {
            func = (a, b) => a[sortBy] - b[sortBy];
        } else {
            func = (a, b) => b[sortBy] - a[sortBy];
        }

        setRestaurants([...restaurants].sort(func));
    }
    //For Dietary Choice    
    const [showDietarySelector, setDietarySelector] = useState(false);

    const handleDietarySorting = (restaurants, dietOption) => {
        let tempRestaurants = [...restaurants];
        let restarantsFromData = data.restarants;
        if (arrayOfDietOptions.indexOf(dietOption) < 0) {
            arrayOfDietOptions.push(dietOption)
            tempRestaurants = [...restarantsFromData];
        }
        else {
            arrayOfDietOptions.splice(arrayOfDietOptions.indexOf(dietOption), 1)
        }
        if (arrayOfDietOptions.length === 0) {
            setRestaurants(restarantsFromData)
            return;
        }

        let dietaryRestaurant = [];
        dietaryRestaurant = [...tempRestaurants].filter((tempRestaurant) => {

            var menuLength = tempRestaurant.menu.length
            for (var i = 0; i < menuLength; i++) {
                var menuItemsLength = tempRestaurant.menu[i].items.length;
                for (var j = 0; j < menuItemsLength; j++) {
                    if (arrayOfDietOptions.indexOf(tempRestaurant.menu[i].items[j].typeOfMeal) >= 0) {
                        return true;
                    }
                }
            }
            return false;
        })
        setRestaurants(dietaryRestaurant)
    }
    //for price range
    const [showPriceRangeSelector, setPriceRangeSelector] = useState(false);
    const handlePriceRangeSorting = (priceRange) => {
        let priceRangeRestaurants = [];
        let restarantsFromData = data.restarants;
        priceRangeRestaurants = [...restarantsFromData].filter((eachRestaurant) => {

            var menuLength = eachRestaurant.menu.length
            for (var i = 0; i < menuLength; i++) {
                var menuItemsLength = eachRestaurant.menu[i].items.length;
                for (var j = 0; j < menuItemsLength; j++) {
                    if (priceRange === '$' && (eachRestaurant.menu[i].items[j].price) > 90 && (eachRestaurant.menu[i].items[j].price) <= 100) {
                        return true;
                    } else if (priceRange === '$$' && (eachRestaurant.menu[i].items[j].price) > 101 && (eachRestaurant.menu[i].items[j].price) <= 166) {
                        return true;
                    } else if (priceRange === '$$$' && (eachRestaurant.menu[i].items[j].price) > 167 && (eachRestaurant.menu[i].items[j].price) <= 190) {
                        return true;
                    } else if (priceRange === '$$$$' && (eachRestaurant.menu[i].items[j].price) > 191 && (eachRestaurant.menu[i].items[j].price) <= 235) {
                        return true;
                    }
                }
            }
            return false;
        })
        setRestaurants(priceRangeRestaurants)
    }
    return <div className="actions" >
        <span className="button-group">
            <button onClick={() => selector('sort')}  >
                <span>Sort</span>
                <FontAwesomeIcon icon={"chevron-down"} />
            </button>
            {showSortSelector && <div>
                <label>Most popular <input
                    value="popularity"
                    type="radio"
                    name="generalSort"
                    onChange={event => handeGeneralSorting(props.restaurants, event.currentTarget.value)}
                />
                </label>
                <label>Rating <input
                    value="rating"
                    type="radio"
                    name="generalSort"
                    onChange={event => handeGeneralSorting(props.restaurants, event.currentTarget.value)}
                /></label>
                <label>Delivery time <input
                    value="maxDeliveryTime"
                    type="radio"
                    name="generalSort"
                    onChange={event => handeGeneralSorting(props.restaurants, event.currentTarget.value)}
                /></label>
            </div>}
        </span>
        {/* TODO */}
        {/* <!-- Implement as assignment for Thursday --> */}
        <span className="button-group">
            <button onClick={() => selector('price')}>
                <span>Price Range</span> <FontAwesomeIcon icon={"chevron-down"} /></button>
            {showPriceRangeSelector && <div>< label>
                <button className="actions button-group" value="$" onClick={event => handlePriceRangeSorting(event.currentTarget.value)}>$</button>
                <button className="actions button-group" value="$$" onClick={event => handlePriceRangeSorting(event.currentTarget.value)}>$$</button>
                <button className="actions button-group" value="$$$" onClick={event => handlePriceRangeSorting(event.currentTarget.value)}>$$$</button>
                <button className="actions button-group" value="$$$$" onClick={event => handlePriceRangeSorting(event.currentTarget.value)}>$$$$</button>
            </label></div>}
        </span>
        <span className="button-group">
            <button onClick={() => selector('diet')}>
                <span>Dietary choice</span> <FontAwesomeIcon icon={"chevron-down"} />
            </button>
            {showDietarySelector && <div>
                < label>Vegetrian<input
                    value="vegetarian"
                    type="checkbox"
                    name="dietarySort"
                    onChange={event => handleDietarySorting(props.restaurants, event.currentTarget.value)}
                />
                </label>
                <label>Vegan<input
                    value="vegan"
                    type="checkbox"
                    name="dietarySort"
                    onChange={event => handleDietarySorting(props.restaurants, event.currentTarget.value)}
                /></label>
                <label>Non-Vegan<input
                    value="non vegan"
                    type="checkbox"
                    name="dietarySort"
                    onChange={event => handleDietarySorting(props.restaurants, event.currentTarget.value)}
                /></label>
            </div>}

        </span>

    </div>


}
export default Actions;