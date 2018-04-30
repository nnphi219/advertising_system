import React, { Component } from 'react';

export class DescriptionDetail extends Component {
    render() {
        var elements = [];
        var props = this.props;
        var arrayTitles = props.arrayTitles;
        arrayTitles.forEach((element, index) => {
            elements.push(<p key={index}>{element}</p>);
        });
        return (
            <div className="div__description">
                {elements}
            </div>
        );
    }
}