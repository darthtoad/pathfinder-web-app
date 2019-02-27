import { createGlobalState } from 'react-context-global-state';

const initialState = {
    name: '',
    gender: '',
    level: 1,
    points: {
        str: 10,
        dex: 10,
        con: 10,
        int: 10,
        wis: 10,
        cha: 10,
    },
    race: 'human',
    class: '',
    archetype: '',
    diety: '',
    classDetail: {},
    feats: [],
    skillPoints: 0,
    skills: [],
    gp: 0,
    equipment: [],
    languages: [],
    backgroundInfo: '',
    heroPoints: 0,
    honorPoints: 0,
    forward: false,
}

export let State = typeof initialState;

const {
    StateProvider,
    StateConsumer,
    setGlobalState,
    getGlobalState
} = createGlobalState(initialState);

// export const forwardOn = () => {
//     setGlobalState('forward', true);
// }

// export const forwardOff = () => {
//     setGlobalState('forward', false);
// }
  
export { StateProvider, StateConsumer, setGlobalState, getGlobalState };