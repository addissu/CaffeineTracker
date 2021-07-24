import React, { Component, } from 'react';
import coffeeDrinks from '../data/coffeeDrinks.json';
//console.log(coffeeDrinks)

const MAX_Caffeine = 500;
const caffeineTotalKeys = Object.keys(coffeeDrinks.caffeineTotal).sort();

const originalState = {
    numOfDrinks: 1,
    currDrinkCaffeine: coffeeDrinks.caffeineTotal[caffeineTotalKeys[0]],
    total: 0,
    nameChange: ''
}

class Counter extends Component {

    constructor(){
        super();
        this.state={
           ...originalState
        }
    }
    //function to handle the current drink when selected
    handleDrinkChange = (event) => {
        this.setState ({
            currDrinkCaffeine: Number(event.target.value)
        })
    }
    //function to handle number of drinks consumed
    handleNumOfDrinksChange = (event) => {
        this.setState ({
            numOfDrinks: Number(event.target.value)
        })
    }
    handleNameChange = (event) => {
        this.setState ({
            nameChange: String(event.target.value)
        })
    }
    //function to get current state, plus selected drink, multiplied by number of drinks 
    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({total: this.state.total + this.state.currDrinkCaffeine * this.state.numOfDrinks })
        
    }
    //function for reset button to return to original state
    handleResetClick = () => {
        this.setState({...originalState})
    }
    
    
    render() {
        //Shows current state 
        console.log(this.state)

        return <div className="create">
            <h2>Caffeine Tracker</h2>
            
            <form onSubmit={this.handleSubmit}>
                <label>Full Name</label>
                <input onChange={this.handleNameChange}
                    type="text"
                    required
                   
                />
               {/*Map Json data retreiving its value of selected drink*/}
            <label>Which caffeinated drink did you have?</label>
            
                <select onChange={this.handleDrinkChange}>
                    {   
                        caffeineTotalKeys.map((item) => {
                            return <option value={coffeeDrinks.caffeineTotal[item]} key={coffeeDrinks.caffeineTotal[item]}>{item}</option>
                          })
                    }
                </select>
                
                <label> How many drinks did you have? </label>
                
                <select onChange={this.handleNumOfDrinksChange}>
                {[...Array(25).keys()].map(idx =>
                    <option value={idx + 1} key={idx + 1}>{idx + 1}</option>
)}


                    {/* <option value="1" >1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option> */}


                </select>
                <button type="submit">Calculate</button>
                <button type="button" onClick={this.handleResetClick}>Reset</button>
                
            </form>
            
            <div>
                Name: {this.state.nameChange} <br>
                </br>
                Current Caffeine Total:  {this.state.total}mg 
            </div>
            <div>
                {
                    
                    //while total is less than 500mg, this will run
                    this.state.total < MAX_Caffeine ? `You have ${MAX_Caffeine - this.state.total}mg of caffeine left to drink`: 
                    //if total mg equalls 500, this will run
                    this.state.total === MAX_Caffeine ? `You have reached your daily intake`:
                    //if more than 500mg was drank, this will run
                    `You have went over the daily limit by ${this.state.total - MAX_Caffeine}mg `
                }  
            </div>
           

        </div>
    }
}
 
export default Counter;