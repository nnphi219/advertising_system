import React, { Component } from 'react';

class RenderHeader extends Component {
    render() {
        var row = [];
        this.props.theader.forEach(element => {
            row.push(<th key={element}>{element}</th>);
        });
        return (
            <thead>
                <tr>
                    {row}
                </tr>
            </thead>
        );
    }
}

export default RenderHeader;