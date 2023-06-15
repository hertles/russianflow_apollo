import {makeVar} from '@apollo/client';

export const newPointVar = makeVar(
    {
        lng: null,
        lat: null,
        name: '',
        type: 'unknown',
        desc: ''
    })

export const pointsVar = makeVar([])
