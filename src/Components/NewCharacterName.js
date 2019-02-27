import React, { Component } from 'react';
import { StateConsumer, setGlobalState, getGlobalState } from './../Global/state';

class NewCharacterName extends Component {
    render() {
        return (
            <StateConsumer
                name="name"
            >
                {(value, update) => (
                    <div>
                        <form>
                            <label>
                                Character Name
                                <br />
                                <input type="text" value={value} onChange={event => {
                                    update(event.target.value);
                                    event.target.value !== '' ? setGlobalState('forward', true) : setGlobalState('forward', false);
                                    this.props.toggleReload();
                                    }} />
                            </label>
                        </form>
                    </div>
                )}
            </StateConsumer>
        )
    }
}

export default NewCharacterName;