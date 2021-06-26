import React from 'react';
import renderer from 'react-test-renderer';
import Homepage from './Homepage'
import { BrowserRouter as Router } from "react-router-dom";

test('Homepage component testing', () => {
    const component = renderer.create(
        <Router>
            <Homepage />
        </Router>,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});