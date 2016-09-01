import React from "react"

class Table extends React.Component {
	toggleNode(id) {
		this.props.toggleNode(id)
	}

	render() {

		if (this.props.list.length) {
			
			return (
				<div>
					<div style={{maxHeight: "200px", overflowY: "scroll"}}>
						<table className="table">
							<thead>
								<tr>
									<th/>
									<th>ID</th>
									<th>Type</th>
								</tr>
							</thead>

							<tbody>
								{
									this.props.list.map((item, key) => {
										return (
											<tr key={key}>
												<td><input type="checkbox" className="checkbox" onChange={this.toggleNode.bind(this, item.id)}/></td>
												<td>{item.id}</td>
												<td style={{ textTransform: "capitalize" }}>{item.type}</td>
											</tr>
										)
									})
								}
							</tbody>
						</table>
					</div>

					<div className="btn btn-primary btn-block" onClick={this.props.buildXML}>Create XML export</div>
				</div>
			)

		} else {
			return <div>Import XML please</div>
		}
	}
}

export default Table