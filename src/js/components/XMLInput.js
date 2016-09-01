import React from "react"
import _ from "underscore"

class XMLInput extends React.Component {
	constructor(props) {
		super(props)
	}

	parseXML() {
		var xml = this.refs.xmlInput.value
		var parser = new DOMParser()
		var xmlDoc = parser.parseFromString(xml, "text/xml")

		var children = xmlDoc.documentElement.childNodes

		var mapped = []

		for (var i = children.length - 1; i >= 0; i--) {
			if (children[i].attributes) {
				mapped.push({
					id: children[i].attributes[0].value,
					type: children[i].attributes[0].name.split("-")[0],
					element: children[i]
				})
			}
		};

		mapped = _.sortBy(mapped, "id")

		this.props.setXML(mapped)
	}

	render() {
		return (
			<div>
				<textarea ref="xmlInput" rows="10" className="form-control"></textarea>
				<div className="btn btn-primary pull-right" style={{ marginTop: "10px" }} onClick={this.parseXML.bind(this)}>Import</div>
			</div>
		)
	}
}

export default XMLInput