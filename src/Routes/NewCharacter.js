import React, { Component } from "react";
import "./NewCharacter.css";
import NewCharacterBackground from "./../Components/NewCharacterBackground";
import NewCharacterClass from './../Components/NewCharacterClass';
import NewCharacterEquipment from './../Components/NewCharacterEquipment';
import NewCharacterFeats from './../Components/NewCharacterFeats';
import NewCharacterGender from './../Components/NewCharacterGender';
import NewCharacterName from './../Components/NewCharacterName';
import NewCharacterPoints from './../Components/NewCharacterPoints';
import NewCharacterRace from './../Components/NewCharacterRace';
import NewCharacterSkills from './../Components/NewCharacterSkills';
import CharacterSheet from './../Components/CharacterSheet';
import Wizard from './../Util/Wizard';
import { Prompt } from "react-router-dom";

const NewCharacter = () => (
    <div>
        <h1>Create New Character</h1>
            <Prompt
                when={true}
                message={"Are you sure you want to stop making your character?"}
            />
            <Wizard
                pages={[NewCharacterName, NewCharacterGender, NewCharacterPoints, NewCharacterRace, NewCharacterClass, NewCharacterFeats, NewCharacterSkills, NewCharacterEquipment, NewCharacterBackground, CharacterSheet]}
            >
            </Wizard>
    </div>
)

export default NewCharacter;