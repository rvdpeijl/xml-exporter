import React from "react"
import _ from "underscore"

import XMLInput from "./XMLInput"
import Table from "./Table"

class App extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			list: [],
			selected: [],
			baseTemplate: '<?xml version="1.0" encoding="UTF-8"?><library xmlns="http://www.demandware.com/xml/impex/library/2006-10-31"></library>',
			output: ""
		}
	}

	componentDidMount() {
		this.div = document.createElement("div")
	}

	toggleNode(id) {
		var list = this.state.selected

		if (_.contains(list, id)) {
			list = _.without(list, id)
		} else {
			list.push(id)
		}

		this.setState({
			selected: list
		})
	}

	buildXML() {
		var parser = new DOMParser()
		var build  = parser.parseFromString(this.state.baseTemplate, "text/xml")

		var library = build.getElementsByTagName("library")[0]

		this.state.selected.forEach((select) => {
			var item = _.findWhere(this.state.list, {id: select})

			library.appendChild(item.element)
		})

		this.div.innerHTML = ""
		this.div.appendChild(library)

		console.log(this.div)

		this.setState({
			output: this.div.innerHTML
		})
	}

	setXML(xml) {
		this.setState({ list: xml })
	}

	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-6">
						<div className="row">
							<div className="col-md-12">
								<h2>Paste XML file</h2>
								<XMLInput setXML={this.setXML.bind(this)}/>
							</div>
						</div>

						<div className="row">
							<div className="col-md-12">
								<h2>Selection</h2>
								<Table list={this.state.list} toggleNode={this.toggleNode.bind(this)} buildXML={this.buildXML.bind(this)}/>
							</div>
						</div>
					</div>

					<div className="col-md-6">
						<div className="row">
							<h2>Output</h2>
							<div className="col-xs-12">
								<pre><code>{this.state.output}</code></pre>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default App