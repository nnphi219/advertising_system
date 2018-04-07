import React, { Component } from 'react';

class RenderHeader extends Component {
    render() {
        var props = this.props;

        var row = [];
        var keys = props.theader.keys;
        var values = props.theader.values;
        values.forEach((element, index) => {
            row.push(
                <th key={element}>
                    <button onClick={props.OnchangeSort} name={keys[index]} className="button--transparent">{element}</button>
                </th>
            );
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