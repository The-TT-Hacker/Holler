import React from 'react';

export default class TemplateListItem extends React.Component{


    localAddToCanvas = (e) => {
        e.preventDefault();
        this.props.addToCanvas(e.target, this.props.property_type, this.props.zIndex);
    }

    render(){

        var link = "#" + this.props.key // Remove href warning

        return(
            <div className="col-md-4 col-sm-6">
                <a href={link} className="thumbnail" onClick={this.localAddToCanvas}>
                    <img className="img-fluid" alt="" src={this.props.url} />
                </a>
            </div>
        );
    }
}