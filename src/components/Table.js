import React, { Component } from 'react';

class Table extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      isLoading: false,
      isError: false
    }
  }


async componentDidMount() {
    this.setState({ isLoading: true })
    const response = await fetch('http://localhost:5000/get_table_details')
    if (response.ok) {
      const data = await response.json()
      this.setState({ data, isLoading: false })
    } else {
      this.setState({ isError: true, isLoading: false })
    }
  }

  render() {
    const { data, isLoading, isError } = this.state

    if (isLoading) {
      return <div>Loading...</div>
    }

    if (isError) {
      return <div>Error</div>
    }

    return data.length > 0
      ? (
        <table>
          <thead>
            <th>
              {this.renderTableHeader()}
            </th>
          </thead>
          <tbody>
            {this.renderTableRows()}
          </tbody>
        </table>
      ) : (
        <div>
          No data.
      </div>
      )
  }
  renderTableRows = () => {
    return this.state.data.map(data => {
      return (
        <tr key={data.ip}>
          <td>{data.id}</td>
          <td>{data.city}</td>
          <td>{data.date}</td>
          <td>{data.browserName}</td>
          <td>{data.osName}</td>
          <td>{data.osVersion}</td>
        </tr>
      )
    })

    
}
renderTableHeader = () => {
    return this.state.data.map(data => {
      return (
        <tr>
          <th>{'id'}</th>
          <th>{'city'}</th>
          <th>{'date'}</th>
          <th>{'browserName'}</th>
          <th>{'osName'}</th>
          <th>{"osVersion"}</th>
        </tr>
      )
    })
}
}
export default Table;
