import React from 'react';

export default class Forecastday extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { data } = this.props;
        if (!data) return null;
        let weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][new Date(data.date).getDay()]
        return <div className="forecastday-container">
            <div className="date">
                {weekday}
            </div>
            <div className="image">
                <img src={data.day.condition.icon} alt="IMG"/>
            </div>
            <div className="text">
                { data.day.avgtemp_c }
            </div>
            <div className="muted-text">
                { data.day.condition.text }
            </div>
        </div>
    }
}