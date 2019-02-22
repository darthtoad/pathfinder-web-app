import { createGlobalState } from 'react-context-global-state';

const initialState = {
    name: ''
};

export let State = typeof initialState;

const {
    StateProvider,
    StateConsumer,
    setGlobalState,
} = createGlobalState(initialState);
  
export { StateProvider, StateConsumer };