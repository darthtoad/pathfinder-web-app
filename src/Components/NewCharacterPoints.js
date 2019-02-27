import React, { Component } from 'react';
import { StateConsumer, setGlobalState, getGlobalState } from './../Global/state';

// const Strength = () => {
//     <StateConsumer
//         name="str">

//     </StateConsumer>
// }

class NewCharacterPoints extends Component {
    state = {
        system: "",
        pointBuy: 15,
        pointBuyEnable: false,
        dice: "",
        entry: "",
        array: "",
        points: {
            str: 10,
            dex: 10,
            con: 10,
            int: 10,
            wis: 10,
            cha: 10,
        },
        rollValues: [],
        disabled: {
            str: false,
            dex: false,
            con: false,
            int: false,
            wis: false,
            cha: false,
        },
        numberOfDice: 24,
        diceDecided: false,
        statDice: 3,
        arrayVals: []
    }

    checkForward = () => {
        if (this.state.pointBuy === 0) {
            setGlobalState('forward', true);
            setGlobalState('points', this.state.points);
        } else {
            setGlobalState('forward', false);
        }
    }

    changeStat = (newVal, valName, pointObj) =>  {
        if (newVal > 0) {
            let newPointObj = Object.assign(pointObj, {[valName]: newVal});
            this.setState({points: newPointObj});
        }
    }

    rollStandard = () => {
        let newArray = [];
        for (let i = 1; i < 7; i++) {
            let newValArr = [];
            let valToDrop = 50;
            for (let j = 0; j < 4; j++) {
                let newRoll = Math.ceil(Math.random() * 6);
                newValArr.push(newRoll);
                if (newRoll < valToDrop) {
                    valToDrop = newRoll;
                }
            }
            for (let k = 0; k < newValArr.length; k++) {
                if (newValArr[k] === valToDrop) {
                    newValArr.splice(k, 1);
                    k += 6;
                }
            }
            let valToPush = 0;
            newValArr.map((val) => {
                valToPush += val;
            })
            newArray.push(valToPush);
        }
        this.setState({rollValues: newArray});
    }

    roll5d6 = () => {
        let newArray = [];
        for (let i = 1; i < 7; i++) {
            let newValArr = [];
            let valToDrop = 50;
            let valToDrop1 = 50;
            for (let j = 0; j < 5; j++) {
                let newRoll = Math.ceil(Math.random() * 6);
                newValArr.push(newRoll);
                if (newRoll < valToDrop) {
                    valToDrop = newRoll;
                } else if (newRoll < valToDrop1) {
                    valToDrop1 = newRoll;
                } else {
                    
                }
            }
            let foundOne = false;
            for (let k = 0; k < newValArr.length; k++) {
                if (newValArr[k] === valToDrop || newValArr[k] === valToDrop1) {
                    newValArr.splice(k, 1);
                    newValArr[k] === valToDrop ? valToDrop = 50 : valToDrop1 = 50;
                    if (foundOne) {
                        k += 10;
                    } else {
                        foundOne = true;
                    }
                }
            }
            if (newValArr.length === 4) {
                let fixValue = 50;
                let index = 7;
                for (let k = 0; k < newValArr.length; k++) {
                    if (fixValue > newValArr[k]) {
                        index = k;
                    }
                }
                newValArr.splice(index, 1);
            }
            let valToPush = 0;
            newValArr.map((val) => {
                valToPush += val;
            })
            newArray.push(valToPush);
        }
        this.setState({rollValues: newArray});
    }

    roll2d6 = () => {
        let newArray = [];
        for (let i = 0; i < 6; i++) {
            let valToPush = Math.ceil(Math.random() * 6) + Math.ceil(Math.random() * 6) + 6;
            newArray.push(valToPush);
        }
        this.setState({rollValues: newArray});
    }

    roll3d6 = () => {
        let newArray = [];
        for (let i = 0; i < 6; i++) {
            let valToPush = Math.ceil(Math.random() * 6) + Math.ceil(Math.random() * 6) + Math.ceil(Math.random() * 6);
            newArray.push(valToPush);
        }
        this.setState({rollValues: newArray});
    }

    render() {
        return (
            <StateConsumer
                name="points"
            >
            {(value, update) => (
                <form>
                    <label>
                        Choose point system
                    </label>
                    <select onChange={(event) => {
                                this.setState({system: event.target.value});
                            }
                        }>
                        <option value=""></option>
                        <option value="pointBuy">Point Buy</option>
                        <option value="dice">Dice</option>
                        <option value="entry">Manual Entry</option>
                        <option value="array">Array</option>
                    </select>
                    <br />
                    {this.state.system === 'pointBuy' &&
                        <div>
                            <label>
                                How many points?
                                <input type="number" disabled={this.state.pointBuyEnable} value={this.state.pointBuy} onChange={(event) => this.setState({pointBuy: event.target.value})} />
                            </label>
                            <button onClick={(event) => {
                                event.preventDefault();
                                this.setState({pointBuyEnable: true});
                            }}>Confirm</button>
                            {this.state.pointBuyEnable &&
                                <div>
                                    <p>Points left: {this.state.pointBuy}</p>
                                    <span>Strength:</span>
                                        <input type="number" value={value.str} onChange={
                                                (event) => {
                                                    const newStrength = event.target.value;
                                                    if (newStrength > 1) {
                                                        const oldPoints = this.state.pointBuy;
                                                        const oldStrength = this.state.points.str;
                                                        if (oldPoints - (newStrength - oldStrength) >= 0) {
                                                            let newPointObj = value;
                                                            newPointObj.str = event.target.value;
                                                            this.setState({points: newPointObj});
                                                            this.setState({pointBuy: oldPoints - (newStrength - oldStrength)});
                                                            this.checkForward();
                                                        }
                                                    }
                                                }
                                            }
                                        />
                                    <br />
                                    <span>Dexterity:</span>
                                    <input type="number" value={value.dex} onChange={
                                            (event) => {
                                                const newDexterity = event.target.value;
                                                if (newDexterity > 1) {
                                                    const oldPoints = this.state.pointBuy;
                                                    const oldDexterity = this.state.points.dex;
                                                    if (oldPoints - (newDexterity - oldDexterity) >= 0) {
                                                        let newPointObj = value;
                                                        newPointObj.dex = event.target.value;
                                                        this.setState({points: newPointObj});
                                                        this.setState({pointBuy: oldPoints - (newDexterity - oldDexterity)});
                                                        this.checkForward();
                                                    }
                                                }
                                            }
                                        }
                                    />
                                    <br />
                                    <span>Constitution</span>
                                    <input type="number" value={value.con} onChange={
                                        (event) => {
                                            const newConstitution = event.target.value;
                                            if (newConstitution > 1) {
                                                const oldPoints = this.state.pointBuy;
                                                const oldConstitution = this.state.points.con;
                                                if (oldPoints - (newConstitution - oldConstitution) >= 0) {
                                                    let newPointObj = value;
                                                    newPointObj.con = event.target.value;
                                                    this.setState({points: newPointObj});
                                                    this.setState({pointBuy: oldPoints - (newConstitution - oldConstitution)});
                                                    this.checkForward();
                                                }
                                            }
                                        }
                                    }
                                    />
                                    <br />
                                    <span>Intelligence</span>
                                    <input type="number" value={value.int} onChange={
                                        (event) => {
                                            const newIntelligence = event.target.value;
                                            if (newIntelligence > 1) {
                                                const oldPoints = this.state.pointBuy;
                                                const oldIntelligence = this.state.points.int;
                                                if (oldPoints - (newIntelligence - oldIntelligence) >= 0) {
                                                    let newPointObj = value;
                                                    newPointObj.int = event.target.value;
                                                    this.setState({points: newPointObj});
                                                    this.setState({pointBuy: oldPoints - (newIntelligence - oldIntelligence)});
                                                    this.checkForward();
                                                }
                                            }
                                        }
                                    }
                                    />
                                    <br />
                                    <span>Wisdom</span>
                                    <input type="number" value={value.wis} onChange={
                                        (event) => {
                                            const newWisdom = event.target.value;
                                            if (newWisdom > 1) {
                                                const oldPoints = this.state.pointBuy;
                                                const oldWisdom = this.state.points.wis;
                                                if (oldPoints - (newWisdom - oldWisdom) >= 0) {
                                                    let newPointObj = value;
                                                    newPointObj.wis = event.target.value;
                                                    this.setState({points: newPointObj});
                                                    this.setState({pointBuy: oldPoints - (newWisdom - oldWisdom)});
                                                    this.checkForward();
                                                }
                                            }
                                        }
                                    }
                                    />
                                    <br />
                                    <span>Charisma</span>
                                    <input type="number" value={value.cha} onChange={
                                        (event) => {
                                            const newCharisma = event.target.value;
                                            if (newCharisma > 1) {
                                                const oldPoints = this.state.pointBuy;
                                                const oldCharisma = this.state.points.cha;
                                                if (oldPoints - (newCharisma - oldCharisma) >= 0) {
                                                    let newPointObj = value;
                                                    newPointObj.cha = event.target.value;
                                                    this.setState({points: newPointObj});
                                                    this.setState({pointBuy: oldPoints - (newCharisma - oldCharisma)});
                                                    this.checkForward();
                                                }
                                            }
                                        }
                                    }
                                    />
                                    <button onClick={() => {
                                        this.setState({pointBuyEnable: false});
                                        const newPointObject = {
                                            str: 10,
                                            dex: 10,
                                            con: 10,
                                            int: 10,
                                            wis: 10,
                                            cha: 10,
                                        };
                                        this.setState({points: newPointObject});
                                        }}>Reset</button>
                                </div>
                            }
                        </div>

                    }
                    {this.state.system === 'dice' &&
                        <div>
                            <select onChange={(event) => {
                                    this.setState({dice: event.target.value});
                                    const disableObj = {
                                        str: false,
                                        dex: false,
                                        con: false,
                                        int: false,
                                        wis: false,
                                        cha: false,
                                    };
                                    this.setState({disabled: disableObj});
                                    if (event.target.value === "standard") {
                                        this.rollStandard();
                                    } else if (event.target.value === "5d6") {
                                        this.roll5d6();
                                    } else if (event.target.value === "2d6") {
                                        this.roll2d6();
                                    } else if (event.target.value === "3d6") {
                                        this.roll3d6();
                                    } else if (event.target.value === "pool") {
                                        this.setState({diceDecided: false});
                                        this.setState({numberOfDice: 24});
                                        this.setState({statDice: 3});
                                    } else {
                                        alert("Something has gone horribly wrong");
                                    }
                                }}>
                                <option value=""></option>
                                <option value="standard">Standard Roll</option>
                                <option value="5d6">5d6 Best of Three</option>
                                <option value="2d6">2d6 + 6 Heroic</option>
                                <option value="3d6">3d6 Classic</option>
                                <option value="pool">Dice Pool</option>
                            </select>
                            {this.state.dice !== "" && this.state.dice !== "pool" &&
                                <div>
                                    <p>Point Numbers: 
                                        {this.state.rollValues.map(rollValue => {
                                            return <span> {rollValue} |</span>
                                        })}
                                    </p>
                                    {!this.state.disabled.str ? <p>Strength:
                                        <select onChange={(event) => {
                                            const numberValue = parseInt(event.target.value);
                                            this.changeStat(numberValue, 'str', value);
                                            let newRollValues = this.state.rollValues;
                                            for (let i = 0; i < this.state.rollValues.length; i++) {
                                                if (this.state.rollValues[i] === numberValue) {
                                                    let disableObj = this.state.disabled;
                                                    disableObj.str = true;
                                                    this.setState({disabled: disableObj});
                                                    newRollValues.splice(i, 1);
                                                    this.setState({rollValues: newRollValues});
                                                    i += 6;
                                                }
                                            }
                                        }}>
                                            <option value=""></option>
                                            {this.state.rollValues.map(rollValue => {
                                                return <option value={rollValue}>{rollValue}</option>
                                            })}
                                        </select>
                                    </p> : 
                                        <p>Strength: <span>{this.state.points.str}</span></p>
                                    }
                                    {!this.state.disabled.dex ? <p>Dexterity:
                                        <select onChange={(event) => {
                                            const numberValue = parseInt(event.target.value);
                                            this.changeStat(numberValue, 'dex', value);
                                            let newRollValues = this.state.rollValues;
                                            for (let i = 0; i < this.state.rollValues.length; i++) {
                                                if (this.state.rollValues[i] === numberValue) {
                                                    let disableObj = this.state.disabled;
                                                    disableObj.dex = true;
                                                    this.setState({disabled: disableObj});
                                                    newRollValues.splice(i, 1);
                                                    this.setState({rollValues: newRollValues});
                                                    i += 6;
                                                }
                                            }
                                        }}>
                                            <option value=""></option>
                                            {this.state.rollValues.map(rollValue => {
                                                return <option value={rollValue}>{rollValue}</option>
                                            })}
                                        </select>
                                    </p> :
                                        <p>Dexterity: <span>{this.state.points.dex}</span></p>
                                    }
                                    {!this.state.disabled.con ? <p>Constitution:
                                        <select onChange={(event) => {
                                            const numberValue = parseInt(event.target.value);
                                            this.changeStat(numberValue, 'con', value);
                                            let newRollValues = this.state.rollValues;
                                            for (let i = 0; i < this.state.rollValues.length; i++) {
                                                if (this.state.rollValues[i] === numberValue) {
                                                    let disableObj = this.state.disabled;
                                                    disableObj.con = true;
                                                    this.setState({disabled: disableObj});
                                                    newRollValues.splice(i, 1);
                                                    this.setState({rollValues: newRollValues});
                                                    i += 6;
                                                }
                                            }
                                        }}>
                                            <option value=""></option>
                                            {this.state.rollValues.map(rollValue => {
                                                return <option value={rollValue}>{rollValue}</option>
                                            })}
                                        </select>
                                    </p> : 
                                    <p>Constitution: <span>{this.state.points.con}</span></p>
                                    }
                                    {!this.state.disabled.int ? <p>Intelligence:
                                        <select onChange={(event) => {
                                            const numberValue = parseInt(event.target.value);
                                            this.changeStat(numberValue, 'int', value);
                                            let newRollValues = this.state.rollValues;
                                            for (let i = 0; i < this.state.rollValues.length; i++) {
                                                if (this.state.rollValues[i] === numberValue) {
                                                    let disableObj = this.state.disabled;
                                                    disableObj.int = true;
                                                    this.setState({disabled: disableObj});
                                                    newRollValues.splice(i, 1);
                                                    this.setState({rollValues: newRollValues});
                                                    i += 6;
                                                }
                                            }
                                        }}>
                                            <option value=""></option>
                                            {this.state.rollValues.map(rollValue => {
                                                return <option value={rollValue}>{rollValue}</option>
                                            })}
                                        </select>
                                    </p> :
                                    <p>Intelligence: <span>{this.state.points.int}</span></p>
                                    }
                                    {!this.state.disabled.wis ? <p>Wisdom:
                                        <select onChange={(event) => {
                                            const numberValue = parseInt(event.target.value);
                                            this.changeStat(numberValue, 'wis', value);
                                            let newRollValues = this.state.rollValues;
                                            for (let i = 0; i < this.state.rollValues.length; i++) {
                                                if (this.state.rollValues[i] === numberValue) {
                                                    let disableObj = this.state.disabled;
                                                    disableObj.wis = true;
                                                    this.setState({disabled: disableObj});
                                                    newRollValues.splice(i, 1);
                                                    this.setState({rollValues: newRollValues});
                                                    i += 6;
                                                }
                                            }
                                        }}>
                                            <option value=""></option>
                                            {this.state.rollValues.map(rollValue => {
                                                return <option value={rollValue}>{rollValue}</option>
                                            })}
                                        </select>
                                    </p> :
                                    <p>Wisdom: <span>{this.state.points.wis}</span></p>
                                    }
                                    {!this.state.disabled.cha ? <p>Charisma:
                                        <select onChange={(event) => {
                                            const numberValue = parseInt(event.target.value);
                                            this.changeStat(numberValue, 'cha', value);
                                            let newRollValues = this.state.rollValues;
                                            for (let i = 0; i < this.state.rollValues.length; i++) {
                                                if (this.state.rollValues[i] === numberValue) {
                                                    let disableObj = this.state.disabled;
                                                    disableObj.cha = true;
                                                    this.setState({disabled: disableObj});
                                                    newRollValues.splice(i, 1);
                                                    this.setState({rollValues: newRollValues});
                                                    i += 6;
                                                }
                                            }
                                        }}>
                                            <option value=""></option>
                                            {this.state.rollValues.map(rollValue => {
                                                return <option value={rollValue}>{rollValue}</option>
                                            })}
                                        </select>
                                    </p> :
                                    <p>Charisma: <span>{this.state.points.cha}</span></p>
                                    }
                                    <button
                                        onClick={(event) => {
                                            event.preventDefault();
                                            const disableObj = {
                                                str: false,
                                                dex: false,
                                                con: false,
                                                int: false,
                                                wis: false,
                                                cha: false,
                                            };
                                            this.setState({disabled: disableObj});
                                            if (this.state.dice === "standard") {
                                                this.rollStandard();
                                            } else if (this.state.dice === "5d6") {
                                                this.roll5d6();
                                            } else if (this.state.dice === "2d6") {
                                                this.roll2d6();
                                            } else if (this.state.dice === "3d6") {
                                                this.roll3d6();
                                            } else {
                                                alert("Something has gone horribly wrong");
                                            }
                                        }}
                                    >Reroll</button>
                                    {this.state.disabled.str && this.state.disabled.dex && this.state.disabled.con && this.state.disabled.int && this.state.disabled.wis && this.state.disabled.cha &&
                                        <button
                                            onClick={(event) => {
                                                event.preventDefault();
                                                setGlobalState('forward', true);
                                                update(this.state.points);
                                            }}
                                        >Go forward!</button>
                                    }
                                </div>
                            }
                            {this.state.dice === "pool" &&
                                <div>
                                    {!this.state.diceDecided && 
                                        <div>
                                            <p>How many dice would you like to use?</p>
                                            <input type="number" min={18} value={this.state.numberOfDice} onChange={(event) => this.setState({numberOfDice: event.target.value})} />
                                            <button onClick={(event) => {
                                                event.preventDefault();
                                                this.setState({diceDecided: true});
                                                const disableObj = {
                                                    str: false,
                                                    dex: true,
                                                    con: true,
                                                    int: true,
                                                    wis: true,
                                                    cha: true,
                                                }
                                                this.setState({disabled: disableObj});
                                            }}>Continue</button>
                                        </div>
                                    }
                                    {this.state.diceDecided &&
                                        <div>
                                            <p>Dice remaining: {this.state.numberOfDice}</p>
                                            {!this.state.disabled.str && 
                                            <div>
                                                <p>How many dice would you like to use for Strength?</p>
                                                    <input type="number" min={3} max={this.state.numberOfDice - 15} value={this.state.statDice} onChange={(event) => {
                                                        this.setState({statDice: event.target.value});
                                                    }}/>
                                                    <button
                                                        onClick={(event) => {
                                                            event.preventDefault();
                                                            let points = 0;
                                                            for (let i = 0; i < this.state.statDice; i++) {
                                                                points += Math.ceil(Math.random() * 6);
                                                            };
                                                            this.setState({numberOfDice: this.state.numberOfDice - this.state.statDice});
                                                            this.setState({statDice: 3});
                                                            let pointsObj = this.state.points;
                                                            pointsObj.str = points;
                                                            this.setState({points: pointsObj});
                                                            const disableObj = {
                                                                str: true,
                                                                dex: false,
                                                                con: true,
                                                                int: true,
                                                                wis: true,
                                                                cha: true,
                                                            }
                                                            this.setState({disabled: disableObj});
                                                        }}
                                                    >Continue</button>
                                            </div>
                                            }
                                            <p>Strength: {this.state.points.str}</p>
                                            {!this.state.disabled.dex &&
                                                <div>
                                                    <p>How many dice would you like to use for Dexterity?</p>
                                                    <input type="number" min={3} max={this.state.numberOfDice - 12} onChange={(event) => {
                                                        this.setState({statDice: event.target.value});
                                                    }}/>
                                                    <button
                                                        onClick={(event) => {
                                                            event.preventDefault();
                                                            let points = 0;
                                                            for (let i = 0; i < this.state.statDice; i++) {
                                                                points += Math.ceil(Math.random() * 6);
                                                            };
                                                            this.setState({numberOfDice: this.state.numberOfDice - this.state.statDice});
                                                            this.setState({statDice: 3});
                                                            let pointsObj = this.state.points;
                                                            pointsObj.dex = points;
                                                            this.setState({points: pointsObj});
                                                            const disableObj = {
                                                                str: true,
                                                                dex: true,
                                                                con: false,
                                                                int: true,
                                                                wis: true,
                                                                cha: true,
                                                            }
                                                            this.setState({disabled: disableObj});
                                                        }}
                                                    >Continue</button>
                                                </div>
                                            }
                                            <p>Dexterity: {this.state.points.dex}</p>
                                            {!this.state.disabled.con &&
                                                <div> 
                                                    <p>How many dice would you like to use for Constitution?</p>
                                                    <input type="number" min={3} max={this.state.numberOfDice - 9} onChange={(event) => {
                                                        this.setState({statDice: event.target.value});
                                                    }}/>
                                                    <button
                                                        onClick={(event) => {
                                                            event.preventDefault();
                                                            let points = 0;
                                                            for (let i = 0; i < this.state.statDice; i++) {
                                                                points += Math.ceil(Math.random() * 6);
                                                            };
                                                            this.setState({numberOfDice: this.state.numberOfDice - this.state.statDice});
                                                            this.setState({statDice: 3});
                                                            let pointsObj = this.state.points;
                                                            pointsObj.con = points;
                                                            this.setState({points: pointsObj});
                                                            const disableObj = {
                                                                str: true,
                                                                dex: true,
                                                                con: true,
                                                                int: false,
                                                                wis: true,
                                                                cha: true,
                                                            }
                                                            this.setState({disabled: disableObj});
                                                        }}
                                                    >Continue</button>
                                                </div>
                                            }
                                            <p>Constitution: {this.state.points.con}</p>
                                            {!this.state.disabled.int &&
                                                <div>
                                                    <p>How many dice would you like to use for Intelligence?</p>
                                                    <input type="number" min={3} max={this.state.numberOfDice - 6} onChange={(event) => {
                                                        this.setState({statDice: event.target.value});
                                                    }}/>
                                                    <button
                                                        onClick={(event) => {
                                                            event.preventDefault();
                                                            let points = 0;
                                                            for (let i = 0; i < this.state.statDice; i++) {
                                                                points += Math.ceil(Math.random() * 6);
                                                            };
                                                            this.setState({numberOfDice: this.state.numberOfDice - this.state.statDice});
                                                            this.setState({statDice: 3});
                                                            let pointsObj = this.state.points;
                                                            pointsObj.int = points;
                                                            this.setState({points: pointsObj});
                                                            const disableObj = {
                                                                str: true,
                                                                dex: true,
                                                                con: true,
                                                                int: true,
                                                                wis: false,
                                                                cha: true,
                                                            }
                                                            this.setState({disabled: disableObj});
                                                        }}
                                                    >Continue</button>
                                                </div>
                                            }
                                            <p>Intelligence: {this.state.points.int}</p>
                                            {!this.state.disabled.wis &&
                                                <div>
                                                    <p>How many dice would you like to use for Wisdom?</p>
                                                    <input type="number" min={3} max={this.state.numberOfDice - 3} onChange={(event) => {
                                                        this.setState({statDice: event.target.value});
                                                    }}/>
                                                    <button
                                                        onClick={(event) => {
                                                            event.preventDefault();
                                                            let points = 0;
                                                            for (let i = 0; i < this.state.statDice; i++) {
                                                                points += Math.ceil(Math.random() * 6);
                                                            };
                                                            this.setState({numberOfDice: this.state.numberOfDice - this.state.statDice});
                                                            this.setState({statDice: 3});
                                                            let pointsObj = this.state.points;
                                                            pointsObj.wis = points;
                                                            this.setState({points: pointsObj});
                                                            const disableObj = {
                                                                str: true,
                                                                dex: true,
                                                                con: true,
                                                                int: true,
                                                                wis: true,
                                                                cha: false,
                                                            }
                                                            this.setState({disabled: disableObj});
                                                        }}
                                                    >Continue</button>
                                                </div>
                                            }
                                            <p>Wisdom: {this.state.points.wis}</p>
                                            {!this.state.disabled.cha &&
                                                <div>
                                                    <p>How many dice would you like to use for Charisma?</p>
                                                    <input type="number" min={3} max={this.state.numberOfDice} onChange={(event) => {
                                                        this.setState({statDice: event.target.value});
                                                    }}/>
                                                    <button
                                                        onClick={(event) => {
                                                            event.preventDefault();
                                                            let points = 0;
                                                            for (let i = 0; i < this.state.statDice; i++) {
                                                                points += Math.ceil(Math.random() * 6);
                                                            };
                                                            this.setState({numberOfDice: this.state.numberOfDice - this.state.statDice});
                                                            this.setState({statDice: 3});
                                                            let pointsObj = this.state.points;
                                                            pointsObj.cha = points;
                                                            this.setState({points: pointsObj});
                                                            const disableObj = {
                                                                str: true,
                                                                dex: true,
                                                                con: true,
                                                                int: true,
                                                                wis: true,
                                                                cha: true,
                                                            }
                                                            this.setState({disabled: disableObj});
                                                        }}
                                                    >Continue</button>
                                                </div>
                                            }
                                            <p>Charisma: {this.state.points.cha}</p>
                                        </div>
                                    }
                                </div>
                            }
                        </div>

                    }
                    {this.state.system === 'entry' &&
                        <div>
                            <span>Strength: </span>
                            <input type="number" value={value.str} onChange={
                                (event) => {
                                    this.changeStat(event.target.value, 'str', value);
                                }
                            }></input>
                            <br />
                            <span>Dexterity: </span>
                            <input type="number" value={value.dex} onChange={
                                (event) => {
                                    this.changeStat(event.target.value, 'dex', value);
                                }
                            }></input>
                            <br />
                            <span>Constitution: </span>
                            <input type="number" value={value.con} onChange={
                                (event) => {
                                    this.changeStat(event.target.value, 'con', value);
                                }
                            }></input>
                            <br />
                            <span>Intelligence: </span>
                            <input type="number" value={value.int} onChange={
                                (event) => {
                                    this.changeStat(event.target.value, 'int', value);
                                }
                            }></input>
                            <br />
                            <span>Wisdom: </span>
                            <input type="number" value={value.wis} onChange={
                                (event) => {
                                    this.changeStat(event.target.value, 'wis', value);
                                }
                            }></input>
                            <br />
                            <span>Charisma: </span>
                            <input type="number" value={value.cha} onChange={
                                (event) => {
                                    this.changeStat(event.target.value, 'cha', value);
                                }
                            }></input>
                            <button onClick={(event) => {
                                event.preventDefault();
                                update(this.state.points);
                                setGlobalState('forward', true);
                            }}>Continue</button>
                            <br />
                        </div>
                    }
                    {this.state.system === 'array' &&
                        <div>
                            <select onChange={(event) => {
                                    this.setState({array: event.target.value});
                                    const newDisabledObj = {
                                        str: false,
                                        dex: false,
                                        con: false,
                                        int: false,
                                        wis: false,
                                        cha: false,
                                    };
                                    this.setState({disabled: newDisabledObj});
                                    if (event.target.value === 'standard') {
                                        const standardArray = [13, 12, 11, 10, 9, 8];
                                        this.setState({arrayVals: standardArray});
                                    }
                                    if (event.target.value === 'elite') {
                                        const eliteArray = [15, 14, 13, 12, 10, 8];
                                        this.setState({arrayVals: eliteArray});
                                    }
                                    
                                }}>
                                <option value=""></option>
                                <option value="standard">Standard Array</option>
                                <option value="elite">Elite Array</option>
                            </select>
                            {this.state.array !== '' &&
                                <div>
                                    <p>Strength: {this.state.points.str}</p>
                                    {!this.state.disabled.str && <select
                                        onChange={(event) => {
                                            const choice = parseInt(event.target.value);
                                            let newObj = this.state.points;
                                            newObj.str = choice;
                                            this.setState({points: newObj});
                                            let newDisabledObj = this.state.disabled;
                                            newDisabledObj.str = true;
                                            this.setState({disabled: newDisabledObj});
                                            let newArray = this.state.arrayVals;
                                            for (let i = 0; i < newArray.length; i++) {
                                                if (newArray[i] === choice) {
                                                    newArray.splice(i, 1);
                                                    i += 50;
                                                }
                                            }
                                            this.setState({arrayVals: newArray});
                                        }}
                                    >
                                        <option value=""></option>
                                        {this.state.arrayVals.map((val) => {
                                            return <option value={val}>{val}</option>
                                        })}
                                    </select>}
                                    <p>Dexterity: {this.state.points.dex}</p>
                                    {!this.state.disabled.dex && <select
                                        onChange={(event) => {
                                            const choice = parseInt(event.target.value);
                                            let newObj = this.state.points;
                                            newObj.dex = choice;
                                            this.setState({points: newObj});
                                            let newDisabledObj = this.state.disabled;
                                            newDisabledObj.dex = true;
                                            this.setState({disabled: newDisabledObj});
                                            let newArray = this.state.arrayVals;
                                            for (let i = 0; i < newArray.length; i++) {
                                                if (newArray[i] === choice) {
                                                    newArray.splice(i, 1);
                                                    i += 50;
                                                }
                                            }
                                            this.setState({arrayVals: newArray});
                                        }}
                                    >
                                        <option value=""></option>
                                        {this.state.arrayVals.map((val) => {
                                            return <option value={val}>{val}</option>
                                        })}
                                    </select>}
                                    <p>Constitution: {this.state.points.con}</p>
                                    {!this.state.disabled.con && <select
                                        onChange={(event) => {
                                            const choice = parseInt(event.target.value);
                                            let newObj = this.state.points;
                                            newObj.con = choice;
                                            this.setState({points: newObj});
                                            let newDisabledObj = this.state.disabled;
                                            newDisabledObj.con = true;
                                            this.setState({disabled: newDisabledObj});
                                            let newArray = this.state.arrayVals;
                                            for (let i = 0; i < newArray.length; i++) {
                                                if (newArray[i] === choice) {
                                                    newArray.splice(i, 1);
                                                    i += 50;
                                                }
                                            }
                                            this.setState({arrayVals: newArray});
                                        }}
                                    >
                                        <option value=""></option>
                                        {this.state.arrayVals.map((val) => {
                                            return <option value={val}>{val}</option>
                                        })}
                                    </select>}
                                    <p>Intelligence: {this.state.points.int}</p>
                                    {!this.state.disabled.int && <select
                                        disabled={this.state.disabled.int}
                                        onChange={(event) => {
                                            const choice = parseInt(event.target.value);
                                            let newObj = this.state.points;
                                            newObj.int = choice;
                                            this.setState({points: newObj});
                                            let newDisabledObj = this.state.disabled;
                                            newDisabledObj.int = true;
                                            this.setState({disabled: newDisabledObj});
                                            let newArray = this.state.arrayVals;
                                            for (let i = 0; i < newArray.length; i++) {
                                                if (newArray[i] === choice) {
                                                    newArray.splice(i, 1);
                                                    i += 50;
                                                }
                                            }
                                            this.setState({arrayVals: newArray});
                                        }}
                                    >
                                        <option value=""></option>
                                        {this.state.arrayVals.map((val) => {
                                            return <option value={val}>{val}</option>
                                        })}
                                    </select>}
                                    <p>Wisdom: {this.state.points.wis}</p>
                                    {!this.state.disabled.wis && <select
                                        disabled={this.state.disabled.wis}
                                        onChange={(event) => {
                                            const choice = parseInt(event.target.value);
                                            let newObj = this.state.points;
                                            newObj.wis = choice;
                                            this.setState({points: newObj});
                                            let newDisabledObj = this.state.disabled;
                                            newDisabledObj.wis = true;
                                            this.setState({disabled: newDisabledObj});
                                            let newArray = this.state.arrayVals;
                                            for (let i = 0; i < newArray.length; i++) {
                                                if (newArray[i] === choice) {
                                                    newArray.splice(i, 1);
                                                    i += 50;
                                                }
                                            }
                                            this.setState({arrayVals: newArray});
                                        }}
                                    >
                                        <option value=""></option>
                                        {this.state.arrayVals.map((val) => {
                                            return <option value={val}>{val}</option>
                                        })}
                                    </select>}
                                    <p>Charisma: {this.state.points.cha}</p>
                                    {!this.state.disabled.cha && <select
                                        disabled={this.state.disabled.cha}
                                        onChange={(event) => {
                                            const choice = parseInt(event.target.value);
                                            let newObj = this.state.points;
                                            newObj.cha = choice;
                                            this.setState({points: newObj});
                                            let newDisabledObj = this.state.disabled;
                                            newDisabledObj.cha = true;
                                            this.setState({disabled: newDisabledObj});
                                            let newArray = this.state.arrayVals;
                                            for (let i = 0; i < newArray.length; i++) {
                                                if (newArray[i] === choice) {
                                                    newArray.splice(i, 1);
                                                    i += 50;
                                                }
                                            }
                                            this.setState({arrayVals: newArray});
                                        }}
                                    >
                                        <option value=""></option>
                                        {this.state.arrayVals.map((val) => {
                                            return <option value={val}>{val}</option>
                                        })}
                                    </select>}
                                    {this.state.disabled.str && this.state.disabled.dex && this.state.disabled.con && this.state.disabled.int && this.state.disabled.wis && this.state.disabled.cha &&
                                        <button
                                            onClick={(event) => {
                                                event.preventDefault();
                                                setGlobalState('forward', true);
                                            }}
                                        >Continue</button>
                                    }
                                </div>
                            }
                        </div>
                    }
                </form>
            )

            }
            </StateConsumer>
        )
    }
}

export default NewCharacterPoints;