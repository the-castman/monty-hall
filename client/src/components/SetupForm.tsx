import React, { useState, SyntheticEvent } from 'react'
import PropTypes from "prop-types";
import formStyles from 'src/styles/components/form.module.scss';
import { GameSetup } from 'src/models/GameSetup';
import { attributesFromElement } from "src/utils/forms";

interface ISetupForm {
    onSetupSubmitted?: (setup: GameSetup) => void;
}

const SetupForm = (props: ISetupForm) => {
    const [gameSetupForm, setGameSetupForm] = useState<GameSetup>({ nrOfGames: 999, changeDoors: false })

    const _onFormSubmit = (e: SyntheticEvent) => {
        e.preventDefault();

        if (props.onSetupSubmitted) {
            props.onSetupSubmitted(gameSetupForm);
        }
    }

    const _handleFormChange = (e: SyntheticEvent) => {
        const { name, elementValue } = attributesFromElement(e.target);

        setGameSetupForm(prevFormState => {
            return { ...prevFormState, [name]: elementValue }
        });
    }

    return (
        <form onSubmit={_onFormSubmit}>
            <div className={formStyles.formControl}>
                <label htmlFor="nrOfGames">Number of games</label>
                <input type="number" name="nrOfGames" autoComplete="off" min="1" max="10000"
                    onChange={_handleFormChange}
                    value={gameSetupForm.nrOfGames} />
            </div>
            <div className={formStyles.formControl}>
                <label htmlFor="changeDoors" className={formStyles.checkbox}>
                    <input name="changeDoors" type="checkbox"
                        onChange={_handleFormChange}
                        checked={gameSetupForm.changeDoors} />
                    <span>Change door?</span>
                </label>
            </div>
            <button className={formStyles.button} type="submit">Run Games</button>
        </form>
    )
}

SetupForm.propTypes = {
    onSetupSubmitted: PropTypes.func
}

export default SetupForm;
