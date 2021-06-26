import React from 'react';
import renderer from 'react-test-renderer';
import AgentLog from './AgentLog'
import { BrowserRouter as Router } from "react-router-dom";

test('AgentLog component testing', () => {
    const match = {
        params: {
            number: "356b03dc-9ec5-11e7-97a6-d501104f897e"
        }
    }
    const component = renderer.create(
        <Router>
            <AgentLog match={match} />
        </Router>,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});