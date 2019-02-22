import React, { Component } from "react";
import "./NewCharacter.css";
import NewCharacterBackground from "./../Components/NewCharacterBackground";
import NewCharacterClass from './../Components/NewCharacterClass';
import NewCharacterEquipment from './../Components/NewCharacterEquipment';
import NewCharacterFeats from './../Components/NewCharacterFeats';
import NewCharacterName from './../Components/NewCharacterName';
import NewCharacterPoints from './../Components/NewCharacterPoints';
import NewCharacterRace from './../Components/NewCharacterRace';
import NewCharacterSkills from './../Components/NewCharacterSkills';
import CharacterSheet from './../Components/CharacterSheet';
import Wizard from './../Util/Wizard';

export default class NewCharacter extends Component {
    render() {
        return (
            <div>
                <h1>Create New Character</h1>
                    <Wizard
                        pages={[NewCharacterName, NewCharacterPoints, NewCharacterRace, NewCharacterClass, NewCharacterFeats, NewCharacterSkills, NewCharacterEquipment, NewCharacterBackground, CharacterSheet]}
                    >
                    </Wizard>
            </div>
        );
    }
}