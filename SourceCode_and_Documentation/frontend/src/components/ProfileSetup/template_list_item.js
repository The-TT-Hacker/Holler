import React from 'react';

export default class TemplateListItem extends React.Component{


    localAddToCanvas = (e) => {
        e.preventDefault();
        this.props.addToCanvas(e.target, this.props.property_type, this.props.zIndex);
    }

    render(){

        var link = "#" + this.props.key // Remove href warning

        return(
            <div className="col">
                <a href={link} className="thumbnail" onClick={this.localAddToCanvas}>
                    <img alt="" src={this.props.url}  style={{ width: '64px', height: '64px' }} className="spacer-up spacer-down" />
                </a>
            </div>
        );
    }
}