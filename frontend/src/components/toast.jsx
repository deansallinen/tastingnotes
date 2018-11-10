import React, { Component } from 'react'

class Toast extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hidden: false,
        }
    }

    render() {
        return (
            <section className="section" style={this.state.hidden ? { display: 'none' } : {}}>
                <div className="container">
                    <article className="message is-warning">
                        <div className="message-header">
                            <p>Error</p>
                            <button className="delete" aria-label="delete" onClick={() => this.setState({ hidden: true })}></button>
                        </div>
                        <div className="message-body">
                            {this.props.message}
                        </div>
                    </article>
                </div>
            </section>
        )
    }
}

export default Toast;