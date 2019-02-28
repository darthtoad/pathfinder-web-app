import React, { Component } from 'react';
import { getGlobalState, setGlobalState } from './../Global/state';
import { Prompt } from 'react-router-dom';

class Wizard extends Component {
	state = {
        page: 0,
        reload: false,
    };

    onUnload = (event) => {
        alert("");
    }

    componentDidMount() {
        window.addEventListener("beforeunload", this.onUnload);
        window.onbeforeunload = () => {
            this.onUnload();
            return "";
        }
    }

	_navigateBack = () => {
		this.setState(prevState => ({
			page: prevState.page - 1
		}));
	};

	_navigateNext = () => {
		this.setState(prevState => ({
			page: prevState.page + 1
        }));
        setGlobalState('forward', false);
    };

    _toggleReload = () => {
        this.state.reload ? this.setState({reload: false}) : this.setState({reload: true});
    }

	render() {
		const { page } = this.state;

		const Page = this.props.pages[page];

		return (
            <div>
                <Page
                    page={Page}
                    toggleReload={this._toggleReload}
                />
                {page > 0 && 
                    <button
                        onClick={this._navigateBack}
                    >
                        <p>Back</p>
                    </button>
                }
                {getGlobalState('forward') && page < this.props.pages.length - 1 && <button
                    onClick={this._navigateNext}
                >
                    <p>Next</p>
                </button>}
            </div>
            
            
		);
	};
}

export default Wizard;