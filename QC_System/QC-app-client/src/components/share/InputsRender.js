import React, { Component } from 'react';
import DatePicker from 'react-date-picker';

export class RenderInput extends Component {
    render() {
        var isReadOnly = parseInt(this.props.isReadOnly) === 1 ? true : false;
        var cssLabel = "fullwidth" + ` ${this.props.cssLabel}`;
        var props = this.props;
        var classNameInput = props.className;
        var styleCss = props.styleCss;
        classNameInput += (props.errorTitle !== undefined && props.errorTitle !== "") ? " input--required" : "";
     
        return (
            <div className={this.props.divClass}>
                <label key={this.props.nameId} className={cssLabel}>
                    {this.props.title}
                    <p style={{ color: "red", marginTop: "3px" }}>{this.props.errorTitle}</p>
                    <input type={this.props.type} key={this.props.nameId} name={this.props.nameId} value={this.props.value} onChange={this.props.OnChangeInput} className={classNameInput} style={styleCss} readOnly={isReadOnly} />
                </label>
            </div>
        );
    }
}

export class RenderSelect extends Component {
    render() {
        var values = this.props.values;
        var keys = this.props.keys;
        var valuesCss = this.props.valuesCss;
        var stylesCss = this.props.stylesCss;
        var elements = [];

        values.forEach((value, index) => {
            var valueCss = valuesCss !== undefined && valuesCss !== null && valuesCss !== [] ? valuesCss[index] : "";
            var styleCss = stylesCss !== undefined && stylesCss !== null && stylesCss !== [] ? stylesCss[index] : {};
            elements.push(<option className={valueCss} style={styleCss} key={keys[index]} value={keys[index]} >{value}</option>);
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

export class RenderRadioButon extends Component {
    render() {
        var keys = this.props.keys;
        var values = this.props.values;
        var selectedValue = this.props.selectedValue;

        var elementTypeRadioButtons = [];

        keys.forEach((key, index) => {
            if (selectedValue === key) {
                elementTypeRadioButtons.push(
                    <div key={key} className={this.props.className}>
                        <input type="radio" value={key} name={this.props.nameId} defaultChecked />
                        {values[index]}
                    </div>
                );
            }
            else {
                elementTypeRadioButtons.push(
                    <div key={key} className={this.props.className}>
                        <input type="radio" value={key} name={this.props.nameId} />
                        {values[index]}
                    </div>
                );
            }

        });
        return (
            <div key={this.props.nameId} name={this.props.nameId} onChange={this.props.OnChangeRadioButton}>
                <label className="fullwidth">{this.props.title}</label>
                {elementTypeRadioButtons}
            </div>
        );
    }
}

export class RenderDate extends Component {
    render() {
        return (
            <div className={this.props.divClassName}>
                <div className="">
                    <label className="fullwidth">
                        {this.props.title}
                        <div>
                            <DatePicker name={this.props.nameId} value={this.props.value} onChange={this.props.OnchangeDate} className={this.props.className} />
                        </div>
                    </label>
                </div>
            </div>
        );
    }
}

