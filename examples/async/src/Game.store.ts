import StatedLibBase from '@stated-library/base';

interface Answer {
    answer: string;
    image: string;
}

interface State {
    isLoading: boolean,
    answer: string,
    image: any,
    error: string,
}

class GameStore extends StatedLibBase<State> {

    constructor() {
        super({
            isLoading: false,
            answer: '',
            error: '',
            image: '',
        })
    }

    /**
     * guess
     * @return void
     */
    public guess(): void {
        this._guessStart();

        fetch('https://yesno.wtf/api')
            .then(response => response.json())
            .then(this.onSuccess)
            .catch(this.onError);
    }

    /**
     * _guessStart
     * @return void
     */
    private _guessStart = () => {
        this.updateState({
            isLoading: true,
            answer: '',
            error: '',
            image: '',
        }, "START_GUESS");
    }

    /**
     * onSuccess
     * @param {Answer} response
     * @return void
     */
    private onSuccess = ({ answer, image }: Answer) => {
        this.updateState({
            isLoading: false,
            answer: answer,
            image: image,
            error: '',
        }, "LOAD_SUCCESS");
    }

    /**
     * onError
     * @param {Error} errors
     * @return void
     */
    private onError = ({ message }: Error) => {
        this.updateState({
            isLoading: false,
            error: message,
        }, "LOAD_ERROR");
    }
}

export default new GameStore();
