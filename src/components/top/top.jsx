import React from 'react';
import './style.scss';
import Weather from './weather';
import { Manager, Reference, Popper } from 'react-popper';

export default class TopSection extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLocationOpen: false,

        };
    }

    onToggleLocation() {
        this.setState(prevState => ({ isLocationOpen: !prevState.isLocationOpen }));
    }

    onSelectCity() {
        const { locationName } = this.state;
        const { eventEmitter } = this.props;
        
        this.setState({ isLocationOpen: false });
        eventEmitter.emit('updateWeather', locationName);
    }

    enterPressed(event) {
        const key = event.keyCode || event.which;
        const { locationName } = this.state;
        const { eventEmitter } = this.props;

        if(key === 13) { 
        this.setState({ isLocationOpen: false });
        eventEmitter.emit('updateWeather', locationName);
        } 
    }

    onLocationNameChange(e) {
        this.setState({ locationName: e.target.value });
    }

    render() { 
        const { isLocationOpen } = this.state;
        const { eventEmitter } =this.props;

        return <div className="top-container">
            <div className="title">Weather Forecast</div>
            <Weather {...this.props} />
            <Manager>
                <Reference>
                {({ ref }) => (
                    <button className="btn btn-location" ref={ ref } onClick={this.onToggleLocation.bind(this)}>
                        Select Location
                    </button>
                )}
                </Reference>
                <Popper placement="top">
                {({ ref, style, placement, arrowProps }) => ( isLocationOpen && 
                    <div className="popup-container" ref={ref} style={style} data-placement={placement}>
                        <div className="form-container">
                            <label htmlFor="location-name">Location Name</label>
                            <input 
                                id="location-name" 
                                type="text" 
                                placeholder="City Name"
                                onChange={this.onLocationNameChange.bind(this)} 
                                onKeyPress={this.enterPressed.bind(this)}   
                            />
                            <button className="btn" onClick={this.onSelectCity.bind(this)}>Select</button>
                        </div>
                        <div ref={arrowProps.ref} style={arrowProps.style} />
                    </div>
                )}
                </Popper>
            </Manager>
        </div>;
    }

}