import React, { Component } from 'react';

export class RenderSelect extends Component {
    render() {
        var values = this.props.values;
        var keys = this.props.keys;
        var elements = [];
        values.forEach((value, index) => {
            elements.push(<option key={keys[index]} value={keys[index]} >{value}</option>);
        });
        return (
            <div>
                <label className="fullwidth">
                    {this.props.title}
                    <select name={this.props.nameId} key={this.props.nameId} value={this.props.selectedValue} onChange={this.props.OnChangeSelect} className={this.props.className}>
                        {elements}
                    </select>
                </label>
            </div>
        );
    }
}

export class RenderTextArea extends Component {
    render() {
        var isReadOnly = parseInt(this.props.isReadOnly, 10) === 1 ? true : false;

        return (
            <div className={this.props.divClassName}>
                <div className="">
                    <label className="fullwidth">
                        {this.props.title}
                        <div>
                            <textarea rows="4" cols="50" key={this.props.nameId} name={this.props.nameId} value={this.props.value} onChange={this.props.OnChangeInput} className={this.props.className} readOnly={isReadOnly}>

                            </textarea>
                        </div>
                    </label>
                </div>
            </div>

        );
    }
}