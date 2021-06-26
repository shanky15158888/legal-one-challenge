import React from 'react';
import renderer from 'react-test-renderer';
import CallLog from './CallLog';
import { BrowserRouter as Router } from "react-router-dom";

test('CallLog component testing', () => {
    const match = {
        params: {
            number: "+49151484522"
        }
    }
    const component = renderer.create(
        <Router>
            <CallLog match={match} />
        </Router>,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});