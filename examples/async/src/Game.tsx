import * as React from 'react';
import { ReactElement } from 'react';
import { ComponentBase } from 'resub';
import { use } from '@stated-library/react';
import { devTools } from '@stated-library/core';

import { Answer } from './Answer';
import GameStore from './Game.store';

devTools.connect(GameStore, 'GameStore');

export interface GameProps {}

export function Game() {
    const {
        isLoading,
        answer,
        error,
        image,
    } = use(GameStore.state$);

    return (
        <div>
            <h1>YES or NO</h1>
            <button
                disabled={isLoading}
                onClick={() => GameStore.guess()}
            >
                { isLoading ? 'Loading...' : 'Guess' }
            </button>

            <Answer
                disabled={isLoading}
                answer={answer}
                image={image}
                error={error}
            />
        </div>
    );
}
