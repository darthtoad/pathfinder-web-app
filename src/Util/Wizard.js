import React, { Component } from 'react';

class Wizard extends Component {
	state = {
		page: 0
    };

	_navigateBack = () => {
		this.setState(prevState => ({
			page: prevState.page - 1
		}));
	};

	_navigateNext = () => {
		this.setState(prevState => ({
			page: prevState.page + 1
		}));
	};

	render() {
		const { page } = this.state;

		const Page = this.props.pages[page];

		return (
            <div>
                <Page
                    page={Page}
                />
                {page > 0 && 
                    <button
                        onClick={this._navigateBack}
                    >
                        <p>Back</p>
                    </button>
                }
                {page < this.props.pages.length - 1 && <button
                    onClick={this._navigateNext}
                >
                    <p>Next</p>
                </button>}
            </div>
            
            
		);
	};
}

export default Wizard;