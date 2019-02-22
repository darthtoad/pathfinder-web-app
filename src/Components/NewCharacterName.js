import React, { Component } from 'react';
import { StateConsumer } from './../Global/state';

const NewCharacterName = () => 
        (
            <StateConsumer
                name="name"
            >
                {(value, update) => (
                    <div>
                        <form>
                            <label>
                                Character Name
                                <br />
                                <input type="text" value={value} onChange={event => update(event.target.value)} />
                            </label>
                        </form>
                        <p>Name: {value}</p>
                    </div>
                )}

            </StateConsumer>
        )

export default NewCharacterName;