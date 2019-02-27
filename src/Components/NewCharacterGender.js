import React, { Component } from 'react';
import { StateConsumer, setGlobalState } from './../Global/state';

class NewCharacterGender extends Component {
    render() {
        return (
            <StateConsumer
                name="gender"
            >
                {(value, update) => (
                    <form>
                        <p>Gender</p>
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="Male"
                                onChange={event => {
                                        update('male');
                                        setGlobalState('forward', true);
                                        this.props.toggleReload();
                                    }}
                                />
                            Male
                        </label>
                        <label>
                            <br />
                            <input
                                type="radio"
                                name="gender"
                                value="Female"
                                onChange={event => {
                                        update('female');
                                        setGlobalState('forward', true);
                                        this.props.toggleReload();
                                    }}
                                />
                            Female
                        </label>
                    </form>
                )}
            </StateConsumer>
        )
    }
}

export default NewCharacterGender;